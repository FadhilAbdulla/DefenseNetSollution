---
title: "Colonial Pipeline Ransomware (2021): One Password, Five Days of Fuel Shortages"
description: "A single compromised VPN password without MFA led to the shutdown of the largest fuel pipeline in the United States. What happened, why operations stopped, and the lessons for critical infrastructure."
date: "2026-10-24"
name: "Colonial Pipeline ransomware"
organisation: "Colonial Pipeline Company"
occurred: "2021-05-07"
period: "May 2021"
sector: "Energy / Critical infrastructure"
region: "United States"
attackType: "Ransomware with data theft"
actor: "DarkSide ransomware-as-a-service affiliate"
impact: "Pipeline shut down for about five days; fuel shortages across the US East Coast; ransom of 75 bitcoin paid"
featured: true
tags: ["Ransomware", "Critical Infrastructure", "OT", "VPN", "MFA", "Energy"]
services: ["identity-access-management", "incident-response", "ot-ics-security", "managed-soc"]
related: ["incidents/change-healthcare-ransomware-2024", "incidents/saudi-aramco-shamoon-2012"]
---

On 7 May 2021, Colonial Pipeline — operator of the largest refined-fuel pipeline system in the United States, carrying a large share of the fuel used on the East Coast — discovered a ransomware attack on its IT systems and shut down pipeline operations as a precaution. The shutdown lasted about five days and caused panic buying and fuel shortages across several states.

The attack did not require a zero-day. It required one password.

## What happened

The attackers, an affiliate of the DarkSide ransomware-as-a-service operation, gained access through a legacy VPN account. In testimony to the US Congress in June 2021, Colonial's CEO stated that the account was no longer in active use but had not been deactivated, and that it was not protected by multi-factor authentication. The password had likely been exposed in an earlier, unrelated breach.

Once inside, the attackers stole around 100 GB of data and deployed ransomware on IT systems, including systems used for billing.

## Timeline

| Date | Event |
| --- | --- |
| Late Apr 2021 | Attackers access the network through the legacy VPN account |
| 7 May 2021 | Ransom note discovered; pipeline operations halted |
| 7–8 May 2021 | Colonial pays a ransom of 75 bitcoin (about US$4.4 million at the time) |
| 12 May 2021 | Pipeline restart begins; normal service restored over following days |
| 7 Jun 2021 | US Department of Justice announces recovery of 63.7 bitcoin of the ransom |

## Why the pipeline stopped

There is no public evidence that the attackers reached the operational technology (OT) that physically controls the pipeline. Colonial shut down operations because it could not be sure the attack would not spread to OT, and because business systems — including billing — were affected. A pipeline that cannot track and bill deliveries cannot operate normally.

This is a pattern seen in many attacks on critical infrastructure: physical operations depend on IT systems more than diagrams suggest, so an IT incident becomes an operational one.

## Impact

- Fuel shortages and price spikes across parts of the US East Coast, with emergency declarations in several states.
- The ransom payment, of which the FBI later recovered the majority by seizing a cryptocurrency wallet.
- Regulatory change: the US Transportation Security Administration issued its first mandatory cybersecurity directives for pipeline operators within weeks.

## What went wrong

- **An unused account remained active.** Account lifecycle management failed to remove a VPN account that was no longer needed.
- **No MFA on remote access.** A password alone was enough to enter the network.
- **Operational dependence on IT.** Business systems that operations relied on were within reach of the attackers, and the separation between IT and OT was not clear enough to keep operating confidently.

## Lessons and controls that would have helped

- **MFA on every remote access path,** including legacy and service accounts. This single control would very likely have stopped this attack.
- **Regular access reviews.** Disable accounts automatically when they are unused or when their owners leave.
- **Credential exposure monitoring.** Watching breach dumps for corporate credentials gives early warning that a password must be changed.
- **Segmentation with understood dependencies.** Know which IT services OT operations depend on, protect those services accordingly, and design the ability to operate safely in a degraded mode.
- **Rehearsed decisions.** The decision to shut down — and to pay — was made under pressure. Exercises that rehearse these decisions in advance make them faster and better.

## Questions to ask about your own organisation

1. Can we prove every VPN and remote access account requires MFA — including service and break-glass accounts?
2. How quickly is an account disabled after its owner leaves or stops using it?
3. If our billing or ERP system were encrypted tomorrow, could operations continue safely?
4. Who has the authority to shut down operations during an incident, and have they rehearsed it?
