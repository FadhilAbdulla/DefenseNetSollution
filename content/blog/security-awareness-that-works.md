---
title: "Security Awareness Training That Changes Behaviour, Not Just Compliance"
description: "Annual e-learning does not reduce risk. What actually works — targeted simulation, reporting culture, role-specific training and metrics that measure behaviour rather than completion."
date: "2025-07-02"
category: "Security Operations"
tags: ["Security Awareness", "Phishing", "Human Risk", "Training"]
---

Most security awareness programmes exist to satisfy an audit requirement. A module is assigned annually, completion is tracked, a certificate is filed, and the phishing click rate does not change.

The evidence on what does change behaviour is reasonably clear, and it looks quite different from the annual module.

## Why the annual module fails

**Recall decays fast.** Training delivered once a year is largely forgotten within weeks. The event that requires the knowledge occurs at a random point in the remaining fifty weeks.

**It is generic.** A finance clerk, a developer and a warehouse supervisor face entirely different threats. A single module addresses none of them well.

**It teaches recognition, not process.** "Spot the phishing email" fails against a well-crafted attack — including, increasingly, ones that contain no detectable errors at all. Meanwhile the actually protective behaviour, which is following a verification process, gets less attention.

**It has no feedback loop.** Nobody learns whether they would have fallen for anything, and the organisation learns nothing about where the real weaknesses are.

## What works

### Frequent, short and specific

Regular brief interventions beat annual long ones. Five minutes monthly, on one concrete topic, retains far better than ninety minutes once a year.

Tie topics to what is actually happening: a current campaign targeting your sector, an incident at a peer organisation, a new payment fraud pattern. Relevance drives attention in a way that generic content cannot.

### Simulation with immediate teaching

Phishing simulation works, but how you run it determines whether it helps or harms.

**Do:**

- Deliver the teaching moment **immediately** on click, at the point of maximum relevance
- Vary difficulty and style, including the sophisticated ones — a simulation that everybody spots teaches nothing
- Simulate the attacks your organisation actually faces: supplier invoice fraud, HR document requests, MFA prompts, internal-looking requests
- Measure **reporting rate**, not just click rate

**Do not:**

- Punish clicks. Punishment produces concealment, and concealment is what turns a click into a breach
- Use emotionally manipulative pretexts — bonus announcements, redundancy notices, health scares. The damage to trust exceeds any training value, and it turns the security team into the adversary
- Run the same template repeatedly. People learn the template, not the principle

### Reporting rate is the metric that matters

Click rate measures failure. Reporting rate measures the capability you actually want.

A user who clicks and immediately reports has given the SOC an early warning that may protect everyone else. A user who does not click but also does not report has given you nothing — the campaign continues against their colleagues in silence.

Optimise for **time to first report**. In a real campaign, the difference between the first report arriving in four minutes and in four hours is the difference between containing it and investigating it.

To get there:

- Make reporting one click, from within the mail client
- **Acknowledge every report**, including false alarms, with a brief thank-you. Users who feel foolish for reporting stop reporting
- Publish what happened when a report was useful — "a colleague's report last week let us block a campaign before anyone else saw it"
- Never criticise someone for reporting something legitimate

### Role-specific content

Generic training for everyone, plus targeted training for the roles that carry concentrated risk:

- **Finance** — payment fraud, invoice manipulation, bank detail changes, out-of-band verification, deepfake pretexts
- **Executives and their assistants** — targeted attacks, travel risk, the authority pressure attackers exploit
- **Developers** — secure coding, secrets handling, dependency risk, code review for security
- **IT and administrators** — privileged access hygiene, social engineering aimed at help desks, change control
- **HR** — candidate document malware, employee data handling, the exit process

Twenty minutes of relevant, role-specific content beats two hours of generic content.

### Teach process, not vigilance

The most important shift. Instead of "be alert for suspicious emails," teach:

- "Any bank detail change is verified by callback to the number on file, without exception."
- "Payment requests arrive through the system. Never through email or WhatsApp."
- "If you are asked to bypass a control, that is the signal, whoever is asking."
- "Report first, verify second. We would rather see a hundred false alarms than miss one real attack."

Process survives sophisticated attacks. Vigilance does not.

### Make the safe path the easy path

Where a security control conflicts with getting work done, work wins — and it should, because the business exists to operate. If a control is being routinely circumvented, the control is wrong.

Examples worth examining in your own organisation:

- If people share credentials, ask why individual login is too slow
- If people email files to personal accounts, ask why file sharing is too hard
- If people use unapproved SaaS, ask what the approved tool cannot do

Fixing these removes risk more effectively than training people to endure friction.

## Metrics worth reporting

Retire "percentage of staff who completed training." It measures compliance with a process, not risk.

Report instead:

- **Reporting rate** — proportion of simulated phish reported, trending over time
- **Time to first report** — how quickly your earliest reporter acts
- **Click rate by department** — to target intervention, not to name individuals
- **Repeat clickers** — a small group typically accounts for a disproportionate share, and they need support rather than sanction
- **Real campaign detection** — how often genuine attacks are caught by user reports before the SOC sees them
- **Process adherence** — for the controls that matter, such as verification callbacks performed on bank detail changes

That last one is the closest thing to a direct measure of whether awareness translates into protection.

## What to do about repeat clickers

A small number of people will click most simulations. Punishment is counter-productive and drives concealment.

Better responses:

- One-to-one conversation to understand why — often it is workload and speed rather than lack of knowledge
- Additional technical controls for that group: stricter attachment handling, browser isolation, tighter conditional access
- Role review, if someone in a high-risk position is consistently vulnerable

Treat it as a risk to be managed, not a discipline matter.

## A programme that fits a year

- **Monthly** — five-minute topical update tied to current threats
- **Quarterly** — phishing simulation with immediate teaching, varied difficulty
- **Twice yearly** — role-specific training for high-risk functions
- **Annually** — the compliance module, kept short, for the auditor
- **Continuously** — reporting acknowledgement, and publicised wins
- **Ad hoc** — rapid briefing when a genuine campaign hits your sector

The annual module still exists. It is just no longer pretending to be the programme.

Our [security consulting practice](/services/compliance-consulting) designs awareness programmes around measurable behaviour, and our [managed SOC](/services/managed-soc) closes the loop by feeding real campaign data back into training content. [Get in touch](/contact) if your current programme reports completion rates and nothing else.
