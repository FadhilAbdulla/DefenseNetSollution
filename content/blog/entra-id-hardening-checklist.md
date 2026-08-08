---
title: "Microsoft Entra ID Hardening: The Settings That Matter Most"
description: "Conditional access, privileged role management, consent controls and legacy authentication. A prioritised hardening sequence for Microsoft 365 and Entra ID tenants."
date: "2025-09-24"
category: "Cloud Security"
tags: ["Entra ID", "Microsoft 365", "Identity", "Conditional Access"]
---

For most organisations, the Entra ID tenant is now the most consequential system they operate. It holds the identities, it federates to everything, and its compromise is total.

It also ships with defaults chosen for compatibility rather than security. Here is what to change, in order of value.

## 1. Block legacy authentication

Legacy protocols — IMAP, POP3, SMTP AUTH, older Exchange Web Services endpoints — do not support modern authentication and therefore do not support conditional access or MFA. An attacker with valid credentials authenticates through a path where your MFA policy does not apply.

**Do this first.** Audit sign-in logs filtered to legacy client apps to see what is actually using it. There is usually a small number of legacy applications, multifunction printers and integration scripts. Each has a modern alternative.

Then create a conditional access policy blocking legacy authentication for all users, with a narrowly scoped exclusion group if genuinely required — and a date by which that group empties.

## 2. Conditional access as the enforcement layer

Conditional access is where Entra ID security actually happens. A minimum policy set:

- **Require MFA for all users**, all applications. Start in report-only mode, review the impact, then enforce
- **Require MFA for administrative roles**, with no exclusions and no trusted-location bypass
- **Block or restrict legacy authentication** (above)
- **Require compliant or hybrid-joined devices** for access to sensitive applications
- **Block sign-in from countries you do not operate in**, as a coarse but effective control
- **Require reauthentication for privileged operations**, with a short session lifetime for admin sessions
- **Enforce sign-in frequency** for high-risk applications rather than indefinite sessions

**Break-glass accounts:** create two cloud-only global administrator accounts excluded from all conditional access policies, with long random passwords stored offline, FIDO2 keys where possible, and alerting on any use. Locking yourself out of your own tenant with a misconfigured policy is a genuine and recoverable-only-with-difficulty situation.

## 3. Privileged Identity Management

Standing global administrator access is the highest-value target in the tenant. Eliminate it.

- Move all privileged roles to **eligible** rather than permanently assigned
- Require approval and justification for activation
- Time-box activations to a few hours
- Alert on every activation
- Review role assignments quarterly

Aim for zero permanently assigned global administrators other than the break-glass accounts. Most organisations start with between five and thirty and are surprised by the number.

Also: use the least-privileged role that works. Exchange administration does not require global administrator, and neither does most day-to-day work.

## 4. Application consent

User consent to third-party applications is one of the most under-monitored attack paths. A convincing phishing email leads to a consent prompt, the user approves, and the attacker's application holds a token with mailbox read permissions — surviving password resets, and requiring no MFA to use.

**Configure:**

- Restrict user consent to applications from verified publishers requesting low-impact permissions only, or disable user consent entirely
- Enable the **admin consent request workflow** so users can ask rather than being blocked with no path forward
- Audit existing enterprise applications for high-privilege delegated and application permissions. `Mail.ReadWrite`, `Files.ReadWrite.All` and `Directory.ReadWrite.All` granted to an application nobody recognises is an incident
- Alert on new service principal creation and on new consent grants

## 5. Guest and external access

External collaboration defaults are permissive. Tighten:

- Restrict who can invite guests — typically administrators or specific roles, not all members
- Restrict guest access to directory information; the default allows guests to enumerate more of your directory than most organisations expect
- Set access reviews for guest accounts, with automatic removal after a period of inactivity
- Restrict which external domains can be collaborated with, where the business allows

Guest accounts accumulate. A review that removes guests inactive for ninety days typically clears a substantial number, each of which was a credential with some level of access.

## 6. Password and authentication methods

- **Disable SMS and voice** as MFA methods for privileged users, and set a plan to remove them entirely
- **Enable passkeys and FIDO2** as the preferred method
- **Enable number matching** on Microsoft Authenticator push, with application and location context shown
- **Enable password protection** with a custom banned-password list including your company name, product names and local terms
- **Disable self-service password reset without MFA** — SSPR that requires only knowledge factors is an account takeover mechanism

## 7. Monitoring and detection

Forward Entra ID logs to your SIEM. The audit log and sign-in log are the highest-value identity telemetry you have, and by default they are retained for a limited period in the portal only.

Detections worth building:

- New MFA method registered, particularly from an unfamiliar location
- Conditional access policy created, modified or deleted
- Privileged role activation or assignment
- New service principal or application consent grant
- Sign-in with a session token from a new device or location without a corresponding authentication event — a strong token-theft signal
- Bulk enumeration of the directory
- Sign-ins succeeding after a burst of failures, which indicates password spraying that worked

## 8. Reduce the blast radius

- **Separate administrative accounts** from daily-use accounts. An admin who reads email on their privileged account exposes it to every phishing attempt
- **Administrative workstations** for Tier 0 work, where practical
- **Restrict Azure AD Join and device registration** to authorised users
- **Disable users' ability to create tenants and register applications** unless required

## A two-week hardening sprint

**Week 1:**
- Create and test break-glass accounts
- Deploy conditional access in report-only mode: MFA for all, block legacy auth
- Audit and document existing privileged role assignments
- Audit enterprise applications with high-privilege permissions

**Week 2:**
- Enforce the conditional access policies after reviewing report-only impact
- Move privileged roles into PIM as eligible, with approval workflows
- Restrict user consent and enable the admin consent workflow
- Forward logs to the SIEM and build the detections above

Two weeks of focused work removes the most commonly exploited paths into a Microsoft tenant.

## Verify rather than assume

Use the Microsoft Secure Score as a starting checklist, not a target — it weights some items oddly and misses others. Better verification:

- Attempt legacy authentication yourself and confirm it fails
- Attempt to consent to a test application as a standard user
- Confirm a privileged role cannot be used without PIM activation
- Confirm your break-glass account works, from an unusual location, before you need it

Our [cloud security practice](/services/cloud-security) covers Entra ID and Microsoft 365 assessments, and identity detections are a core part of our [managed SOC](/services/managed-soc). [Get in touch](/contact) for a tenant review.
