---
title: "NotPetya (2017): The Most Costly Cyberattack in History"
description: "NotPetya spread from a hijacked Ukrainian accounting software update to global companies like Maersk and Merck, destroying data while posing as ransomware. How it spread and the resilience lessons it left."
date: "2026-10-24"
name: "NotPetya destructive attack"
organisation: "Ukrainian organisations and multinationals including Maersk, Merck and FedEx/TNT"
occurred: "2017-06-27"
period: "27 June 2017"
sector: "Cross-sector: shipping, pharmaceuticals, logistics, manufacturing"
region: "Ukraine, then global"
attackType: "Supply chain compromise and destructive wiper disguised as ransomware"
actor: "Attributed by the US and UK governments to Russia's military intelligence (GRU, Sandworm)"
impact: "Global damage estimated by the US government at around US$10 billion"
cves: ["CVE-2017-0144"]
featured: true
tags: ["Wiper", "Supply Chain", "Nation-State", "EternalBlue", "Credential Theft", "Lateral Movement", "Backups"]
services: ["incident-response", "identity-access-management", "network-security", "managed-edr-xdr"]
related: ["incidents/wannacry-ransomware-2017", "cve/cve-2017-0144", "incidents/solarwinds-sunburst-supply-chain-attack", "incidents/saudi-aramco-shamoon-2012"]
---

NotPetya looked like ransomware. It displayed a ransom note and asked for bitcoin. But there was no way to pay and recover: the malware was designed to destroy. Released through a hijacked software update in Ukraine on 27 June 2017, it spread within hours to multinational companies with offices there and caused damage the US government later estimated at around US$10 billion.

## What happened

The attackers compromised the update mechanism of M.E.Doc, a tax and accounting application used by a large proportion of businesses in Ukraine. A malicious update delivered NotPetya to every organisation that ran the software — including the Ukrainian operations of global companies.

From there, NotPetya spread through corporate networks using two methods at once:

- **Exploits for SMB vulnerabilities,** including EternalBlue ([CVE-2017-0144](/resources/cve/cve-2017-0144/)) — the same flaw WannaCry had used six weeks earlier.
- **Credential theft.** It harvested passwords from memory and used legitimate Windows administration tools to log in to other machines. This meant even fully patched systems were infected if an administrator credential could reach them.

It then overwrote the master boot record and encrypted the file system in a way that made recovery impossible, regardless of payment.

## Impact

- **Maersk**, the world's largest container shipping company at the time, had to rebuild its IT infrastructure, reported as around 4,000 servers and 45,000 PCs. Its recovery famously relied on a domain controller in Ghana that had been offline during the attack because of a power outage.
- **Merck**, the pharmaceutical company, reported major disruption to manufacturing and research. **FedEx's TNT Express** subsidiary, **Mondelez**, **Saint-Gobain** and **Reckitt Benckiser** were among many others affected.
- In Ukraine, banks, government ministries, energy companies and the Chernobyl radiation monitoring system were disrupted.

The attack also produced long-running legal disputes over whether cyber insurance "war exclusions" applied to a state-sponsored attack — cases that shaped how insurers write cyber policies today.

## Timeline

| Date | Event |
| --- | --- |
| Apr–Jun 2017 | Attackers compromise M.E.Doc's update infrastructure |
| 27 Jun 2017 | Malicious M.E.Doc update releases NotPetya; global spread within hours |
| Jun–Jul 2017 | Affected multinationals report multi-week outages |
| Feb 2018 | US and UK governments attribute NotPetya to the Russian military |

## What went wrong

- **Trusted software updates delivered the attack.** Victims did nothing unusual; they ran a routine update.
- **Credentials unlocked everything.** Domain-wide administrator credentials cached on workstations let the malware reach almost every Windows machine.
- **Flat networks and global trust.** A compromise in a Ukrainian office could reach systems on other continents.
- **Recovery depended on luck.** Several victims lacked offline copies of identity infrastructure and core systems.

## Lessons and controls that would have helped

- **Tiered administration.** Prevent domain admin credentials from ever being used on, or cached on, ordinary workstations and servers.
- **Credential protection.** Windows Credential Guard, LSASS protection and EDR controls that block credential dumping.
- **Segmentation between regions and business units,** so a local compromise does not become a global one.
- **Offline, tested backups of Active Directory** and other foundational systems — and a rehearsed process for rebuilding from them.
- **Supply chain awareness.** Know which third-party software has automatic update rights on your systems, and monitor its behaviour.

## Questions to ask about your own organisation

1. If every Windows machine were wiped tonight, how long would it take to rebuild Active Directory from backup — and have we tried?
2. Where are domain administrator credentials used, and could malware harvest them from a regular server?
3. Can a compromise in one country or subsidiary reach systems in another?
4. Does our cyber insurance policy contain exclusions we have not discussed with our broker?
