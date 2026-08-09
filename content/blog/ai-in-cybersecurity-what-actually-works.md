---
title: "AI in Cybersecurity: What Actually Works in a Real SOC"
description: "Cutting through the marketing. Where machine learning genuinely improves detection and response, where it fails, and how to evaluate an AI security claim before you buy it."
date: "2026-07-28"
category: "AI & Security"
tags: ["AI", "SOC", "Machine Learning", "Detection"]
featured: true
---

Every security vendor now sells AI. Very few will tell you what their models actually do, what they cost you in false negatives, or what happens when the model is wrong. After several years of running machine learning inside a production SOC, here is an honest account of what works, what does not, and what to ask before you sign anything.

## The problem AI is genuinely good at

Security operations has a volume problem, not an intelligence problem. A mid-sized enterprise generates tens of thousands of security-relevant events a day. Of those, a few hundred become alerts. Of those alerts, a handful matter. Analysts spend the overwhelming majority of their time establishing that something is *not* a problem.

That work is repetitive, context-heavy and well-suited to automation:

- **Enrichment.** Pulling the asset owner, the criticality tier, the user's normal working hours, the reputation of a destination IP, and the last thirty days of behaviour for the same account.
- **Correlation.** Recognising that four alerts across three tools describe one attacker performing one sequence of actions.
- **Prioritisation.** Ranking what an analyst should look at first when 200 things arrived overnight.

Do those three things well and you have not replaced an analyst — you have given them back most of their day. In our own operations, machine-assisted triage closes roughly nine in ten low-value alerts before a human sees them, and cuts median time-to-triage from over an hour to under two minutes.

## Behavioural analytics: the honest version

User and entity behaviour analytics (UEBA) is the most oversold category in security. The pitch is that the model learns "normal" and flags "abnormal." The reality is more constrained, and more useful when you understand the constraint.

Behavioural models work well when the behaviour has a stable baseline and the deviation is sharp:

- A service account that has authenticated from exactly two hosts for six months suddenly authenticating from a third.
- A user who has never run PowerShell executing an encoded command.
- A finance user downloading 400 documents at 02:00 when their historical maximum is nine.

They work poorly for anything with genuine variance. Sales teams travel. Developers touch new systems constantly. Contractors appear and disappear. Point a naive anomaly model at those populations and you will drown in alerts that are all technically true and entirely useless.

The practical answer is scoping. Behavioural detection earns its place on service accounts, privileged accounts, and specific high-consequence actions. It is a poor general-purpose detector.

## Where AI reliably fails

Three failure modes come up repeatedly, and none of them are usually discussed in a product demo.

### Novel attacks in a quiet environment

Models learn from data. In an environment where a technique has never been observed, a purely behavioural model has no basis for scoring it. This is why deterministic detection rules — Sigma-style logic written to a known technique — must run in parallel, not be replaced. If a vendor tells you rules are obsolete, they are describing a product they want to sell, not a defence that works.

### Poisoned baselines

If an attacker is already present during the learning window, their activity becomes part of "normal." This is not theoretical; it is a known problem with any system that baselines automatically on deployment. The mitigation is a compromise assessment before you trust a baseline, and periodic re-baselining with human review.

### Explainability collapse

A score of 87 tells an analyst nothing. If the model cannot state the features that drove the score, the analyst cannot validate it, and will eventually start ignoring it — which is the worst possible outcome, because you have now paid for a system that trains your team to ignore alerts.

Explainability is not a nice-to-have. It is the mechanism by which trust is maintained.

## Large language models in security work

LLMs have found real, narrow uses in our workflow:

- **Summarising an incident timeline** into a first-draft narrative that an analyst edits. This saves genuine time on reporting.
- **Translating detection logic** between query languages when migrating platforms.
- **Explaining unfamiliar artefacts** — a registry key, a scheduled task name, a rare binary — as a starting point for research, never as an authority.

And some emphatic non-uses:

- They do not decide containment. A hallucinated justification for isolating a production database is an outage caused by a language model.
- They do not receive raw client data outside controlled boundaries.
- They are not treated as a source of truth for indicators. LLMs confidently invent CVE numbers, IP attributions and malware family names.

The rule we apply internally: an LLM may draft, summarise or explain. It may not decide or attest.

## How to evaluate an AI security claim

When a vendor — including us — claims AI capability, five questions separate substance from marketing:

1. **What specific decision does the model make?** "Improves detection" is not an answer. "Scores each alert 0–100 for likelihood of true positive, using these fourteen features" is.
2. **What happens when it is wrong in each direction?** Ask specifically about false negatives. Every vendor has a false-positive story; few have a false-negative one.
3. **Can an analyst see why?** Ask to see the feature attribution for a real alert during the demo.
4. **What is the fallback?** If the scoring pipeline degrades or is unavailable, does coverage silently drop, or does the system fail back to deterministic rules and full manual triage?
5. **Is our data used to train shared models?** For regulated industries in India, under the DPDPA 2023 and sector guidance, this question has contractual consequences.

If a vendor cannot answer the first and the fourth question clearly, you are buying a dashboard.

## What good looks like

A mature AI-assisted security operation has a clear division of labour, and it is written down:

| Stage | Automated | Human |
| --- | --- | --- |
| Collection and normalisation | Fully | Design only |
| Enrichment | Fully | None |
| Triage and scoring | Fully | Spot-check |
| Correlation into incidents | Assisted | Review |
| Investigation and scoping | Assisted | Owns |
| Containment decision | None | Owns |
| Client communication | None | Owns |

Notice where the line sits. Everything above "investigation" is volume work that machines do better and cheaper. Everything at and below it involves judgement under uncertainty with consequences for a live business — and that remains a human responsibility, with a name attached.

## The bottom line

AI in cybersecurity is not a step towards autonomous defence. It is a very effective way of removing the eighty per cent of work that was never worth a human's attention, so that skilled people can spend their hours on the twenty per cent that is.

Buy it for that. Be sceptical of anything sold as more.

If you want to see how this works against your own telemetry rather than a demo environment, [talk to our team](/contact) about a proof of value.
