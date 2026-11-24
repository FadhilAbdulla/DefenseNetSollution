---
title: "Security Control Validation: Does Your Perimeter Block What You Think It Blocks?"
description: "How to test firewalls, WAF, email filtering, VPN and EDR safely, record blocked, detected and missed results, and catch control drift."
date: "2026-11-24"
category: "Offensive Security"
tags: ["Control Validation", "Breach and Attack Simulation", "Purple Team"]
---

A control that is installed, licensed and green on a dashboard may still not stop anything. Control validation asks a narrow question: when this technique is used, what happens?

It differs from a penetration test. A test seeks a way in. Validation runs known techniques against known controls and records the outcome, even when no vulnerability exists.

## Three outcomes, not two

- **Blocked:** prevented, and you can show where.
- **Detected:** allowed, but an alert reached a person.
- **Missed:** allowed and silent.

Blocked without an alert deserves attention too. You may want to know someone tried.

## A starter set

| Control | Safe test |
| --- | --- |
| Email filtering | Send the EICAR test file and a benign link with a spoofed sender |
| WAF | Harmless injection strings against a test endpoint, and direct to origin |
| Egress filtering | Connect outward on unusual ports and resolve test domains |
| VPN | Attempt login without MFA and from a blocked country |
| EDR | Run a small Atomic Red Team test on a lab host |

Testing the origin server directly is worth singling out. A well-tuned WAF does nothing if its origin answers the whole internet.

## Why controls drift

Rules are relaxed for a migration, agents fail after an upgrade, a log source stops sending, a certificate expires. None of these raises an alarm by itself. The [Equifax breach](/resources/incidents/equifax-breach-2017/) went unseen while an inspection device was inactive.

## Keep it safe

Use written authorisation, benign payloads, test accounts and a change record. Tell the SOC manager, not necessarily the analysts.

## Closing the loop

Each miss becomes a control change or a detection, then the same test is rerun. For weighting detections by technique, see [measuring ATT&CK coverage](/blog/mitre-attack-detection-coverage/). We run this as part of [Threat Surface Testing](/services/threat-surface-testing/).
