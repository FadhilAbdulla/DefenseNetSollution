---
title: "Agentic AI Cyber Defence: What Autonomous Agents Actually Do"
description: "Agentic AI is the biggest shift in security operations since the SIEM. What separates an agent from a chatbot, where autonomy genuinely earns its place in defence, and the failure modes nobody demos."
date: "2026-08-09"
category: "AI & Security"
tags: ["Agentic AI", "Autonomous Defence", "SOC", "AI Security"]
featured: true
---

The industry has moved quickly from "AI that answers questions" to "AI that takes actions." In security, that shift has a specific name — agentic AI — and it is being sold hard, frequently by people who have never had to explain to a client why an automated system took a production database offline at 2 AM.

We run agentic components inside our own SOC. This is an honest account of what they do, what they must never do, and how to tell a real capability from a demo.

## What makes an agent an agent

A chatbot responds. An agent pursues a goal.

Concretely, four properties distinguish an agentic system from a language model with a nice interface:

- **Goal-directed.** It is given an objective — "determine whether this alert is a true positive" — not a single question.
- **Tool-using.** It can query a SIEM, look up threat intelligence, pull process ancestry from an EDR, check an identity provider.
- **Iterative.** It observes the result of each action and decides the next one. The path is not scripted.
- **Stateful.** It carries context across steps, and sometimes across sessions.

That fourth property is where most of the value and most of the risk lives.

## Why security operations is unusually well suited to this

Most SOC investigation work is a decision tree that an experienced analyst walks quickly and a junior analyst walks slowly. The steps are knowable, the data sources are APIs, and the output is a judgement with evidence.

An alert fires for suspicious PowerShell on a workstation. The analyst asks, in roughly this order:

1. What was the full command line, and what spawned it?
2. Is this user's normal behaviour?
3. Has this binary or script hash been seen before, here or anywhere?
4. Did anything else happen on this host in the surrounding hour?
5. Did the host make any unusual network connections afterwards?
6. Is this host or user privileged?

Six lookups across four systems. A human does this in ten to twenty minutes if they are not interrupted. An agent does it in under a minute, every time, without skipping step four because it is tedious.

That is the actual value proposition. Not "AI replaces analysts" — **AI performs the mechanical parts of investigation exhaustively and consistently, which humans under load demonstrably do not.**

## Where we allow autonomy

Our division is deliberate and written into client contracts.

**Fully autonomous — no human in the loop:**

- Enrichment. Gathering context from every relevant source.
- Correlation. Recognising that six alerts describe one attacker sequence.
- Hypothesis generation. Proposing what this might be, ranked, with the evidence for each.
- Closing high-confidence benign alerts against a defined, audited allowlist of patterns.

**Autonomous with human review before it reaches you:**

- Incident narrative construction.
- Severity assignment.
- Recommended containment actions.

**Never autonomous:**

- Executing containment on production systems.
- Deciding that an incident is over.
- Communicating with the client.
- Anything touching an OT or clinical environment, at any severity.

The last one is not a technology limitation. It is a judgement that the downside of an incorrect automated action in a hospital or on a factory line is unbounded, and no confidence score justifies it.

## The failure modes nobody demos

Four things go wrong with agentic systems in production. Vendors rarely raise them, so you should.

### Confident wrongness at speed

A traditional automation either matched a rule or did not. An agent reasons, and reasoning can be wrong in ways that look like competence. It will produce a fluent, well-evidenced, entirely incorrect conclusion — and produce it in nine seconds, which lends it unearned authority.

Mitigation: the agent must show its work as structured evidence, not prose. Every claim links to the query that produced it. An analyst validates the evidence, not the narrative.

### Compounding error across steps

In a multi-step investigation, an incorrect conclusion at step two becomes an assumption at step five. There is no natural point at which the system notices it went wrong, because each subsequent step is locally reasonable.

Mitigation: cap the chain length, and re-ground each step against source data rather than against the agent's own prior output. Long autonomous chains are where reliability collapses.

### Tool permission inheritance

An agent has exactly the blast radius of the tools you gave it. If it can query the SIEM with a service account that also has write access, then a successful manipulation of that agent has write access.

Mitigation: read-only credentials for investigation agents, separate narrowly-scoped credentials for any action, and authorisation enforced by your infrastructure rather than by the agent's judgement. Treat the agent as an untrusted user who may have been socially engineered — because it may have been. We cover this in detail in [securing agentic AI](/blog/securing-agentic-ai-attack-surface/).

### Silent capability drift

The model behind the agent gets updated. Behaviour changes. Nothing in your alerting notices, because the system continues to produce plausible output.

Mitigation: a regression suite of historical incidents with known correct conclusions, run against the agent on every model or prompt change. If it no longer catches what it caught last month, that is a build failure.

## Evaluating an agentic security claim

Five questions that separate capability from theatre:

1. **"What decision does the agent make, and what happens if it is wrong?"** Vague answers here mean the autonomy has not been thought through.
2. **"Show me the evidence trail for a real investigation."** You want structured, linked evidence — not a paragraph of confident narration.
3. **"What credentials does the agent hold?"** If it has write access to production, ask why.
4. **"How do you detect the agent degrading?"** If there is no regression suite, quality is unmonitored.
5. **"What is the maximum number of autonomous steps before a human sees it?"** Unbounded is the wrong answer.

## The honest position on where this goes

Agentic AI will not produce an autonomous SOC in the near term, and the vendors claiming otherwise are describing a product, not a practice. What it produces — already, today — is a step change in how much investigation gets done per analyst hour, and a meaningful reduction in the number of alerts that get closed as benign because someone was tired.

That is genuinely significant. It is also considerably less exciting than the marketing, which is usually a sign that it is real.

The organisations getting value from this are the ones treating agents as an extremely fast, tireless junior analyst who must have their work checked — not as a replacement for the senior one.

Our [managed SOC](/services/managed-soc) runs agentic investigation with the division of labour described above, and we will show you the evidence trail for real escalations during evaluation rather than a scripted demo. [Talk to us](/contact) if you want to see it against your own telemetry.
