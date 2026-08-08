---
title: "Business Email Compromise: The Attack That Beats Your Firewall"
description: "BEC costs Indian businesses more than ransomware and involves no malware at all. How the attack actually works, why technical controls miss it, and the process changes that stop it."
date: "2026-04-01"
category: "Threat Intelligence"
tags: ["BEC", "Phishing", "Fraud", "Email Security"]
---

Business email compromise is the most financially damaging attack most organisations will face, and it is the one their security spending is least likely to address. There is no malware to detect, no exploit to patch, and no anomalous binary to flag. There is only a convincing email and a payment that goes to the wrong account.

## How the attack actually runs

The Hollywood version is a spoofed email from the CEO demanding an urgent transfer. Real BEC is patient and considerably more effective.

**Stage 1 — Access.** The attacker obtains credentials for one mailbox, usually through a phishing page harvesting a session token, or through credential reuse from an unrelated breach. Multi-factor authentication is defeated by adversary-in-the-middle phishing kits that proxy the real login and capture the resulting session cookie.

**Stage 2 — Quiet reconnaissance.** This is the part organisations underestimate. The attacker reads. For weeks. They learn who authorises payments, how invoices are formatted, the tone your finance manager writes in, which suppliers are mid-contract, and when your CFO travels.

They also create inbox rules — forwarding copies to an external address, or moving messages containing "invoice", "payment" or "wire" to an obscure folder so the legitimate user does not see the conversation the attacker is having.

**Stage 3 — Insertion.** The attacker enters an existing thread. Not a new email — an existing one, with genuine history above it. They register a lookalike domain differing by one character, or simply continue from the compromised mailbox itself.

**Stage 4 — The redirect.** "Our bank has changed due to an audit; please update the account details for this invoice." The amount matches a real invoice. The purchase order number is correct. The signature block is identical, because it was copied from a real message.

**Stage 5 — Extraction.** Funds land in a mule account and are moved within hours. Recovery after 48 hours is rare.

## Why technical controls miss it

Consider what your stack sees: a legitimate user, authenticating with valid credentials from a residential IP, sending an email with no attachment, no link, and no suspicious content, to a party they correspond with regularly.

Every signal is normal, because every signal *is* normal. The compromise was of identity, not of endpoint.

This is why BEC persists despite heavy investment in email gateways. Gateways are good at malicious content. BEC has none.

## The controls that actually work

### 1. Kill the inbox rule blind spot

Detection of malicious inbox rules is one of the highest-value, lowest-effort detections available. Alert on:

- Rules that forward externally, created by any user
- Rules that move messages to `RSS Feeds`, `Conversation History` or a newly created single-character folder
- Rules containing finance keywords in their conditions
- Any rule created within a short window of a login from a new location

In Microsoft 365 these appear in the unified audit log as `New-InboxRule` and `Set-InboxRule`. Forward them to your SIEM and alert on them. If you do one thing from this article, do this one.

### 2. Phishing-resistant MFA

Push notifications and one-time codes are proxied by modern phishing kits. FIDO2 keys and passkeys are bound to the origin domain and cannot be relayed.

Prioritise: finance staff, executives, anyone with payment authority, and all administrators. Full rollout can follow.

### 3. Out-of-band verification, enforced as policy

The single control that stops the loss even when everything else fails:

**Any change to bank details, and any payment above a defined threshold, is verified by a phone call to a number already on file — never a number contained in the email requesting the change.**

Written down. Applied without exception. Explicitly protected from urgency and seniority pressure, because both are the attacker's primary tools. A finance clerk must be able to say "I need to call and confirm" to an email that appears to be from the managing director, without career risk.

Make the rule a policy the *organisation* owns, not a judgement the individual has to defend.

### 4. Domain controls, properly configured

- **SPF, DKIM and DMARC** with a policy of `reject`, not `none`. A DMARC record in monitoring mode for two years is not a control; it is a data feed nobody reads.
- **Lookalike domain monitoring.** Register the obvious variations of your domain, and monitor new registrations that resemble it.
- **External sender banners** that are visible and specific. Generic banners on every external email become invisible within a week; banners highlighting first-time senders or lookalike domains retain their effect.

### 5. Supplier-side controls

A significant share of BEC arrives through a compromised supplier, not through you. Your controls cannot fix their mailbox, but they can catch the outcome:

- Bank detail changes for existing suppliers require verification through a pre-established channel
- New suppliers require verification of banking details independently of the onboarding email chain
- Payment runs are reviewed against a list of accounts changed in the last thirty days

## If it has already happened

Speed is everything, and the order matters:

1. **Contact your bank immediately** and request a recall. Within hours, recovery is sometimes possible; after a day or two, it usually is not.
2. **Report to the National Cyber Crime Reporting Portal** and your local cybercrime cell. In India, the reporting window materially affects the chance of freezing funds.
3. **Preserve the mailbox.** Do not delete the rules or the messages — export the audit log first. You need to know what else was read.
4. **Determine scope.** Which other mailboxes were accessed? Which conversations were read? What personal data was exposed? That last question triggers DPDPA obligations.
5. **Reset properly.** Password change alone is insufficient — revoke active sessions and tokens, or the attacker's session persists.
6. **Notify affected counterparties.** If the attacker was in your mailbox, they may be running the same attack on your customers using your history.

## Where to start

If your organisation processes supplier payments and has not implemented out-of-band verification, that is the highest-return control available to you, and it costs nothing but discipline.

If you have not implemented inbox rule alerting, that is the highest-return *technical* control, and it can be done this week.

Our [managed SOC](/services/managed-soc) includes identity-focused detections for exactly this class of attack — inbox rule manipulation, impossible travel, token replay and mailbox access anomalies. If you have had a near-miss and want to know what the attacker actually saw, [our incident response team](/services/incident-response) can tell you.
