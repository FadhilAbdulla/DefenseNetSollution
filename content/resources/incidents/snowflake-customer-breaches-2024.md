---
title: "Snowflake Customer Breaches (2024): Stolen Passwords, No MFA, Hundreds of Millions of Records"
description: "Attackers used infostealer-harvested credentials to log in to Snowflake customer accounts without MFA and stole data from AT&T, Ticketmaster, Santander and others. The cloud shared-responsibility lesson every data team needs."
date: "2026-10-24"
name: "Snowflake customer data theft campaign"
organisation: "Around 165 Snowflake customer organisations"
occurred: "2024-05-31"
period: "April – June 2024"
sector: "Cross-sector: telecoms, entertainment, banking, retail"
region: "Global (primarily United States)"
attackType: "Credential stuffing against cloud data platform accounts, followed by data-theft extortion"
actor: "Financially motivated group tracked by Mandiant as UNC5537"
impact: "Data stolen from customer accounts at major companies, including call and text metadata for nearly all of one US carrier's wireless customers"
featured: true
tags: ["Cloud", "SaaS", "MFA", "Infostealers", "Credentials", "Data Theft", "Shared Responsibility"]
services: ["identity-access-management", "threat-intelligence", "cloud-security", "database-security"]
related: ["incidents/change-healthcare-ransomware-2024", "incidents/colonial-pipeline-ransomware-2021"]
---

In mid-2024, a financially motivated group logged in to the Snowflake accounts of dozens of large companies and walked out with their data. They did not hack Snowflake's platform. They used usernames and passwords stolen by infostealer malware — some of them years old — against accounts that did not require multi-factor authentication.

It is the clearest recent example of the cloud shared-responsibility model failing at the customer's side of the line.

## What happened

Snowflake is a cloud data warehouse: organisations load large volumes of business data into it for analytics. According to Mandiant, which investigated with Snowflake and CrowdStrike, the attackers — tracked as UNC5537 — obtained customer credentials from infostealer malware logs. Infostealers are commodity malware that harvest saved passwords and session cookies from infected computers, including contractors' and personal machines used for work.

The attackers used those credentials to sign in to Snowflake customer accounts that:

- did not enforce multi-factor authentication,
- had not rotated credentials, in some cases since they were stolen years earlier, and
- did not restrict sign-ins to trusted network locations.

Once in, they queried and exported data, then extorted the victims, and in some cases offered the data for sale on criminal forums.

## Timeline

| Date | Event |
| --- | --- |
| Apr 2024 | Earliest observed unauthorised access to customer accounts |
| Late May 2024 | First victims become public; Snowflake, CrowdStrike and Mandiant publish a joint statement |
| Jun 2024 | Mandiant reports around 165 potentially exposed organisations were notified |
| Jul 2024 | A major US telecoms carrier discloses theft of call and text records |
| Late 2024 | Arrests of suspects linked to the campaign in Canada and Turkey |

## Impact

Organisations that disclosed data theft linked to the campaign included AT&T, Ticketmaster (Live Nation), Santander, Advance Auto Parts, Neiman Marcus and LendingTree. AT&T reported that records of calls and texts for nearly all of its wireless customers over a six-month period in 2022 had been taken.

In response, Snowflake introduced stronger controls, including allowing administrators to require MFA across an account and moving towards MFA by default.

## What went wrong

- **MFA was optional, and not enabled.** A password was all an attacker needed.
- **Stolen credentials stayed valid for years.** Without rotation, an old infostealer infection remained a live risk.
- **No network restrictions.** Accounts accepted logins from anywhere on the internet.
- **Unmanaged devices.** Many infostealer infections were on contractor or personal devices outside corporate control.

## Lessons and controls that would have helped

- **Enforce MFA on every cloud data platform,** and on service accounts use key-pair or federated authentication instead of passwords.
- **Use network policies** so data platforms only accept connections from known corporate or VPN addresses.
- **Rotate credentials** regularly and immediately after any sign of exposure.
- **Monitor infostealer leaks.** Threat intelligence that watches criminal markets for your organisation's credentials provides warning before they are used.
- **Monitor data access.** Large, unusual exports from a data warehouse — especially from new locations — should trigger an alert.
- **Bring contractors into scope.** Require contractors with data access to use managed, protected devices.

## Questions to ask about your own organisation

1. Do all our SaaS and cloud data platforms enforce MFA — not just offer it?
2. Would we know if one of our employees' or contractors' passwords appeared in an infostealer log?
3. Can our data warehouse be reached from any IP address on the internet?
4. Who would notice if a user exported an entire customer table at 2 AM?
