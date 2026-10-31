---
title: "SIEM in Dubai: Building Detection That Works at a Cost That Makes Sense"
description: "How Dubai organisations can get value from a SIEM — choosing log sources, controlling ingest cost, meeting UAE retention needs and writing detections that fire on real attacks."
date: "2026-10-31"
category: "UAE & Dubai"
tags: ["Dubai", "UAE", "SIEM", "Detection Engineering", "Microsoft Sentinel", "Splunk"]
---

Many organisations in Dubai own a SIEM. Fewer can say what it would actually detect. The typical story is familiar: a platform bought for an audit, every log source switched on, a monthly bill that keeps growing, and an alert queue so noisy that nobody reads it.

A SIEM is only as good as the data it receives and the detections written for it. Here is how to get it right.

## Start with the questions, not the logs

Before connecting anything, decide what you need to detect. For most UAE businesses, the high-value scenarios are:

- Compromised Microsoft 365 or Google Workspace accounts, including suspicious inbox rules used in invoice fraud.
- Exploitation of internet-facing VPNs and firewalls.
- Privilege escalation and lateral movement in Active Directory.
- Ransomware precursors: credential dumping, disabled security tools, mass file changes.
- Unusual access to sensitive data and bulk exports.

Each scenario tells you which log sources matter. Everything else can wait — or go to cheaper storage.

## The log sources that pay for themselves

1. **Identity:** Entra ID or Active Directory sign-ins and changes.
2. **Endpoint:** EDR telemetry from laptops and servers.
3. **Email and collaboration:** Microsoft 365 or Google Workspace audit logs.
4. **Perimeter:** firewall, VPN and WAF logs.
5. **Cloud control plane:** AWS CloudTrail, Azure Activity and equivalent.

Verbose network flow logs, debug-level application logs and duplicate feeds are the usual cost drivers with little detection value. Route them to low-cost storage tiers if you must keep them.

## Retention and residency in the UAE

How long you keep logs depends on your sector and contracts. Dubai Government suppliers working under DESC requirements, financial institutions regulated by the Central Bank of the UAE, and organisations handling personal data under the UAE PDPL all need to be able to investigate incidents after the fact — which means keeping enough history, in a location that satisfies their data residency obligations. Cloud SIEMs such as Microsoft Sentinel can run in UAE regions; confirm where data and backups actually sit.

## Detection engineering, not detection shopping

Out-of-the-box rule packs are a starting point. Real value comes from:

- **Tuning** — removing the false positives that train analysts to ignore alerts.
- **Custom detections** written for how your environment actually behaves.
- **Testing** — running safe simulations of attacker techniques to prove rules fire.
- **Coverage mapping** against MITRE ATT&CK, so gaps are visible. See our guide to [measuring detection coverage](/blog/mitre-attack-detection-coverage/).

## Controlling cost

Our [SIEM cost optimisation guide](/blog/siem-cost-optimisation/) explains the approach in detail: measure which data is used by detections and investigations, then tier or drop the rest. Cutting ingest without losing coverage is usually the fastest return a SIEM project can deliver.

## How we help in Dubai

Our [SIEM and detection engineering service](/services/siem-engineering/) works inside the platform you already own — Sentinel, Splunk, Elastic or Wazuh — or helps you choose one. Speak to our [Dubai team](/dubai/) about an audit of what your SIEM ingests, what it costs and what it would actually catch.
