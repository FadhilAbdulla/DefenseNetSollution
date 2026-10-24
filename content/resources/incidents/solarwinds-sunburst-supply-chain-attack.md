---
title: "SolarWinds SUNBURST: Anatomy of a Software Supply Chain Attack"
description: "How attackers hid a backdoor inside SolarWinds Orion updates, reached around 18,000 customers, and quietly breached government agencies and major companies — with the controls that would have limited it."
date: "2026-10-24"
name: "SolarWinds SUNBURST supply chain attack"
organisation: "SolarWinds and its Orion customers"
occurred: "2020-12-13"
period: "September 2019 – December 2020"
sector: "Software supply chain / Government / Technology"
region: "Global (primarily United States)"
attackType: "Software supply chain compromise"
actor: "APT29 / NOBELIUM — attributed by the US government to Russia's SVR"
impact: "Trojanised updates downloaded by around 18,000 customers; follow-on intrusions at US federal agencies and major technology firms"
featured: true
tags: ["Supply Chain", "Nation-State", "Backdoor", "Identity", "Cloud", "Golden SAML"]
services: ["managed-soc", "identity-access-management", "application-security", "threat-intelligence"]
related: ["incidents/kaseya-vsa-ransomware-2021", "cve/cve-2024-3094", "incidents/notpetya-2017"]
---

The SolarWinds compromise is the defining software supply chain attack of the past decade. Attackers broke into the build environment of a trusted IT monitoring vendor and inserted a backdoor into legitimate, digitally signed product updates. Thousands of organisations installed it themselves, through their normal patching process.

## What happened

SolarWinds Orion is a network and infrastructure monitoring platform. Because it monitors everything, it typically runs with broad network access and highly privileged credentials — exactly the properties an attacker wants.

Attackers gained access to SolarWinds' network in 2019. They deployed malware, later named SUNSPOT, on the build server that compiled Orion. SUNSPOT watched for Orion builds and swapped in a modified source file at compile time, so the backdoor — SUNBURST — was built into the product and signed with SolarWinds' legitimate certificate. The source code repository itself looked clean.

Orion releases containing SUNBURST were distributed between March and June 2020. SolarWinds later estimated that around 18,000 customers downloaded them.

## Timeline

| Date | Event |
| --- | --- |
| Sep 2019 | Attackers gain access to the SolarWinds environment |
| Oct 2019 | Test code inserted into an Orion build to validate the technique |
| Feb 2020 | SUNSPOT begins injecting SUNBURST into Orion builds |
| Mar–Jun 2020 | Trojanised Orion updates distributed to customers |
| 8 Dec 2020 | FireEye discloses that its own red-team tools were stolen |
| 13 Dec 2020 | FireEye and Microsoft publish details of SUNBURST; CISA issues Emergency Directive 21-01 |
| Apr 2021 | US government formally attributes the campaign to Russia's Foreign Intelligence Service (SVR) |

## How the attack worked

SUNBURST was built for stealth:

- **Patience.** After installation it waited roughly two weeks before doing anything.
- **Camouflage.** Its network traffic imitated Orion's legitimate telemetry protocol and used a domain-generation scheme under `avsvmcloud[.]com`, so communication looked like normal product behaviour.
- **Selectivity.** For the vast majority of the 18,000 installations, the attackers did nothing further. They chose a much smaller set of high-value targets — reported to include around 100 companies and nine US federal agencies — for hands-on follow-up.

Once inside a selected victim, the attackers moved to identity infrastructure. A key technique was forging SAML tokens — sometimes called "Golden SAML" — after stealing the signing certificate from an on-premises federation server. That let them authenticate to cloud services such as Microsoft 365 as any user, bypassing MFA.

## Impact

Victims included the US Departments of the Treasury, Commerce and Homeland Security, among others, and technology and security companies including FireEye and Microsoft. Much of the activity was espionage: reading email and accessing source code and sensitive documents.

The cost of investigation and remediation across government and industry ran into large sums, and the incident triggered major policy changes in the United States, including a 2021 executive order on improving national cybersecurity with a strong focus on software supply chain security.

## What went wrong

- **The build pipeline was not treated as a crown jewel.** A compromise of the build server meant a compromise of every customer.
- **Trusted software had untrusted reach.** Orion servers were commonly allowed to talk to the internet and held powerful credentials across the network.
- **Identity was the real target.** Once attackers could forge authentication tokens, network perimeter controls were irrelevant.

## Lessons and controls that would have helped

- **Restrict egress from management servers.** Monitoring and management platforms rarely need unrestricted internet access. Allow-listing their outbound connections would have broken SUNBURST's command channel.
- **Monitor identity infrastructure.** Alert on changes to federation trust, token-signing certificates and unusual token issuance. Protect federation servers like domain controllers.
- **Least privilege for tools.** Give monitoring and management tools only the access they need, scoped by network segment.
- **Secure the build.** For software producers: isolated, monitored build environments, reproducible builds, and verification that what ships matches what was reviewed.
- **Plan for vendor compromise.** Include "a trusted vendor's update is malicious" in incident response exercises.

## Questions to ask about your own organisation

1. Which of our third-party tools have domain admin or equivalent privileges, and could we detect if one behaved maliciously?
2. Do our management servers have unrestricted outbound internet access?
3. Would we notice if someone added a federation trust or exported our token-signing certificate?
4. Do we have a list of every vendor whose software updates install automatically on critical systems?
