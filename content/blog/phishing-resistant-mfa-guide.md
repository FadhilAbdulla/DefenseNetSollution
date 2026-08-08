---
title: "Why Your MFA Is Not Enough: Bypass Techniques and What Actually Stops Them"
description: "MFA fatigue, adversary-in-the-middle proxies, SIM swap and token theft — how attackers routinely defeat multi-factor authentication, and the migration path to phishing-resistant methods."
date: "2026-02-04"
category: "Threat Intelligence"
tags: ["MFA", "Identity", "Phishing", "FIDO2"]
---

Multi-factor authentication is the most effective single control most organisations deploy. It is also routinely bypassed, and the gap between "we have MFA" and "we have MFA that works" is where a large share of current intrusions live.

Here is how each bypass works and what actually defeats it.

## Bypass 1: Adversary-in-the-middle phishing

The most consequential technique in current use, and the one that defeats most MFA deployments outright.

The victim receives a link to a page that looks exactly like the real login portal — because it *is* the real login portal, proxied. The attacker's server sits in the middle, relaying credentials to the genuine service and relaying the MFA challenge back to the victim.

The victim completes MFA correctly. Authentication succeeds. The attacker captures the resulting **session cookie** and replays it, arriving at an authenticated session without ever needing the credentials again.

Phishing kits implementing this are sold as a service and require no technical skill to operate.

**What stops it:** FIDO2 security keys and passkeys. WebAuthn cryptographically binds the authentication to the origin domain. A key registered for `login.company.com` will not respond to `login.cornpany.com`, regardless of how convincing the page looks. This is not a matter of user vigilance — the protocol makes the attack impossible.

**What does not stop it:** SMS codes, TOTP apps, push notifications. All are relayable.

## Bypass 2: MFA fatigue

The attacker has valid credentials — from a previous breach, credential stuffing or infostealer malware — and triggers push notifications repeatedly. Fifty at 03:00. Eventually the user approves one to make it stop, or approves reflexively while half awake.

**What stops it:**

- **Number matching** — the user must enter a number displayed on the login screen, which they do not have if they are not the one logging in
- **Push rate limiting** with lockout after repeated denials
- **Context in the prompt** — application name, location, IP
- **Detection** on high volumes of denied MFA challenges, which is a near-certain indicator of credential compromise

Number matching should be considered a minimum baseline for any push-based deployment.

## Bypass 3: SIM swap

The attacker convinces or bribes a mobile operator to port the victim's number to a SIM they control, then receives the SMS code. This remains a genuine and recurring problem in India, and it disproportionately targets high-value individuals — executives, finance staff, anyone with payment authority.

**What stops it:** removing SMS from the authentication path entirely. There is no configuration that makes SMS safe against a determined attacker with operator access.

SMS is better than no second factor. It is the weakest form available and should be a fallback of last resort, not a default.

## Bypass 4: Token and cookie theft

Infostealer malware harvests browser session cookies from an infected machine. Those cookies are then imported into the attacker's browser, producing an authenticated session with no authentication event at all — so nothing in your identity logs looks anomalous.

This is why "we saw no suspicious logins" is a weak conclusion during an investigation.

**What stops it:**

- **Token binding / device-bound sessions**, tying a session to the device that created it
- **Continuous access evaluation**, revoking sessions when risk signals change rather than waiting for token expiry
- **Shorter session lifetimes** for sensitive applications
- **EDR on endpoints**, because the root cause is a compromised machine

## Bypass 5: Legacy authentication

Protocols that predate modern authentication — IMAP, POP3, SMTP AUTH, older Exchange endpoints — frequently do not support MFA at all. An attacker with valid credentials simply authenticates through a path where MFA does not apply.

**What stops it:** blocking legacy authentication entirely via conditional access. Audit first to find what breaks; there is almost always a small number of legacy applications and integrations, and each has a modern alternative.

## Bypass 6: MFA registration hijack

If an attacker has credentials for an account that has not yet enrolled in MFA, they can enrol their own device. The account is now protected — for the attacker.

**What stops it:** requiring MFA registration only from a trusted network or compliant device, and alerting on every new MFA method registration. That alert is one of the highest-value identity detections available, and it is trivial to implement.

## Bypass 7: Help desk social engineering

The attacker calls the help desk claiming to have lost their phone. The help desk resets MFA. Several major intrusions in recent years began exactly here.

**What stops it:** a documented identity verification procedure for MFA resets that does not rely on information available from public sources or a prior email compromise. Video verification against a stored photo, callback to a manager, or in-person verification for privileged accounts. And explicit authority for help desk staff to refuse.

## A realistic migration path

Not every organisation can deploy hardware keys to everyone next quarter. Prioritise by consequence:

**Phase 1 — Immediate (this month)**
- Enable number matching on all push-based MFA
- Block legacy authentication
- Alert on new MFA method registration and on high-volume MFA denials
- Document the help desk verification procedure

**Phase 2 — Priority users (this quarter)**
- FIDO2 keys or passkeys for administrators, finance, executives and anyone with payment authority
- Remove SMS as an option for these users entirely
- Enforce device compliance for access to sensitive applications

**Phase 3 — Broad rollout (this year)**
- Passkeys as the default for the whole workforce
- Conditional access policies using risk and device signals
- Continuous access evaluation enabled
- SMS removed as an available method

Phase 1 costs nothing but configuration time and closes the two most common bypasses in use today. If budget conversations are stalling the rest, do Phase 1 now regardless.

## Measuring whether it worked

Track and report monthly:

- Percentage of accounts using phishing-resistant methods
- Number of accounts still permitted to use SMS
- Legacy authentication attempts (should be zero)
- MFA denials and their disposition
- New MFA registrations from untrusted locations

Those five numbers tell you more about your identity security posture than most dashboards.

Our [managed SOC](/services/managed-soc) includes identity-layer detections for every bypass described here — token replay, impossible travel, registration anomalies and MFA denial patterns. If you want to know which of these your current configuration is exposed to, [a short assessment will tell you](/contact).
