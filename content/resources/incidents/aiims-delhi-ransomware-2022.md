---
title: "AIIMS Delhi Ransomware Attack (2022): Lessons for Indian Healthcare"
description: "A ransomware attack forced India's premier public hospital onto manual operations for about two weeks. What is publicly known, what it means under CERT-In's reporting rules and DPDPA 2023, and how Indian hospitals can prepare."
date: "2026-10-24"
name: "AIIMS Delhi ransomware attack"
organisation: "All India Institute of Medical Sciences (AIIMS), New Delhi"
occurred: "2022-11-23"
period: "23 November – early December 2022"
sector: "Healthcare / Public sector"
region: "India"
attackType: "Ransomware"
actor: "Not officially identified"
impact: "eHospital systems offline; manual patient registration and operations for about two weeks; about 1.3 TB of data encrypted on five servers per government findings"
featured: true
tags: ["Ransomware", "Healthcare", "India", "CERT-In", "DPDPA", "Backups", "Public Sector"]
services: ["incident-response", "managed-soc", "compliance-consulting", "database-security"]
related: ["incidents/wannacry-ransomware-2017", "incidents/change-healthcare-ransomware-2024"]
---

On the morning of 23 November 2022, the computer systems at the All India Institute of Medical Sciences in New Delhi — one of the country's most important public hospitals, serving a very large number of patients every day — stopped working. Servers running the hospital's eHospital platform had been hit by ransomware. For about two weeks, one of India's busiest hospitals registered patients, managed admissions and handled laboratory reports by hand.

For Indian organisations, AIIMS is the most widely known ransomware attack on a domestic institution, and it shaped how the government and healthcare sector think about cyber risk.

## What happened

The eHospital system, operated with the National Informatics Centre (NIC), became unavailable on 23 November 2022, and it was soon established that servers had been encrypted. Hospital services moved to manual mode — outpatient registration, admissions, billing, laboratory and sample collection.

Government statements to Parliament in December 2022, drawing on CERT-In's preliminary findings, reported that five servers had been affected and around 1.3 terabytes of data encrypted. Officials said the data was recovered from backup servers and systems were restored progressively, with online services resuming in early December.

The investigation involved Delhi Police, CERT-In and central agencies. Media reports at the time cited a large ransom demand in cryptocurrency; Delhi Police said no ransom demand had been reported to them, and the claim was never confirmed. The attackers were not officially identified.

## Timeline

| Date | Event |
| --- | --- |
| 23 Nov 2022 | eHospital servers go down; manual operations begin |
| 25 Nov 2022 | Delhi Police registers a case; central agencies join the investigation |
| Late Nov 2022 | Systems restored progressively from backups onto cleaned infrastructure |
| Early Dec 2022 | Online services resume; Parliament informed of five servers and about 1.3 TB affected |

## Impact

The visible impact was operational: long queues, manual processes and slower care in a hospital that serves patients from across India. The less visible concern was data — AIIMS holds medical records for very large numbers of patients, including public figures. Official statements focused on encryption and recovery rather than confirmed data theft, but the incident triggered a broad review of security across government health systems.

## What it means for Indian organisations today

Two regulatory developments make an AIIMS-style incident considerably more demanding for organisations now:

- **CERT-In Directions (April 2022)** require specified cybersecurity incidents, including ransomware, to be reported to CERT-In within **six hours** of being noticed, and require logs to be retained for 180 days within India.
- **The Digital Personal Data Protection Act, 2023** places obligations on organisations that process personal data, including notifying the Data Protection Board and affected individuals of personal data breaches, with significant financial penalties for failures.

A hospital or any other organisation hit today needs to make those notifications under pressure, accurately, while also restoring services.

## Lessons and controls that would have helped

- **Backups that ransomware cannot reach.** AIIMS's recovery depended on backups. Offline or immutable backups, tested regularly, are the difference between days and months.
- **Segment clinical and administrative systems,** so a compromise in one area does not take down hospital-wide services.
- **Monitor around the clock.** Ransomware operators typically spend time inside a network before encrypting. 24/7 detection is how that window is used.
- **Downtime procedures.** Every hospital should have tested paper-based procedures for registration, prescribing and laboratory work, with forms ready to use.
- **Know the reporting clock.** Prepare CERT-In and DPDPA notification templates and decision-makers before an incident, not during one.

## Questions to ask about your own organisation

1. If our core system were encrypted at 7 AM tomorrow, could we report the incident to CERT-In within six hours with accurate information?
2. When did we last restore our main application from backup, end to end, and how long did it take?
3. Can a single compromised server reach every other critical system on our network?
4. Do our staff know how to operate if every computer in the building is unavailable?
