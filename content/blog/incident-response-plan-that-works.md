---
title: "Writing an Incident Response Plan People Will Actually Use"
description: "Most IR plans are compliance documents nobody opens during an incident. How to structure one around decisions and roles, and how to test it so the gaps surface before an attacker finds them."
date: "2025-10-22"
category: "Incident Response"
tags: ["Incident Response", "Playbooks", "Tabletop", "Business Continuity"]
---

Most incident response plans are forty pages long, written to satisfy an auditor, and never opened during an actual incident. The teams that respond well work from something much shorter — usually a one-page decision structure and a set of specific playbooks.

Here is how to write the version that gets used.

## Structure it around decisions, not process

During an incident, nobody reads prose. They need answers to a small number of questions, fast:

- Who is in charge right now?
- What severity is this, and what does that trigger?
- What am I authorised to do without asking?
- Who must be told, and by when?
- Where do I write things down?

A plan that answers those five questions on one page is worth more than one that describes NIST's six phases in detail.

## Define severity in observable terms

Severity levels are useless if the definition requires judgement about impact nobody can assess at 02:00. Write them in terms of things an analyst can *see*.

| Severity | Definition | Response |
| --- | --- | --- |
| **SEV-1** | Confirmed compromise of a Tier 0 system, active ransomware encryption, confirmed data exfiltration, or a customer-facing service down due to attack | Immediate war room, executive notification, external IR engaged |
| **SEV-2** | Confirmed compromise of a single non-critical system, credential compromise with evidence of use, or malware with lateral movement attempts | Response team activated during business hours, executive notified within 4h |
| **SEV-3** | Contained malware on one endpoint, phishing with no click, failed intrusion attempt | Standard queue, no escalation |

Two rules that make this work: **anyone can declare a SEV-1** — waiting for a manager to approve the declaration is how hours are lost — and **only the incident commander can downgrade** one.

## Name people, not roles

"The Incident Commander will coordinate the response" tells nobody who to call. Your plan needs an actual on-call list with names, mobile numbers, and a documented escalation path when the first person does not answer.

Roles that need a named primary and deputy:

- **Incident Commander** — runs the response, makes containment decisions. Not necessarily the most technical person; the coordination is the job
- **Technical Lead** — directs the investigation
- **Communications Lead** — owns internal, customer and regulatory messaging
- **Legal / Compliance** — regulatory obligations, evidence handling, insurer contact
- **Business Owner** — authorises actions with operational impact, such as taking a system offline

That last role is the one most often missing, and its absence causes the longest delays. When containment requires stopping a production system, someone with the authority to accept that cost must be reachable and must have been told in advance that this will be asked of them.

## Pre-authorise containment actions

The single biggest cause of slow response is waiting for permission. Decide in advance, in writing, what the response team may do without escalation.

A reasonable baseline:

**Pre-authorised at any time, no approval needed:**
- Isolate a workstation or non-production server from the network
- Disable a user account
- Revoke active sessions and tokens
- Block an external IP or domain at the perimeter
- Quarantine an email across all mailboxes

**Requires business owner approval:**
- Isolate a production server
- Take a customer-facing service offline
- Disable a service account that applications depend on

**Requires executive approval:**
- Full network isolation
- Public disclosure
- Any payment consideration

Getting this signed off during peacetime is a thirty-minute conversation. Getting it during an incident costs hours.

## Write playbooks for what actually happens

A general plan plus specific playbooks beats one comprehensive document. Write playbooks for your realistic top scenarios:

- Ransomware
- Business email compromise
- Compromised employee credentials
- Compromised cloud account or access key
- Web application compromise
- Insider data theft
- Third-party or supplier breach affecting you
- DDoS

Each playbook should be one to three pages containing: first five actions, evidence to preserve immediately, specific queries or commands to run, notification requirements, and containment options with their trade-offs.

Format them as checklists. Prose does not survive contact with adrenaline.

## Get the notification obligations right

For Indian organisations, several clocks may run simultaneously, and they have different recipients and content:

- **CERT-In** — within six hours of *noticing* a reportable incident. Not confirming; noticing
- **Sector regulator** — RBI, SEBI or IRDAI timelines where applicable, often shorter
- **DPDPA** — notification to the Data Protection Board and to affected data principals where personal data is involved
- **Cyber insurance** — usually 24–72 hours, and frequently *before* engaging external responders, or costs may not be covered
- **Contractual** — many enterprise customer contracts contain their own notification windows, often 24 hours

Put these in a single table in the plan with the trigger, the recipient, the deadline and the named owner. During an incident nobody should be reading a regulation to determine whether it applies.

## Log everything, in one place

Designate the incident log format and location before you need it. Every action, decision, timestamp and who took it.

Two reasons this matters more than it seems. First, the handover between shifts is where context is lost, and a written log is the only reliable transfer. Second, if the incident becomes a legal or insurance matter, a contemporaneous log is evidence and a reconstruction is not.

Use an out-of-band channel. If the attacker is in your email or your chat platform, your incident coordination should not be there. Agree the fallback — a separate messaging platform, a bridge line — in advance, and make sure people have it installed before the day they need it.

## Test it, properly

An untested plan is a hypothesis.

**Tabletop exercises**, twice a year, ninety minutes each. Present a scenario, walk through the decisions, and note every point where somebody says "I would have to check who does that." Those are your findings.

**Technical exercises**, annually. Actually execute the containment steps in a controlled way. Does host isolation work from the console? Can you revoke every session for a user? Do you know how to pull a memory image? Teams discover during real incidents that a tool they relied on requires a licence nobody renewed.

**Test the human path.** Call the on-call number at 22:00 unannounced. Very often, the number is wrong, the person left the company, or nobody answers. Better to find out on a Tuesday.

**After every real incident**, run a blameless review and update the plan. The plan should change several times a year. One that has not been edited in eighteen months is not being used.

## Keep it short

If your plan cannot be read and understood in fifteen minutes by someone who has never seen it, it will not be used at 03:00 by someone who is frightened.

Target: one page of structure, one page of contacts and severity, a notification table, and a playbook per scenario. Everything else — the policy language auditors want — goes in an appendix nobody needs during a response.

Our [incident response practice](/services/incident-response) runs tabletop and technical readiness exercises, and provides retained response capability with pre-agreed containment authority. If your plan has never been tested, [that is where we would start](/contact) — and if you are in an incident right now, call **+91 86603 71224**.
