---
title: "WannaCry (2017): The Ransomware Worm That Hit Hospitals Worldwide"
description: "WannaCry spread to hundreds of thousands of computers in about 150 countries in days, disrupting the UK's National Health Service. How the worm worked, how it was stopped, and why it still matters."
date: "2026-10-24"
name: "WannaCry ransomware worm"
organisation: "Organisations worldwide, including the UK National Health Service"
occurred: "2017-05-12"
period: "12–15 May 2017"
sector: "Cross-sector, with severe impact on healthcare"
region: "Global (around 150 countries)"
attackType: "Self-propagating ransomware worm"
actor: "Attributed by the US and UK governments to North Korea (Lazarus Group)"
impact: "Hundreds of thousands of computers encrypted; around a third of NHS trusts in England disrupted"
cves: ["CVE-2017-0144"]
featured: true
tags: ["Ransomware", "Worm", "EternalBlue", "SMB", "Healthcare", "Patch Management", "Legacy Systems"]
services: ["vulnerability-management", "network-security", "managed-edr-xdr", "incident-response"]
related: ["cve/cve-2017-0144", "incidents/notpetya-2017", "incidents/aiims-delhi-ransomware-2022"]
---

On Friday 12 May 2017, a ransomware strain called WannaCry began spreading across the world at a speed no ransomware had reached before. Within days it had encrypted hundreds of thousands of computers in around 150 countries. Hospitals in the United Kingdom diverted ambulances and cancelled appointments; manufacturers, telecoms companies and railways were hit.

It spread on its own — no phishing email, no human operator choosing targets.

## What happened

WannaCry combined ransomware with a worm. The worm used **EternalBlue**, an exploit for the Windows SMBv1 vulnerability [CVE-2017-0144](/resources/cve/cve-2017-0144/), which had been leaked publicly a month earlier. Any Windows machine with SMBv1 exposed and without the March 2017 MS17-010 patch could be infected without user interaction.

Once infected, a machine encrypted its files, displayed a ransom demand for bitcoin, and immediately began scanning for more vulnerable machines — on the local network and across the internet.

## How it was stopped

The malware checked whether a particular, unregistered web domain existed before running. On the afternoon of 12 May, security researcher Marcus Hutchins noticed the domain in the code and registered it. From that point, new infections that could reach the domain stopped executing. This "kill switch" dramatically slowed the spread, although variants without it followed.

## Timeline

| Date | Event |
| --- | --- |
| 14 Mar 2017 | Microsoft releases MS17-010, fixing the SMBv1 vulnerabilities |
| 14 Apr 2017 | The Shadow Brokers publish the EternalBlue exploit |
| 12 May 2017 | WannaCry outbreak begins; kill-switch domain registered the same day |
| 13 May 2017 | Microsoft releases emergency patches for unsupported Windows XP and Server 2003 |
| Dec 2017 | US and UK governments attribute WannaCry to North Korea |

## Impact

The UK's National Audit Office found that around a third of NHS trusts in England were disrupted and that roughly 19,000 appointments were cancelled. Organisations from European carmakers to Asian telecoms operators reported infections. India was also among the affected countries, with infections reported at organisations including police and utility systems in some states.

Despite the scale, the ransom payments collected were small — reportedly in the region of US$140,000. The damage came from disruption, not extortion.

## What went wrong

- **Patches were available but not applied.** MS17-010 had been released two months earlier.
- **Unsupported systems remained in use.** Windows XP and similar systems were common in medical equipment and industrial environments.
- **Networks were flat.** Once inside, the worm could reach large numbers of machines over SMB with nothing in the way.
- **SMBv1 was enabled unnecessarily.** A decades-old protocol that most networks no longer needed provided the attack path.

## Lessons and controls that would have helped

- **Patch critical, wormable vulnerabilities fast.** Vulnerabilities that allow unauthenticated remote code execution over common protocols need emergency handling.
- **Retire legacy protocols.** Disabling SMBv1 would have stopped the worm on its own.
- **Segment networks.** Restricting SMB between network zones contains worms and human attackers alike.
- **Protect what cannot be patched.** Medical and industrial devices running old operating systems belong in isolated segments with tightly controlled access.
- **Test backups and recovery.** Recovery speed depended on whether organisations could restore systems quickly from clean backups.

## Questions to ask about your own organisation

1. How long does it take us to deploy a critical Windows security update across every machine?
2. Is SMBv1 still enabled anywhere — and do we know which devices depend on it?
3. Could a single infected laptop reach our servers and medical or production equipment over SMB?
4. Which systems run unsupported operating systems, and how are they isolated?
