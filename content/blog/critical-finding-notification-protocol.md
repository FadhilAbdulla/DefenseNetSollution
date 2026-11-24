---
title: "Critical Finding Notification: Who Gets Called, How Fast, and With What"
description: "A notification protocol for sensitive discoveries such as leaked credentials or exposed personal data, with channels, message content and a template to copy."
date: "2026-11-24"
category: "Incident Response"
tags: ["Notification", "Escalation", "Data Exposure"]
---

A tester finds customer records on an open server at 18:40 on a Friday. If the first discussion is about whom to tell, the protocol was written too late.

## Define what cannot wait

Agree a short list in advance: live credentials, exposed personal or payment data, an exploitable route to critical systems, or any sign that someone else is already inside. Everything else follows normal reporting.

## Choose channels in order

1. Phone call to the primary contact.
2. Phone call to the deputy if unanswered within an agreed time.
3. A short message saying only that a call is needed.

Never put the secret itself in email or chat. If a mailbox may be compromised, use a channel outside it.

## What the first message says

- What was found, in one sentence
- Which asset and who owns it
- How certain we are, and why
- Evidence of access by others: yes, no or unknown
- The safest immediate action
- What has been accessed by the finder, and how it is being protected

State unknowns plainly. A guess repeated in the first hour tends to become a fact by the second.

## Containment has side effects

Revoking a key can break production; deleting an object can destroy evidence. Export logs first where time permits, then rotate, then remove. Who may approve an outage should be written down.

## Start the regulatory clock deliberately

A finding is not automatically a notifiable breach, but the assessment must start at once. In India, [CERT-In reporting](/blog/cert-in-directions-2022-explained/) runs to hours. Record when you became aware and who decided what.

## Test it

Run an unannounced drill outside office hours. Most protocols fail on an out-of-date phone number.

Immediate notification is built into our [Threat Surface Management service](/services/threat-surface-management/).
