---
title: "PCI-DSS 4.0: What Changed and What It Costs You"
description: "The new requirements in PCI-DSS 4.0 — customised approach, targeted risk analysis, script integrity and phishing-resistant authentication — and how to scope your assessment sensibly."
date: "2025-09-10"
category: "Compliance"
tags: ["PCI-DSS", "Payments", "Compliance", "Card Data"]
---

PCI-DSS 4.0 is a substantially larger standard than 3.2.1, and the future-dated requirements that were optional during transition are now in force. If your last assessment was against 3.2.1, several things will be new and a few will be expensive.

Here is what actually changed and where the effort goes.

## The structural change: customised approach

The most significant conceptual shift. Alongside the traditional prescriptive requirements, 4.0 permits a **customised approach** — meeting the stated security objective by a different means than the one specified.

This is genuinely useful for organisations with modern architectures where a literal reading of a requirement does not fit. It is also considerably more work: you must document the objective, the control you implemented, why it meets the objective, and a targeted risk analysis supporting it. Your assessor must then validate all of that.

**Practical guidance:** use the defined approach for most requirements and the customised approach only where the prescriptive control genuinely does not apply to your architecture. Using it broadly turns your assessment into an extended debate.

## Targeted risk analysis

Several requirements now let you set your own frequency for a periodic activity — but only if you perform and document a **targeted risk analysis** justifying it.

This applies to things like the frequency of log reviews, malware scans, and reviews of certain configurations. The analysis must identify the asset, the threat, the factors contributing to likelihood and impact, and a review cadence with justification.

It is a reasonable requirement that produces real work: each one is a documented artefact your assessor will examine, and they must be reviewed annually.

## Authentication changes

The requirements that most often force real change:

- **MFA for all access into the cardholder data environment**, not only for administrative and remote access. This is a significant expansion in scope
- **MFA for all administrative access**, including console access that was previously exempt
- **MFA must be resistant to replay attacks**, which pushes toward phishing-resistant methods
- **Passwords lengthened** to a minimum of twelve characters where used, with expiry not required if MFA and monitoring compensate

If your CDE has any single-factor access path remaining, closing it is likely the largest single piece of work in your transition.

## Script integrity on payment pages

Two requirements aimed squarely at digital skimming (Magecart-style attacks):

- **Manage all payment page scripts** — maintain an inventory, justify why each is necessary, and confirm each is authorised
- **Detect unauthorised changes** to the HTTP headers and content of payment pages

In practice this means implementing a content security policy, subresource integrity, and monitoring for changes to the payment page and the scripts it loads. It is the requirement organisations are most likely to have overlooked, because it sits with front-end engineering rather than infrastructure security.

## Anti-phishing controls

New requirements around detecting and protecting against phishing attacks, and training personnel to recognise them. The technical side means email authentication properly configured — SPF, DKIM and DMARC at enforcement, not monitoring — plus mechanisms to protect users from phishing.

## Automated log review

Log review can no longer be a manual daily exercise. Requirement 10 now expects automated mechanisms to perform audit log review, which in practice means a SIEM or equivalent with alerting, not a person scrolling through logs.

For smaller merchants this is frequently the requirement that drives a managed detection engagement, because the staffing to do it manually does not exist.

## Vulnerability management changes

- Internal vulnerability scans must be **authenticated**, which typically produces a substantially larger finding count than the unauthenticated scans many organisations were running
- The scope of what must be remediated is broader, with a targeted risk analysis required to justify remediation timelines for non-critical findings

Expect your first authenticated internal scan to be uncomfortable.

## Scope: the most important decision

Everything above costs more the larger your cardholder data environment is. Before doing any of it, revisit scope.

**Reduce scope by:**

- **Tokenisation.** Replace stored card data with tokens so systems handling tokens fall out of scope
- **Redirect or iframe payment pages** hosted by your provider, so card data never touches your servers. Note that even with a redirect, the page that contains the redirect is in scope for the script integrity requirements
- **Point-to-point encryption** for card-present environments, removing terminals and store networks from scope
- **Network segmentation**, validated by penetration testing. Segmentation that is not tested does not reduce scope

Scope reduction is almost always cheaper than compliance. An hour spent on architecture here saves months of assessment effort.

## Getting the segmentation testing right

If you claim segmentation to reduce scope, you must test it — at least annually, and after any significant change. The test must demonstrate that systems outside the CDE cannot reach systems inside it.

This is a specific, narrow test with a specific deliverable, and it is distinct from your general penetration testing requirement. Assessors examine it closely, because scope reduction depends entirely on it.

## A realistic transition plan

**Phase 1 — Scope confirmation.** Document data flows, confirm where card data actually goes, identify scope reduction opportunities. This is the highest-leverage work.

**Phase 2 — Gap assessment against 4.0.** Specifically the new requirements, since your 3.2.1 controls largely carry over.

**Phase 3 — Close authentication gaps.** MFA across all CDE access, phishing-resistant where possible. Usually the longest lead time.

**Phase 4 — Script integrity and anti-phishing.** Requires front-end and email engineering involvement.

**Phase 5 — Targeted risk analyses.** Document each one that your customised frequencies depend on.

**Phase 6 — Evidence and assessment.** Automated log review operating, authenticated scanning in place, segmentation testing complete.

## The overlap dividend

If you also hold ISO 27001 or are pursuing SOC 2, a large proportion of PCI-DSS 4.0 requirements map onto controls you already operate. Build one control matrix mapped to all applicable frameworks so a single piece of evidence satisfies several assessors.

Organisations that maintain separate programmes per framework spend two to three times what a unified approach costs, and they do it every year.

Our [compliance practice](/services/compliance-consulting) runs PCI-DSS 4.0 readiness alongside ISO 27001 and SOC 2 on a unified control set, and our [offensive security team](/services/vapt-penetration-testing) performs the segmentation and application penetration testing the standard requires. [Get in touch](/contact) if your next assessment is against 4.0 for the first time.
