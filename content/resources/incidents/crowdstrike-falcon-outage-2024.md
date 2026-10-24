---
title: "The CrowdStrike Outage (2024): When a Security Update Took Down 8.5 Million PCs"
description: "A faulty CrowdStrike Falcon content update crashed about 8.5 million Windows devices, grounding flights and disrupting hospitals and banks. Not a cyberattack — but one of the most important resilience lessons of the decade."
date: "2026-10-24"
name: "CrowdStrike Falcon outage"
organisation: "CrowdStrike customers worldwide"
occurred: "2024-07-19"
period: "19 July 2024 (recovery over following days)"
sector: "Cross-sector: aviation, healthcare, banking, retail, media"
region: "Global"
attackType: "Not a cyberattack — faulty security software update"
impact: "About 8.5 million Windows devices crashed; airline, hospital and banking operations disrupted for days"
tags: ["Resilience", "Business Continuity", "Third-Party Risk", "EDR", "Change Management", "BitLocker"]
services: ["managed-edr-xdr", "incident-response", "compliance-consulting", "soc-build-modernisation"]
related: ["incidents/notpetya-2017", "incidents/change-healthcare-ransomware-2024"]
---

On 19 July 2024, millions of Windows computers around the world crashed to a blue screen and failed to restart. Airlines grounded flights, hospitals postponed procedures, banks and payment systems went down, and broadcasters went off air. The cause was not an attacker. It was a routine content update to CrowdStrike Falcon, one of the most widely used endpoint security products.

It belongs in any review of major security incidents because it tested exactly the same capabilities a destructive cyberattack would: business continuity, recovery at scale, and dependence on a single supplier.

## What happened

At 04:09 UTC, CrowdStrike pushed a "Rapid Response Content" update — configuration data that tells the Falcon sensor which behaviours to look for — to Windows hosts. The update, delivered as a file known as Channel File 291, triggered an out-of-bounds memory read in the Falcon sensor, which runs inside the Windows kernel. Windows crashed, rebooted, loaded the sensor again, and crashed again.

CrowdStrike reverted the update at 05:27 UTC, but machines that had already received it were stuck in a crash loop and could not receive the fix automatically. Mac and Linux hosts were not affected.

CrowdStrike's root cause analysis traced the problem to a mismatch between the number of input fields the new content expected and the number the sensor actually supplied, which its content validation had not caught.

## Timeline

| Time (UTC, 19 Jul 2024) | Event |
| --- | --- |
| 04:09 | Faulty Channel File 291 update released to Windows sensors |
| 05:27 | CrowdStrike reverts the update |
| Morning onwards | Organisations worldwide begin manual recovery, machine by machine |
| 20 Jul 2024 | Microsoft estimates about 8.5 million Windows devices affected |
| Following days | Airline schedules and hospital systems recover over several days |

## Impact

Microsoft estimated that about 8.5 million Windows devices were affected — under 1% of all Windows machines, but concentrated in large enterprises running critical services. One US airline cancelled thousands of flights over several days. Insurer Parametrix estimated direct losses of around US$5.4 billion for US Fortune 500 companies alone.

Attackers moved quickly to exploit the confusion, registering lookalike domains and sending phishing emails offering fake "fixes" and recovery tools.

## Why recovery was so slow

The fix itself was simple: boot into Safe Mode or the Windows Recovery Environment and delete the faulty file. Doing that on hundreds of thousands of machines was not:

- **Manual, hands-on work.** Each affected machine needed someone at the keyboard or a remote console.
- **BitLocker recovery keys.** Encrypted disks required their recovery keys before the file could be deleted. Organisations without accessible, well-organised key escrow — or whose key escrow ran on machines that had also crashed — were stuck.
- **Cloud virtual machines** needed disks detached and repaired from another machine.

## What went wrong

- **No staged rollout for content updates.** The update reached all customers' Windows sensors at once rather than progressing through rings.
- **Single points of failure.** Many organisations had no way to operate critical services if their Windows endpoints were unavailable.
- **Recovery dependencies were untested.** Key escrow, out-of-band access and recovery runbooks were not ready for mass failure.

## Lessons and controls that would have helped

- **Ask vendors how they stage updates.** Since the outage, CrowdStrike and others have given customers more control over update timing. Use it: put a small canary group ahead of critical systems.
- **Make BitLocker keys retrievable when everything is down.** Escrow in a system that does not depend on the affected endpoints, with printed or offline break-glass access for critical servers.
- **Plan for mass endpoint failure.** Whether it is a bad update or a wiper, rehearse rebuilding or recovering large numbers of machines quickly.
- **Expect opportunistic phishing** after any widely reported incident, and warn staff early.
- **Measure concentration risk.** Know which single products, if they failed, would take down your critical services.

## Questions to ask about your own organisation

1. If every Windows machine failed to boot tomorrow, could we retrieve all BitLocker recovery keys — and could we do it from a phone?
2. Which software can push kernel-level updates to every endpoint at once, and can we stage those updates?
3. Do our critical services have a manual or degraded mode of operation?
4. How would we warn staff about fake "fix" phishing within the first hour of a public incident?
