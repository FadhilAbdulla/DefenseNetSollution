---
title: "The Equifax Breach (2017): How a Missed Patch Exposed 147 Million People"
description: "An unpatched Apache Struts flaw, an expired certificate that blinded monitoring, and plaintext credentials turned a single web portal into one of the largest data breaches in history. The full chain of failures."
date: "2026-10-24"
name: "Equifax data breach"
organisation: "Equifax"
occurred: "2017-07-29"
period: "13 May – 30 July 2017 (announced 7 September 2017)"
sector: "Financial services / Credit reporting"
region: "United States, United Kingdom and Canada"
attackType: "Web application exploitation and data exfiltration"
actor: "Four members of China's People's Liberation Army, indicted by the US Department of Justice in 2020"
impact: "Personal data of about 147 million people exposed; settlement of up to US$700 million with US regulators"
cves: ["CVE-2017-5638"]
featured: true
tags: ["Data Breach", "Apache Struts", "Patch Management", "Monitoring", "Credentials", "Financial Services"]
services: ["vulnerability-management", "managed-soc", "database-security", "application-security"]
related: ["cve/cve-2017-5638", "incidents/moveit-cl0p-mass-exploitation-2023"]
---

The Equifax breach is often summarised as "they did not patch". That is true, but it is only the first of several failures. Any one of the later controls — asset inventory, network monitoring, segmentation, credential protection — could have reduced or stopped the theft of personal data belonging to around 147 million people.

## What happened

In March 2017, Apache disclosed and fixed [CVE-2017-5638](/resources/cve/cve-2017-5638/), a critical remote code execution flaw in the Apache Struts web framework. Equifax's security team circulated an internal alert. The patch was not applied to the online dispute portal that used Struts, and a later vulnerability scan did not detect that the portal was still vulnerable.

From mid-May 2017, attackers exploited the flaw to gain access to the portal. Inside, they found credentials stored in plain text, which they used to access databases beyond the portal itself. Over roughly 76 days, they ran thousands of queries and extracted personal data in small chunks to avoid notice.

## Why it went unnoticed

Equifax used a device to inspect encrypted network traffic for signs of data theft. Its SSL certificate had expired — according to the US Government Accountability Office's later review, many months earlier — so the device had not been inspecting that traffic. When the certificate was renewed on 29 July 2017, suspicious traffic was spotted almost immediately.

## Timeline

| Date | Event |
| --- | --- |
| 7 Mar 2017 | Apache discloses CVE-2017-5638 and releases fixed Struts versions |
| 9 Mar 2017 | Equifax circulates an internal alert to patch |
| 15 Mar 2017 | Internal vulnerability scan fails to identify the vulnerable portal |
| 13 May 2017 | Attackers first exploit the dispute portal |
| 29 Jul 2017 | Expired certificate renewed; suspicious traffic detected |
| 30 Jul 2017 | Portal taken offline |
| 7 Sep 2017 | Breach publicly announced |
| Jul 2019 | Settlement with the FTC, CFPB and US states of up to US$700 million |
| Feb 2020 | US Department of Justice indicts four PLA members |

## Impact

The stolen data included names, Social Security numbers, dates of birth, addresses and, for some people, driver's licence and credit card numbers. Smaller numbers of UK and Canadian residents were also affected. Equifax's CEO, CIO and CSO left the company, and the breach became a standard case study in board-level accountability for cybersecurity.

## What went wrong

- **The patch was not applied** to an internet-facing system using the vulnerable component.
- **Asset inventory was incomplete.** The organisation did not reliably know which systems used Struts.
- **Detection was blind.** An expired certificate silently disabled traffic inspection for a long period.
- **Credentials were stored in plain text,** turning one compromised application into access to many databases.
- **Segmentation was insufficient** to stop movement from the portal to other data stores.

## Lessons and controls that would have helped

- **Verify patching, do not assume it.** Track remediation to closure per asset and confirm with authenticated scans.
- **Maintain a software inventory** showing which applications use which components, with named owners.
- **Monitor your monitoring.** Alert when a security control stops working — an expired certificate, a silent log source, a disabled sensor.
- **Protect secrets.** Store credentials in a secrets vault, never in plain text in application files.
- **Database activity monitoring.** Thousands of unusual queries over weeks is a pattern that database monitoring is built to catch.
- **Limit what each application can reach,** so a breach of one portal does not expose the whole data estate.

## Questions to ask about your own organisation

1. For the last critical vulnerability we patched, can we prove every affected system was fixed?
2. Would we be alerted if one of our security tools quietly stopped working?
3. Are any database or service credentials stored in plain text in configuration files?
4. Would we notice an application running thousands of unusual queries against a customer database?
