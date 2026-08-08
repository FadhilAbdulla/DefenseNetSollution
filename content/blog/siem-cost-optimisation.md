---
title: "Cutting SIEM Costs Without Losing Detection Coverage"
description: "Most organisations ingest large volumes of telemetry that never appear in a detection or an investigation. A structured method for finding it, tiering it, and cutting spend safely."
date: "2026-04-15"
category: "Security Operations"
tags: ["SIEM", "Cost Optimisation", "Splunk", "Sentinel", "Log Management"]
---

SIEM licensing is usually priced on data volume, and data volume only ever goes up. Within a few years of deployment, most organisations reach a point where the annual bill provokes an uncomfortable conversation, and the proposed solution is to stop ingesting something.

That conversation goes badly when nobody can say which logs matter. Here is a method for answering that question with evidence.

## First, measure what is actually used

Before cutting anything, establish three facts for every log source:

1. **Ingest volume** — GB per day, and cost attributable to it
2. **Detection usage** — how many active detection rules reference this source
3. **Investigation usage** — how often analysts actually query it, from search audit logs

Most SIEM platforms can produce all three. Splunk exposes search telemetry through its audit index; Sentinel has usage workbooks; Elastic has slow-log and query metrics.

The result is nearly always the same shape: a small number of sources drive the overwhelming majority of both detections and investigations, and a long tail of high-volume sources contributes almost nothing to either.

Typical high-value, low-volume sources:

- Identity provider authentication and audit logs
- EDR process and alert telemetry
- Cloud control-plane audit logs (CloudTrail, Azure Activity, GCP Admin Activity)
- DNS query logs
- Privileged access and PAM logs

Typical high-volume, low-value sources:

- Verbose firewall accept logs
- Load balancer and CDN access logs at full fidelity
- Application debug logging shipped by accident
- Netflow at full resolution
- Windows event IDs with no detection value ingested wholesale

That last one is worth dwelling on. Many Windows log pipelines forward the entire Security channel by default. A relatively small subset of event IDs carries almost all the detection value.

## Then apply the four levers

### Lever 1: Filter at the source

The cheapest byte is one you never send. Filter at the agent or forwarder, not after ingestion:

- Drop event IDs with no detection or investigative use
- Drop successful DNS responses for domains on a well-maintained allowlist, keep failures and rare domains
- Drop health-check and monitoring traffic from web access logs
- Drop verbose debug levels from application logs in production

Be conservative and reversible. Every filter should be documented with the reason and the person who approved it, so a future incident does not run into a silent gap nobody can explain.

### Lever 2: Tier the storage

Not every log needs to sit in expensive, instantly-searchable storage. Three tiers work for most estates:

- **Hot (30–90 days)** — everything detections run against and analysts search daily
- **Warm / archive (90 days–1 year)** — searchable with a delay, at a fraction of the cost. Sentinel's basic and auxiliary logs, Splunk's frozen-to-S3, Elastic's frozen tier
- **Cold compliance storage (1 year+)** — object storage, rehydrated only if needed

For Indian organisations, remember the **CERT-In 180-day log retention requirement**, and that logs must be retained within Indian jurisdiction. Tiering satisfies both far more cheaply than keeping everything hot.

### Lever 3: Route selectively

An observability pipeline (Cribl, Logstash, Vector, Fluent Bit) sitting between sources and destinations lets you send the same event to different places at different fidelity: full detail to cheap object storage, a reduced version to the SIEM.

This is where the largest savings usually appear, because it decouples "we must retain this" from "we must pay SIEM rates for this."

It also removes vendor lock-in, which tends to improve your position at renewal.

### Lever 4: Aggregate before ingest

Some sources are only useful in aggregate. Netflow, for instance, is rarely queried record-by-record; what analysts want is "unusual volume between these two hosts." Pre-aggregating into summary records can reduce volume by an order of magnitude while preserving the analytical value.

## The safety net: prove coverage did not drop

The legitimate objection to all of this is that you might quietly remove the one log that would have caught the next intrusion. Three controls make the change safe:

**Map every cut to ATT&CK.** Before removing a source, list the techniques whose detection depends on it. If any technique loses its only telemetry, the cut is off the table until an alternative source is identified.

**Run atomic tests before and after.** Execute the relevant techniques in a controlled window and confirm the same detections still fire. This converts "we think it is safe" into evidence.

**Stage the change.** Route to a parallel index for two weeks before cutting, and compare detection output. Nothing goes straight to deletion.

## What savings look like in practice

In the environments we have optimised, reductions of 30–50% in ingested volume are common without any loss in validated detection coverage, because the removed data was genuinely unused. The savings tend to break down roughly as:

- Source-side filtering of low-value events: the largest single contributor
- Tiering long-retention data out of hot storage: the second largest
- Aggregation of flow and access logs: meaningful in network-heavy estates

The exercise usually pays for itself within the first quarter, and it has a second benefit that is harder to quantify: a smaller, well-understood dataset makes searches faster and analysts more effective.

## What not to cut

Some sources look expensive and should stay regardless:

- **Authentication logs.** Every intrusion touches identity. This is the highest-value data you hold.
- **EDR telemetry.** Process ancestry is how you reconstruct an incident.
- **Cloud audit logs.** Cheap relative to their value, and irreplaceable after the fact.
- **DNS.** Consistently one of the best sources for detecting command-and-control at low volume.

If a cost-reduction proposal touches any of these, the analysis has gone wrong somewhere.

## A note on the renewal conversation

Do this exercise *before* your renewal, not after. Walking into a negotiation with a measured, defensible plan to reduce ingest by 40% changes the conversation substantially — and often produces a better commercial outcome than the reduction itself.

Our [SIEM engineering practice](/services/siem-engineering) runs this as a structured four-week engagement: measure, map to ATT&CK, stage, validate, cut. [Get in touch](/contact) if your renewal is coming up.
