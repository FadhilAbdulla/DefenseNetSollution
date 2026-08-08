---
title: "Real-Time Firewall Monitoring in Splunk: Detections That Earn Their Place"
description: "Practical SPL for detecting port scans, beaconing, data egress anomalies and lateral movement from firewall logs — with the tuning notes that keep them from becoming noise."
date: "2025-11-19"
category: "Security Operations"
tags: ["Splunk", "SPL", "Firewall", "Detection Engineering"]
---

Firewall logs are the highest-volume, lowest-value-per-event source in most SIEMs. They are also, correctly used, one of the better sources for detecting command-and-control and data exfiltration.

The difference is entirely in what you build on top of them. Here are the detections that consistently justify the ingest cost, with the tuning that keeps them usable.

## Before you write any detection

Two prerequisites, and skipping either wastes the effort:

**Normalise the data.** Map your firewall fields to a common schema — `src_ip`, `dest_ip`, `dest_port`, `action`, `bytes_in`, `bytes_out`, `app`. If you run more than one firewall vendor, this is what lets one search work across both. Splunk's Common Information Model handles this if your add-on is configured correctly.

**Build asset context.** A lookup mapping IP ranges to zone, criticality and expected behaviour. Without it, every detection returns results you cannot prioritise. This single lookup improves detection quality more than any query optimisation.

## Detection 1: Beaconing

Command-and-control traffic is regular. Human and application traffic is not. That regularity is detectable even when the destination is unknown and the traffic is encrypted.

```
index=firewall action=allowed
| bin _time span=1m
| stats count by src_ip dest_ip _time
| streamstats current=f last(_time) as prev_time by src_ip dest_ip
| eval delta = _time - prev_time
| stats count as connections,
        avg(delta) as avg_interval,
        stdev(delta) as stdev_interval,
        dc(delta) as distinct_intervals
        by src_ip dest_ip
| where connections > 20 AND avg_interval > 30
| eval jitter_ratio = stdev_interval / avg_interval
| where jitter_ratio < 0.15
| sort - connections
```

The signal is `jitter_ratio` — the coefficient of variation of the connection interval. Genuinely periodic traffic has a very low value. Modern C2 frameworks add jitter, so tune the threshold up (0.25–0.35) to catch them, accepting more noise.

**Tuning notes:** monitoring agents, software update checkers, NTP and telemetry all beacon legitimately. Build an allowlist of known-good destination pairs rather than raising the threshold, or you will lose the detection entirely.

## Detection 2: Port scanning and internal reconnaissance

```
index=firewall
| stats dc(dest_port) as ports_touched,
        dc(dest_ip) as hosts_touched,
        count as attempts,
        values(action) as actions
        by src_ip
| where ports_touched > 50 OR hosts_touched > 100
| lookup asset_inventory ip as src_ip OUTPUT zone criticality owner
| where isnull(zone) OR zone!="scanner"
```

The final filter matters. Your own vulnerability scanner will top this list every day, and an unfiltered detection gets muted within a week.

Internal scanning from a workstation is a much stronger signal than external scanning, which is constant background noise from the internet. Split this into two detections with different severities.

## Detection 3: Data egress anomaly

Volume alone produces false positives constantly — backups, replication, large legitimate uploads. Compare against the host's own baseline instead:

```
index=firewall action=allowed
| stats sum(bytes_out) as bytes_out by src_ip, date_hour
| eventstats avg(bytes_out) as baseline_avg,
             stdev(bytes_out) as baseline_stdev by src_ip
| eval z_score = (bytes_out - baseline_avg) / baseline_stdev
| where z_score > 3 AND bytes_out > 100000000
| lookup asset_inventory ip as src_ip OUTPUT criticality owner
```

Two conditions together: statistically unusual *for this host*, and large in absolute terms. Either alone produces noise.

**Higher-value variant:** restrict to destinations outside your country, or to cloud storage and file-sharing providers specifically. Exfiltration to a personal cloud drive is a far stronger signal than a large transfer to a known partner.

## Detection 4: Rare destination

Attackers use infrastructure your organisation has never contacted before.

```
index=firewall action=allowed earliest=-24h
| stats count by dest_ip
| search NOT
  [ search index=firewall earliest=-30d latest=-24h
    | stats count by dest_ip
    | fields dest_ip ]
| where count > 5
```

New destinations contacted repeatedly in the last day, never seen in the previous month. High signal, particularly when combined with the beaconing detection — a destination that is both new and periodic warrants immediate investigation.

## Detection 5: Denied traffic patterns

Denied traffic is usually ignored. It should not be entirely.

```
index=firewall action=blocked
| stats count as blocked_count,
        dc(dest_ip) as unique_dests,
        dc(dest_port) as unique_ports
        by src_ip
| where blocked_count > 500
| lookup asset_inventory ip as src_ip OUTPUT zone
| where zone="internal_workstation"
```

An internal workstation generating hundreds of blocked connections is doing something it should not be — malware attempting to reach unreachable infrastructure, or a user running a tool they should not have.

The reverse is also worth watching: a host whose *denied* count suddenly drops to zero after being consistently non-zero may indicate a firewall rule change that opened a path.

## Detection 6: Non-standard ports for standard protocols

```
index=firewall action=allowed
| where (app="ssl" AND dest_port!=443 AND dest_port!=8443)
     OR (app="ssh" AND dest_port!=22)
     OR (app="dns" AND dest_port!=53)
| stats count, dc(src_ip) as sources by dest_ip dest_port app
| where count > 10
```

Requires application-aware firewall logging. Encrypted traffic on an unusual port is a common evasion, and this detection is cheap to run.

## Making it operational

**Correlate rather than alerting individually.** A host that appears in the beaconing detection *and* the rare destination detection is a genuine investigation. Either alone is often benign. Build a risk-based correlation that accumulates score per host across detections and alerts at a threshold.

**Enrich at search time.** Every alert should arrive with asset owner, criticality, and destination reputation attached. An analyst who must look up three things before triaging is an analyst who triages slowly.

**Use summary indexes.** These searches over raw firewall data are expensive. Run the aggregation on a schedule into a summary index, and run detections against that. This is usually the difference between a search that completes in seconds and one that times out.

**Measure the detections.** Track true positive rate per rule monthly. A rule that has produced only false positives for six months should be tuned or retired — leaving it in place trains analysts to ignore the queue.

## What firewall logs cannot tell you

Be clear about the limits so you do not over-invest here:

- Encrypted payload content is invisible without decryption
- Cloud-to-cloud traffic never crosses your firewall
- Remote workers going directly to SaaS never appear
- East-west traffic within a segment is not visible without internal enforcement points

Firewall logs are a strong source for perimeter-crossing activity and a weak one for everything else. Pair them with identity, endpoint and DNS telemetry, which is where the more decisive signals live.

Our [detection engineering practice](/services/siem-engineering) builds and maintains version-controlled detection content across Splunk, Sentinel, Elastic and Wazuh, with quarterly validation against atomic tests. [Get in touch](/contact) if your SIEM is producing volume rather than signal.
