---
title: "Business Email Compromise in Dubai: Stopping Invoice Fraud with DMARC and Training"
description: "How BEC and invoice fraud target UAE companies, why DMARC enforcement matters for your domain, and how realistic phishing simulations and finance-team procedures stop payments going to criminals."
date: "2026-10-31"
category: "UAE & Dubai"
tags: ["Dubai", "UAE", "Business Email Compromise", "Phishing", "DMARC", "Security Awareness"]
---

Business email compromise (BEC) is one of the most financially damaging forms of cybercrime, and Dubai's trading, logistics, real estate and professional services sectors — built on large payments between parties who often communicate only by email — are attractive targets. The attack rarely involves malware. It involves a convincing email at the right moment.

## How BEC works

Common patterns include:

- **Supplier invoice fraud.** A criminal compromises or impersonates a supplier and sends "updated bank details" just before a large payment.
- **Executive impersonation.** A message apparently from the CEO asks finance to make an urgent, confidential transfer.
- **Mailbox takeover.** An employee's Microsoft 365 account is phished; the attacker sets inbox rules to hide replies and inserts themselves into real conversations.
- **Deepfake voice calls** that "confirm" a fraudulent request — see our article on [deepfake voice fraud](/blog/deepfake-voice-fraud-defence/).

Our [BEC article](/blog/business-email-compromise-india/) covers the same patterns as they appear in India.

## Protect your domain with DMARC

SPF, DKIM and DMARC let receiving mail servers verify that email claiming to come from your domain really does. With DMARC at enforcement (`p=quarantine` or `p=reject`), criminals cannot simply spoof your exact domain to your customers and suppliers.

Getting there safely means first identifying every legitimate service that sends as you — CRM, billing, marketing, HR platforms — and authenticating each one, then moving the policy to enforcement in monitored stages.

## Harden the mailbox platform

- Phishing-resistant MFA for finance, executives and administrators.
- Alerts on new inbox forwarding and hiding rules.
- External-sender warnings and impersonation protection.
- Blocking of legacy authentication.

## Procedures beat technology for payment fraud

The single most effective control is procedural: **any change to bank details is verified by calling a known phone number from your records — never one in the email.** Add dual approval for payments above a threshold, and give finance staff explicit permission to delay "urgent" requests from executives for verification.

## Training that changes behaviour

Effective awareness programmes:

- Run realistic simulations based on lures actually seen in the region.
- Deliver short training immediately and privately to anyone who clicks.
- Measure **reporting rates**, not just click rates — a workforce that reports quickly is a detection system.
- Give finance, HR and executive assistants role-specific training.

Our article on [security awareness that works](/blog/security-awareness-that-works/) explains the approach.

## How we help in Dubai

Our [email security and security awareness service](/services/email-security-awareness/) implements SPF, DKIM and DMARC, tunes email gateways, and runs simulations and role-based training with evidence for ISO 27001 and other audits. If a mailbox has already been compromised, our [incident response team](/services/incident-response/) can help immediately. Contact our [Dubai office](/dubai/) to check your domain's email security.
