---
title: "Offboarding: Why Disabling the Account Is Not Enough"
description: "Revoking access and rotating credentials are different things, and most organisations only do the first. A practical offboarding process for human accounts, shared secrets and machine credentials."
date: "2026-08-14"
category: "Security Operations"
tags: ["Offboarding", "Secrets Management", "Insider Risk", "Access Control"]
---

Standard offboarding runs like this: HR notifies IT, IT disables the user account, the laptop comes back, the ticket closes.

That process handles the identity. It does not handle anything the person *knew*, and for most organisations that is the larger exposure.

## Revocation and rotation are not the same thing

This distinction is the whole article.

**Revocation** removes an identity's ability to authenticate. Disabling an account, removing a group membership, deprovisioning through SCIM.

**Rotation** changes a secret so that prior knowledge of it becomes useless.

Revocation handles credentials that were *uniquely theirs*. It does nothing about credentials they *knew* — the shared firewall password, the vendor portal login, the API key they copied into a local config file three years ago. Those remain valid, and a person outside your organisation still knows them.

Most offboarding processes do the first and skip the second, which means the leaver retains working access to a set of systems nobody has enumerated.

## The three categories

Offboarding cleanly requires treating three distinct things differently.

### 1. Individual identity

The well-handled category. Through SSO and SCIM this should be largely automatic:

- Disable the account in the identity provider on the last working day
- Revoke active sessions and refresh tokens, not just the password — an active session survives a disabled account until its token expires
- Remove from all groups and role assignments
- Revoke MFA registrations and any registered devices
- Transfer or archive mailbox and file ownership before deletion

The session revocation point catches people out. Disabling an account frequently leaves an authenticated browser session working for hours. If you have continuous access evaluation available, enable it; if not, explicitly kill sessions.

### 2. Shared secrets

The neglected category, and the one that requires actual work.

The question you need to answer is: **what did this person know?**

Without a credential manager, this question is unanswerable. You are reduced to asking colleagues what the leaver had access to, which produces an incomplete list assembled from memory, on the day someone is leaving and everyone is busy.

With a credential manager holding an audit trail, it is a query: every secret this user viewed, shared or exported, with timestamps. That list becomes your rotation queue.

Prioritise it by privilege and reach:

1. **Domain, cloud and infrastructure administration** — rotate immediately, before the person's last day where the departure is not amicable
2. **Systems holding regulated or customer data** — within 24 hours
3. **Financial and payment systems** — within 24 hours, and notify finance to watch for anomalous requests
4. **Vendor portals and SaaS admin accounts** — within a week
5. **Everything else** — within the month

For anything the leaver held administrative access to, also review for persistence: accounts they created, API keys they generated, forwarding rules they configured, OAuth applications they consented to. A departing administrator does not need their own account if they created a service account nobody is watching.

### 3. Machine credentials

The category almost nobody handles, because it is invisible in HR-driven processes.

Over years, an engineer accumulates secrets that live in places no offboarding checklist covers:

- API keys generated under their personal account, powering production integrations
- SSH keys added to servers, sometimes years ago
- Personal access tokens in CI/CD pipelines
- Cloud access keys in local configuration files
- Service accounts they created and named after a project nobody remembers

Two failure modes follow. The security one: these credentials remain valid and are known to a former employee. The operational one, which organisations discover the hard way: you disable the leaver's account and a production integration breaks, because it was authenticating as them.

The fix is structural rather than procedural. Machine-to-machine authentication should never use a human's identity. Service accounts, workload identity, or scoped credentials issued from a secrets manager — owned by a team, not a person, and rotated on a schedule regardless of who leaves.

Until that is true, include in offboarding: audit tokens and keys issued under the leaver's identity, identify what depends on them, migrate to a service identity, then revoke.

## Timing, and the difficult case

For an amicable, notice-served departure, the sequence is straightforward and can run on the last day.

For a termination, suspension, or a departure to a competitor, the sequence inverts: **revoke first, notify second.** Access should be removed at the moment the conversation begins, not after it. This requires HR and IT coordination agreed in advance, because it cannot be arranged in the ten minutes before the meeting.

Two additions for a hostile departure:

- **Preserve before you delete.** Mailbox, files and relevant logs should be exported and held before any account deletion, in case a dispute or investigation follows. Deleting the evidence in the name of tidiness is a mistake you cannot undo.
- **Watch the exfiltration window.** The period *before* a resignation is announced is when data leaves. Review the leaver's file access, download volume and external sharing for the preceding weeks, not just the day of departure.

## The contractor problem

Contractors and vendor staff are offboarded worst of all, because they frequently never appear in the HR system that triggers the process. Access granted for a three-week engagement quietly persists for three years.

Two controls fix this:

- **Time-bound access by default.** Every contractor account and every shared credential given to a contractor carries an expiry date set at grant time. Access ends automatically and must be actively renewed, rather than persisting until someone remembers to remove it.
- **Quarterly access review** covering everyone who is not an employee. This reliably finds accounts belonging to organisations you no longer work with.

## A checklist worth having

**Before the last day**
- [ ] Determine departure type — amicable or hostile — and set the timing accordingly
- [ ] Pull the list of shared secrets this person accessed
- [ ] Identify machine credentials issued under their identity and what depends on them
- [ ] Preserve mailbox, files and logs

**On the last day**
- [ ] Disable the identity, revoke sessions, tokens and MFA registrations
- [ ] Remove group and role assignments
- [ ] Collect devices, verify encryption and wipe status
- [ ] Transfer file and mailbox ownership

**Within 24 hours**
- [ ] Rotate tier 1 and 2 shared credentials
- [ ] Review for persistence: created accounts, keys, forwarding rules, OAuth grants
- [ ] Migrate production dependencies off their identity

**Within 30 days**
- [ ] Complete the remaining rotation queue
- [ ] Remove from vendor portals and third-party systems
- [ ] Close the loop — confirm nothing broke and nothing was missed

## The test

Pick someone who left six months ago. Can you produce, today, the list of shared credentials they had access to — and confirm every one has been rotated since?

If you cannot answer that, offboarding is currently a process that closes tickets rather than one that closes access.

Our [Red-Vault platform](/products/red-vault/) makes that question a query rather than an investigation: every access logged, SCIM-driven deprovisioning, and a rotation queue built automatically from what the leaver actually touched. For the wider picture of where credentials end up in the first place, see [password sprawl](/blog/corporate-password-sprawl/), or [talk to us](/contact/) about an access review.
