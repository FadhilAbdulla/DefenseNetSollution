---
title: "Penetration Testing in Dubai: What UAE Clients and Regulators Expect"
description: "How VAPT and penetration testing work for Dubai businesses — scoping, testing types, the reports UAE regulators and enterprise customers ask for, and how to tell a real test from a scanner report."
date: "2026-10-31"
category: "UAE & Dubai"
tags: ["Dubai", "UAE", "VAPT", "Penetration Testing", "Red Team"]
---

Sooner or later, almost every Dubai business is asked for a penetration test report — by a bank onboarding you as a supplier, a government entity issuing a tender, an auditor, or an investor running due diligence. The question is whether you get a test that actually finds what an attacker would, or a scanner printout with a logo on it.

## VAPT, penetration testing and red teaming

The terms are used loosely in the UAE market, so it is worth being precise:

- **Vulnerability assessment** uses automated tools to find known weaknesses. It is broad and fast, but it reports what *might* be exploitable.
- **Penetration testing** adds skilled manual work to prove what *is* exploitable — chaining weaknesses, abusing business logic and showing real impact.
- **Red teaming** is goal-driven and stealthy, testing whether your detection and response would notice a realistic attack.

"VAPT" usually means the first two together. Our article on [VAPT vs penetration testing vs red team](/blog/vapt-vs-penetration-testing-vs-red-team/) goes deeper.

## What gets tested

For most Dubai organisations, a sensible scope covers:

- **External perimeter:** every internet-facing system, including VPN gateways and firewalls — the devices behind many recent mass compromises, such as the [FortiOS SSL VPN flaw](/resources/cve/cve-2024-21762/).
- **Web applications and APIs:** customer portals, e-commerce, booking and payment systems, mobile app back-ends.
- **Internal network and Active Directory:** what an attacker could reach after phishing one employee.
- **Cloud configuration:** AWS, Azure and Google Cloud accounts, including the UAE regions many companies now use.

## What regulators and customers look for

Requirements differ by sector. Dubai Government entities and their suppliers operate under the Dubai Electronic Security Center's (DESC) requirements; federal entities and critical infrastructure reference the UAE Information Assurance Regulation; banks follow Central Bank of the UAE expectations; and payment businesses need PCI DSS 4.0. What they share is a demand for evidence that testing is regular, independent and followed through.

A report that satisfies them typically includes:

1. A clear scope and testing methodology.
2. An executive summary in business-risk language.
3. Findings with severity, evidence and reproduction steps.
4. A remediation plan — and a **retest** confirming fixes.
5. An attestation letter you can share with customers and auditors.

## How to spot a weak test

- The report is hundreds of pages long and mostly scanner output.
- Findings have no proof of exploitation or screenshots.
- There is no retest, or the retest costs as much as the original.
- Nobody walks your engineers through the results.

## Testing more than once a year

Applications change every week. An annual test leaves eleven months of blind spots. Many Dubai teams now pair a yearly manual test with continuous automated testing — the reason we built [Guardian](/products/guardian/) — so new issues are caught between engagements.

## How we work in Dubai

Our [VAPT and red team service](/services/vapt-penetration-testing/) is delivered by certified testers (OSCP, CEH, CISSP) with written rules of engagement and testing windows that avoid your business-critical hours. Retesting of fixed findings is included. Contact our [Dubai office](/dubai/) or [request a scope](/contact/) — we will tell you the smallest test that answers the question you are being asked.
