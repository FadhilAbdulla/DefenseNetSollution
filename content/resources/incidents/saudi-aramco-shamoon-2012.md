---
title: "Saudi Aramco and Shamoon (2012): The Wiper Attack That Shaped Gulf Cybersecurity"
description: "The Shamoon wiper erased data on around 30,000 Saudi Aramco workstations in 2012 and returned in later waves against Gulf organisations. What happened, why it matters for the GCC today, and how to build wiper resilience."
date: "2026-10-24"
name: "Shamoon wiper attack on Saudi Aramco"
organisation: "Saudi Aramco (and later RasGas and other Gulf organisations)"
occurred: "2012-08-15"
period: "August 2012, with later Shamoon waves in 2016–2017 and 2018"
sector: "Energy / Oil and gas"
region: "Saudi Arabia and the wider GCC"
attackType: "Destructive wiper malware"
actor: "Claimed by a group calling itself the 'Cutting Sword of Justice'; widely attributed by US officials and researchers to Iran"
impact: "Data on around 30,000 workstations wiped; business operations disrupted for weeks"
featured: true
tags: ["Wiper", "Energy", "GCC", "Saudi Arabia", "Nation-State", "OT", "Destructive Malware", "Backups"]
services: ["incident-response", "ot-ics-security", "identity-access-management", "managed-soc"]
related: ["incidents/notpetya-2017", "incidents/colonial-pipeline-ransomware-2021"]
---

On 15 August 2012, during the Islamic holiday period, malware later named Shamoon began erasing data on computers at Saudi Aramco, the world's largest oil producer. Within hours, around 30,000 workstations were unusable. It was one of the first openly destructive cyberattacks against a major company, and it remains a reference point for every security programme in the Gulf.

## What happened

Shamoon (also known as Disttrack) spread across Aramco's corporate network and overwrote files and the master boot record of infected Windows machines, partly replacing data with a fragment of an image of a burning American flag. Machines could not boot and data could not be recovered from them.

A group calling itself the "Cutting Sword of Justice" claimed responsibility, citing political motives. US officials and many security researchers have attributed Shamoon to Iranian state-linked actors. How the attackers first got in has never been conclusively made public.

Aramco has stated that oil production itself was not affected — the attack hit corporate IT rather than the systems that control production. But business processes that depend on computers, from procurement to logistics, were severely disrupted for weeks.

Days later, Qatar's RasGas reported a similar attack.

## Later waves

- **Shamoon 2 (2016–2017)** targeted government and private organisations in Saudi Arabia, again timed around holidays to maximise the delay before discovery.
- **Shamoon 3 (December 2018)** hit the Italian oil services company Saipem, affecting servers in the Middle East and elsewhere.

The repeated returns showed that destructive attacks on Gulf energy and government organisations were not a one-off event.

## Timeline

| Date | Event |
| --- | --- |
| 15 Aug 2012 | Shamoon activates at Saudi Aramco; around 30,000 workstations wiped |
| Late Aug 2012 | RasGas in Qatar reports a similar attack |
| Aug–Sep 2012 | Aramco disconnects from the internet and rebuilds its corporate IT |
| Nov 2016 – Jan 2017 | Shamoon 2 wave against Saudi organisations |
| Dec 2018 | Shamoon 3 hits Saipem |

## Impact

Aramco took its corporate network offline and replaced large numbers of workstations and hard drives to rebuild. Business operations reverted to manual processes for a period. For the region, the attack accelerated national cybersecurity programmes, including the frameworks and authorities that now govern critical infrastructure security across the GCC.

## What went wrong

- **Attackers held privileged access** sufficient to deploy malware across tens of thousands of machines.
- **Timing exploited reduced staffing,** with the attack launched during a holiday.
- **Recovery meant rebuilding,** because wiped machines could not be restored in place.

## Lessons and controls that would have helped

- **Plan for destruction, not just encryption.** Wipers offer no decryption key. Offline, immutable backups and rapid rebuild processes are the only recovery path.
- **Protect privileged access.** Tiered administration, privileged access management and monitoring of administrative tools limit an attacker's ability to deploy anything everywhere.
- **Separate IT and OT.** Aramco's production continued because operational systems were not taken down with corporate IT. That separation must be designed and tested.
- **Holiday-aware monitoring.** Shamoon waves repeatedly targeted holiday periods. Detection and response must be fully staffed when the organisation is not.
- **Rehearse rebuilding at scale.** Know how long it takes to reimage thousands of devices and restore identity services.

## Questions to ask about your own organisation

1. If tens of thousands of our workstations were wiped today, how long would it take to get people working again?
2. Are our backups protected from an attacker who has domain administrator access?
3. Would our operational technology keep running safely if corporate IT disappeared?
4. Is our security monitoring fully staffed during Eid, national holidays and year-end?
