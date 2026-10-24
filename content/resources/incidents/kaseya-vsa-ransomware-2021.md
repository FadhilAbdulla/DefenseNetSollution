---
title: "Kaseya VSA Ransomware (2021): Attacking Hundreds of Businesses Through Their IT Provider"
description: "REvil exploited a zero-day in Kaseya VSA to push ransomware through managed service providers to around 1,500 downstream businesses in a single weekend. How it worked and what it means for MSP customers."
date: "2026-10-24"
name: "Kaseya VSA ransomware attack"
organisation: "Kaseya, its MSP customers and their clients"
occurred: "2021-07-02"
period: "2–22 July 2021"
sector: "IT services / Managed service providers (cross-sector victims)"
region: "Global (notably US and Europe)"
attackType: "Supply chain ransomware via remote management software"
actor: "REvil (Sodinokibi) ransomware operation"
impact: "Fewer than 60 MSPs and up to about 1,500 downstream businesses affected; Swedish supermarket chain Coop closed hundreds of stores"
cves: ["CVE-2021-30116"]
tags: ["Ransomware", "Supply Chain", "MSP", "Remote Management", "Zero-Day", "REvil"]
services: ["vulnerability-management", "managed-edr-xdr", "incident-response", "identity-access-management"]
related: ["incidents/solarwinds-sunburst-supply-chain-attack", "incidents/moveit-cl0p-mass-exploitation-2023"]
---

On Friday 2 July 2021, at the start of the US Independence Day weekend, the REvil ransomware group used a zero-day vulnerability in Kaseya VSA — remote monitoring and management software used by managed service providers (MSPs) — to push ransomware to the computers those MSPs managed. In a single coordinated strike, the attackers reached businesses that had never heard of Kaseya.

## What happened

Kaseya VSA lets MSPs manage their clients' computers remotely: deploying software, running scripts and applying updates. To do that, the VSA agent on each managed machine runs with high privileges and trusts instructions from the VSA server.

REvil exploited vulnerabilities in internet-facing, on-premises VSA servers, including an authentication flaw tracked as CVE-2021-30116. With control of the servers, they distributed a malicious "update" that disabled security protections and deployed REvil ransomware to managed endpoints.

The vulnerabilities had already been reported to Kaseya by researchers at the Dutch Institute for Vulnerability Disclosure (DIVD), and Kaseya was working on fixes when the attack happened.

## Timeline

| Date | Event |
| --- | --- |
| Apr 2021 | DIVD reports VSA vulnerabilities to Kaseya |
| 2 Jul 2021 | Attack launched; Kaseya advises customers to shut down on-premises VSA servers and takes its SaaS service offline |
| 4–5 Jul 2021 | REvil demands US$70 million for a universal decryptor |
| 11 Jul 2021 | Kaseya releases a patch and begins restoring its services |
| 22 Jul 2021 | Kaseya obtains a universal decryptor from a "trusted third party" |
| Nov 2021 | US authorities announce charges against a suspected affiliate, later extradited and convicted |

## Impact

Kaseya stated that fewer than 60 of its direct customers — mostly MSPs — were compromised, and that between 800 and 1,500 downstream businesses were affected. Victims included schools, dental practices, accounting firms and local businesses. In Sweden, the Coop supermarket chain closed several hundred stores for days because its checkout systems, managed through an affected provider, stopped working.

The universal decryptor eventually allowed recovery without paying, but many victims had already spent days rebuilding.

## What went wrong

- **One tool, total trust.** Remote management software had the privileges to install anything on every managed device, so compromising it meant compromising all of them.
- **Internet-facing management servers.** On-premises VSA servers exposed to the internet were the entry point.
- **Timing.** Attacking at the start of a holiday weekend maximised the time before defenders responded.

## Lessons and controls that would have helped

- **For businesses using an MSP:** ask which remote management tools have access to your systems, how they are secured and patched, whether MFA is enforced, and how you will be notified of an incident.
- **For MSPs:** treat RMM platforms as tier-zero systems. Do not expose management servers directly to the internet, enforce MFA, monitor for unusual mass script execution, and patch them as emergencies.
- **Tamper protection on EDR.** The attack tried to disable security tools before encrypting. Tamper-protected EDR raises the cost.
- **Response plans that cover supplier compromise,** including how to disconnect a supplier's access quickly.
- **Holiday coverage.** Attackers deliberately strike when teams are away. 24/7 monitoring has to mean every day.

## Questions to ask about your own organisation

1. Which third parties can remotely run code on our computers, and could we cut that access off within minutes?
2. Would we notice if our IT provider's tooling suddenly pushed a new script to every machine?
3. Is our EDR protected against being disabled by an administrator-level tool?
4. Who is on call this coming long weekend, and do they know it?
