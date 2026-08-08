---
title: "VAPT, Penetration Testing and Red Teaming: What You Are Actually Buying"
description: "The three terms are used interchangeably and mean very different things. A clear breakdown of scope, cost, output and when each is the right choice."
date: "2026-04-29"
category: "Offensive Security"
tags: ["VAPT", "Penetration Testing", "Red Team", "Security Testing"]
---

"We need a VAPT" is one of the most common opening lines we hear. Roughly half the time, the organisation saying it needs something else entirely.

The terms have been blurred by procurement templates and vendors happy to sell whatever was asked for. Here is what each actually is, what it costs, and how to tell which one you need.

## Vulnerability assessment

**What it is:** Automated scanning of systems to identify known vulnerabilities, followed by validation and prioritisation.

**What you get:** A list of findings mapped to CVEs with CVSS scores, false positives removed, ranked by severity and exploitability in your context.

**What it does not do:** It does not prove exploitability, chain findings together, or test business logic. A scanner reports that a version is vulnerable; it does not tell you whether an attacker could actually reach and use it.

**When it is right:** Regular hygiene — quarterly or monthly across a large estate. Also the right first step if you have never assessed at all, because there is no point paying for manual testing to find missing patches.

**Rough effort:** Days. Largely tool-driven with human validation.

## Penetration testing

**What it is:** A human tester attempting to exploit weaknesses within a defined scope and timeframe, using the same techniques an attacker would.

**What you get:** Validated, exploited findings with proof-of-concept evidence, a demonstration of what an attacker could reach, and specific remediation guidance. Business-logic flaws that no scanner finds — broken object-level authorisation, workflow bypass, privilege confusion between tenants.

**What it does not do:** It does not test whether your detection and response work. Scope is agreed and the testing is loud; your SOC usually knows it is happening.

**When it is right:** Before a major release, annually for customer-facing applications, when a client or regulator requires it, or when you need to know whether a specific system is actually defensible.

**Rough effort:** One to four weeks depending on scope. Genuinely manual work by experienced testers.

### Black, grey or white box?

- **Black box** — no prior knowledge. Realistic for perimeter testing, but a significant fraction of the budget is spent on reconnaissance you could have simply told them.
- **Grey box** — credentials and architecture provided. Best coverage per rupee for most engagements, because testing time goes into depth.
- **White box** — full source and configuration access. Highest assurance, appropriate for high-consequence applications.

For most organisations, grey box is the correct default. Black box makes sense when the specific question is "how exposed is our perimeter to an anonymous attacker?"

## Red teaming

**What it is:** A goal-oriented, stealth-aware operation simulating a specific adversary, testing people, processes and technology together. The objective is not to enumerate vulnerabilities — it is to achieve a defined outcome, such as accessing a specific dataset, without being detected.

**What you get:** An honest measure of whether your detection and response actually work. An attack narrative showing the path taken, and — most valuably — a timeline of what your defenders saw and when.

**What it does not do:** It does not give you comprehensive vulnerability coverage. A red team may achieve its objective through one path and never touch ninety per cent of your estate. Using it as a substitute for penetration testing leaves large areas untested.

**When it is right:** When you already have a mature security programme, a functioning SOC, and you want to know whether it works under realistic pressure. It is wasted on organisations that have not yet done the basics — you will pay a premium to be told what a vulnerability assessment would have found in a day.

**Rough effort:** Four to twelve weeks, including reconnaissance and slow, deliberate operations.

### Purple teaming

A variant worth knowing: red and blue teams working collaboratively rather than adversarially. The red team executes a technique, the blue team checks whether it was detected, and detection gaps are fixed immediately.

For organisations building detection capability, purple teaming produces more improvement per rupee than a covert red team, because every finding turns directly into a new detection rule rather than a paragraph in a report.

## So what does "VAPT" mean?

In Indian and Gulf procurement, "VAPT" is used to mean anything from a scan to a full penetration test. That ambiguity is a commercial risk for you: two vendors can quote wildly different prices for the same words and both be quoting honestly for what they intend to deliver.

Protect yourself by specifying, in the statement of work:

- **Scope** — exact IP ranges, URLs, applications, and whether cloud configuration is included
- **Testing depth** — automated scanning, manual exploitation, or both
- **Credentials** — is authenticated testing included, for which roles
- **Business logic** — explicitly in scope or not
- **Retesting** — is a retest of remediated findings included, and within what window
- **Deliverables** — executive summary, technical findings with evidence, remediation plan, attestation letter
- **Tester profile** — certifications and relevant experience of the people actually doing the work

That last one matters more than it sounds. Ask who will perform the test, not who owns the company.

## Choosing between them

| Your situation | What you need |
| --- | --- |
| Never assessed anything | Vulnerability assessment first |
| Launching a new application | Penetration test, grey box, authenticated |
| Client security questionnaire demands proof | Penetration test with attestation letter |
| Large estate, need ongoing hygiene | Recurring vulnerability assessment plus annual pen test |
| Have a SOC, want to know if it works | Purple team, then red team |
| Post-incident, want assurance | Compromise assessment, then targeted penetration test |
| Regulator requires annual testing | Penetration test scoped to the regulated systems |

## What a good report looks like

Regardless of which you buy, the deliverable should contain:

- An **executive summary** in business language — what an attacker could do, and what it would cost you
- **Findings with evidence** — request/response pairs, screenshots, commands, enough for an engineer to reproduce
- **Realistic severity** — CVSS as a baseline, adjusted for exploitability and business context. A critical CVSS on an isolated internal system is not a critical business risk
- **Specific remediation** — "implement input validation" is not guidance; the exact parameter, the exact fix, and the code pattern to use is
- **An attack narrative** — how findings chain together. Three medium findings that combine into full compromise matter more than one isolated high

If a report is a scanner export with a cover page, you paid for a vulnerability assessment and were told it was a penetration test.

Our [offensive security practice](/services/vapt-penetration-testing) scopes engagements to the question you actually need answered, and includes retesting and an attestation letter as standard. If you are unsure which of the three you need, [a short call will settle it](/contact) — including telling you when the answer is the cheapest option.
