---
title: "Guardrails for Autonomous Security Agents"
description: "Before you let an AI agent act on production systems: the permission model, approval gates, kill switches and audit requirements that make autonomy survivable."
date: "2026-08-05"
category: "AI & Security"
tags: ["Agentic AI", "Guardrails", "Automation", "Governance"]
---

Every organisation deploying agentic AI in security eventually reaches the same question: how much are we willing to let it do on its own?

Answering "as much as possible" is how you end up explaining an outage. Answering "nothing" wastes the capability. The useful answer is a specific, written permission model — and this is the one we use.

## Principle 1: The agent's blast radius is its credentials, not its prompt

The most common design error is treating the system prompt as a security boundary. It is not. Instructions in a prompt are guidance to a probabilistic system, and they can be argued with.

The actual boundary is what the agent's credentials permit. If your investigation agent holds a SIEM token that can also delete indices, then "you must never delete data" is a hope, not a control.

**Rule:** every agent gets its own identity, scoped to the minimum it needs. Investigation agents get read-only. Action agents get narrowly scoped write credentials for specific operations. No agent ever inherits a human's session.

## Principle 2: Authorisation happens outside the agent

Related, and worth stating separately because it is violated constantly.

The agent must never decide whether an action is permitted. That decision belongs to your infrastructure — the API gateway, the SOAR platform, the cloud IAM policy — evaluated against the identity of the agent and, where relevant, the human who initiated the work.

If the only thing preventing a destructive action is the agent choosing not to take it, you have no control.

## Principle 3: Tier actions by reversibility, not by severity

Severity-based gating is the intuitive design and the wrong one. What matters is whether you can undo it.

**Tier A — freely automated.** Read-only queries. Enrichment lookups. Adding a comment to a ticket. Nothing here changes system state.

**Tier B — automated with logging and notification.** Reversible, low-impact state changes: quarantining a single email, adding a temporary indicator block, tagging an asset. If wrong, one action reverses it.

**Tier C — requires human approval.** Isolating an endpoint. Disabling a user account. Blocking an IP range at the perimeter. All reversible, but with immediate operational impact on real people.

**Tier D — never automated.** Anything on a Tier 0 identity system. Anything on an OT, ICS or clinical device. Anything irreversible — deleting data, revoking certificates, terminating instances. Anything that communicates externally.

The tiering conversation is worth having explicitly with each client, because the same action lands in different tiers depending on the environment. Isolating a workstation is Tier C in an office and Tier D on a machine controlling a production line.

## Principle 4: Bound the autonomy horizon

Agent reliability degrades with chain length. Each step compounds any earlier error, and there is no natural point where the system notices.

Impose hard limits:

- **Maximum steps** per investigation before mandatory human review
- **Maximum wall-clock time** before the agent stops and reports what it has
- **Maximum tool calls**, which also caps runaway cost
- **Loop detection** — if the agent repeats a query it has already run, something has gone wrong

When a limit is hit, the correct behaviour is to stop and hand over everything gathered so far, clearly marked incomplete. It is not to guess.

## Principle 5: Structured evidence, not narrative

An agent that produces a confident paragraph is unauditable. An agent that produces claims linked to the queries that generated them is auditable in seconds.

Require every conclusion to carry:

- The specific query or tool call that produced the supporting data
- The raw result, retrievable
- A confidence value, and what would change it
- An explicit list of what the agent could **not** determine

That last field is the highest-value one. Systems that only report findings create a false impression of completeness. An agent that says "I could not determine whether data was exfiltrated because egress logs are unavailable for this window" has told the analyst exactly where to look.

## Principle 6: A kill switch that actually works

Test this before you need it. Requirements:

- **One control** that halts all agent activity immediately, operable by any on-call analyst without an approval chain
- **Halt means halt** — in-flight actions stop, queued actions are cancelled
- **Degraded mode is defined.** When agents are off, does triage fall back to deterministic rules and manual work, or does coverage silently drop to zero? The second one is how a kill switch becomes unusable in practice, because nobody dares pull it
- **Exercised quarterly**, like any other emergency control

## Principle 7: Everything is logged, and the log is not writable by the agent

The audit record must capture, for every agent action: which agent, which version and model, initiated by what, the full context provided, every tool call and result, the output, and any human approval attached.

Two properties matter. It must be **complete** — partial logs cannot reconstruct a failure. And it must be **outside the agent's reach**, in a store the agent's credentials cannot write to, for the same reason you keep CloudTrail in a separate account.

When an agent does something unexpected, this log is the only way to understand why. Teams that log only final outputs cannot investigate their own automation.

## Principle 8: Regression-test the agent like software

Model updates change behaviour silently. Prompt changes have non-local effects. Neither shows up in monitoring, because the system keeps producing plausible output.

Maintain a suite of historical incidents with known-correct conclusions. Run it on every model change, prompt change and tool change. Track:

- Did it reach the correct conclusion?
- Did it gather the same evidence?
- Did confidence calibration hold?
- Did the number of steps change materially?

A drop in this suite is a build failure, treated exactly as a failing unit test would be.

## Principle 9: Attribute actions to a human

Every Tier B action and above should carry the name of the person accountable for it — the analyst on shift, the approver, the playbook owner. Not "automated system."

This matters for client trust, for post-incident review, and for the simple reason that accountability that belongs to everyone belongs to no one. Our clients receive escalations with a named analyst attached, and that analyst has reviewed what the agent produced.

## A minimum viable guardrail set

If you are deploying agentic capability now and need somewhere to start, these five deliver most of the protection:

1. Read-only credentials for investigation; separate scoped credentials for action
2. Human approval required for anything that changes production state
3. Hard step and time limits, with graceful incomplete handover
4. Immutable, complete audit log outside the agent's write scope
5. A tested kill switch with a defined degraded mode

Everything else is refinement. Without these five, you are running unmonitored automation with a language model in the decision path.

## The governance question to answer first

Before any of the technical work: **who is accountable when the agent is wrong?**

If the answer is unclear, the deployment is not ready — regardless of how good the technology is. Automation does not distribute responsibility; it concentrates it on whoever configured the system.

Our [managed SOC](/services/managed-soc) operates under exactly this model, with the tiering agreed per client and written into the engagement. See [how agents investigate in practice](/blog/agentic-soc-autonomous-investigation/) and [the attack surface agents introduce](/blog/securing-agentic-ai-attack-surface/), or [talk to us](/contact) about reviewing an agentic deployment you already run.
