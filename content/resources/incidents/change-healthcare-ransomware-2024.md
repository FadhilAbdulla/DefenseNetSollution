---
title: "Change Healthcare Ransomware (2024): The Largest Healthcare Data Breach on Record"
description: "A remote access portal without MFA led to an attack that paralysed US healthcare payments and exposed data on around 192.7 million people. How it happened and what every organisation should take from it."
date: "2026-10-24"
name: "Change Healthcare ransomware"
organisation: "Change Healthcare (UnitedHealth Group)"
occurred: "2024-02-21"
period: "February 2024 – July 2025 (final victim count)"
sector: "Healthcare / Payments"
region: "United States"
attackType: "Ransomware with data theft and double extortion"
actor: "ALPHV/BlackCat ransomware affiliate"
impact: "Weeks of disruption to claims and pharmacy payments; data on about 192.7 million individuals; US$22 million ransom paid"
featured: true
tags: ["Ransomware", "Healthcare", "MFA", "Remote Access", "Third-Party Risk", "Data Breach", "Concentration Risk"]
services: ["identity-access-management", "incident-response", "managed-soc", "compliance-consulting"]
related: ["incidents/colonial-pipeline-ransomware-2021", "incidents/aiims-delhi-ransomware-2022", "incidents/snowflake-customer-breaches-2024"]
---

Change Healthcare processes medical claims, insurance checks and pharmacy payments for a large share of the US healthcare system. When ransomware hit it in February 2024, hospitals, clinics and pharmacies across the country suddenly could not verify coverage or get paid. The data breach that came with it became the largest healthcare breach ever reported in the United States.

The way in was a remote access login that did not require multi-factor authentication.

## What happened

In testimony to the US Congress in May 2024, UnitedHealth Group's CEO stated that on 12 February 2024 the attackers used compromised credentials to access a Citrix remote access portal that did not have multi-factor authentication enabled. Over the following days they moved through the network and stole data. On 21 February they deployed ransomware.

Change Healthcare disconnected affected systems to contain the attack, which halted large parts of its claims and payment processing.

## Timeline

| Date | Event |
| --- | --- |
| 12 Feb 2024 | Attackers log in to a Citrix portal using stolen credentials; no MFA |
| 21 Feb 2024 | Ransomware deployed; Change Healthcare disconnects systems |
| Late Feb 2024 | ALPHV/BlackCat claims responsibility |
| Mar 2024 | Ransom paid; ALPHV shuts down in an apparent exit scam against its own affiliate |
| Apr 2024 | A second group, RansomHub, attempts further extortion using the stolen data |
| May 2024 | UnitedHealth CEO testifies to Congress and confirms a US$22 million payment |
| Jul 2025 | Final estimate of about 192.7 million affected individuals reported to US regulators |

## Impact

- **Operational:** pharmacies struggled to process prescriptions through insurance, and many healthcare providers faced serious cash-flow problems for weeks. UnitedHealth set up emergency funding programmes to keep providers solvent.
- **Data:** the estimated number of affected individuals rose from 100 million in late 2024 to about 192.7 million in the figure reported to the US Department of Health and Human Services in July 2025.
- **Financial:** UnitedHealth disclosed costs running into billions of dollars, including response, recovery and support to providers.
- **Criminal ecosystem:** the ransom did not end the extortion. ALPHV disappeared with the payment, and the affiliate took the data to another group.

## What went wrong

- **No MFA on remote access.** The single most important control was missing on an internet-facing entry point.
- **Concentration risk.** One company sat in the middle of a huge proportion of US healthcare transactions, so its outage became a sector-wide outage.
- **Paying did not guarantee deletion.** The payment neither protected the data nor ended the extortion.

## Lessons and controls that would have helped

- **MFA on every remote access path** — enforced technically and verified continuously, including on systems inherited through acquisitions.
- **Identity monitoring.** Alert on logins from new locations and devices to remote access portals, and on new privileged activity shortly afterwards.
- **Map critical dependencies.** For organisations that rely on a single processor, platform or supplier, plan how to operate if it disappears for weeks.
- **Network segmentation** to slow movement from a remote access foothold to core systems.
- **Decide your ransom position in advance,** with legal, regulatory and ethical considerations understood before a crisis.

## Questions to ask about your own organisation

1. Can we prove that every externally reachable login — VPN, Citrix, RDP gateway, admin portals — requires MFA?
2. Did systems from acquired companies get brought up to our security baseline?
3. Which single supplier, if offline for a month, would stop us operating, and what is our fallback?
4. If attackers demanded payment for stolen data, who would decide, and on what basis?
