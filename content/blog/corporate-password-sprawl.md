---
title: "Password Sprawl: The Credentials We Find in Every Assessment"
description: "Shared spreadsheets, WhatsApp groups and admin logins four people know. Where corporate credentials actually live, why it happens, and how to fix it without a policy nobody follows."
date: "2026-08-21"
category: "Security Operations"
tags: ["Password Management", "Credentials", "Access Control", "Insider Risk"]
featured: true
---

Every internal assessment we run includes the same exercise: find the credentials. It has never taken long.

Not because the organisations are careless — most have a password policy, mandatory training and a genuine intent to do this properly. It is because storing and sharing credentials safely is a workflow problem, and almost nobody has solved the workflow. So people solve it themselves, and what they build is always the same handful of things.

## Where the credentials actually are

Ranked by how often we find them.

**The shared spreadsheet.** Usually named something like `IT Access.xlsx`, on a file share readable by more people than anyone realises. Frequently password-protected with a password that is itself shared. It contains the domain admin account, the router, the firewall, the backup console and the shared social media logins.

**The chat message.** Credentials pasted into WhatsApp, Teams or Slack because someone needed access during an incident and it was the fastest channel available. It is still there. Chat history is searchable, retained for years, and synced to personal devices.

**The browser.** Dozens of corporate credentials saved in personal Chrome profiles, synced to personal Google accounts, present on home machines. When that person leaves, the credentials leave with them.

**The ticket system.** Credentials in Jira comments, service desk tickets and email threads, indexed and searchable by anyone with an account.

**The code repository.** API keys, database connection strings and service account passwords committed to Git. Frequently removed in a later commit and still fully present in history. A private repository is not a secret store.

**The sticky note.** Still real, particularly in reception areas, clinical environments and manufacturing floors where shared workstations are the norm.

**The one person's head.** The engineer who set up the SAN in 2019 is the only one who knows the credentials. This is a resilience problem before it is a security one.

## Why it happens

It is worth being fair about the cause, because the fix depends on it.

Credential sharing exists because **work requires it**. Multiple people genuinely do need access to the same firewall, the same payment gateway, the same vendor portal. Many of those systems do not support individual accounts, or charge per seat in a way that makes individual accounts uneconomic, or belong to a vendor who issued exactly one login.

Given that reality, staff need somewhere to put a shared credential and some way to hand it to a colleague. If you do not give them one, they will use a spreadsheet — and they are not wrong to, because the alternative is not doing their job.

Policies that prohibit sharing without providing a sharing mechanism do not reduce sharing. They reduce *visible* sharing, which is worse, because now it happens in channels you cannot audit.

## What it actually costs you

Four concrete consequences, all of which we have seen play out.

**No attribution.** When a shared admin account makes a destructive change, your logs record the account, not the person. You cannot investigate, you cannot hold anyone accountable, and in a regulated environment you cannot satisfy an auditor asking who performed a privileged action.

**No rotation.** Shared credentials are rarely rotated, because rotating them means finding and notifying everyone who uses them. So they persist for years, accumulating exposure with every person who has ever seen them.

**Breach amplification.** A credential in a spreadsheet, a chat log and a browser profile is a credential in three places an attacker can reach. Compromise any one endpoint and you have the set.

**The offboarding hole.** Someone leaves. You disable their account. But the shared credentials they knew are unchanged, still valid, and now known to a person outside your organisation. Disabling an identity does not revoke knowledge.

That last one is the gap organisations most consistently underestimate, and it is worth stating plainly: **revoking access is not the same as the credential being safe.**

## What good looks like

The fix has four parts, in order of impact.

### 1. Eliminate sharing where you can

Before managing shared credentials better, reduce how many exist:

- Enable SSO wherever the vendor supports it. One identity, individually attributable, centrally revocable.
- Buy the extra seats where per-seat pricing is the only obstacle. It is almost always cheaper than the incident.
- Use role-based accounts in systems that support them, rather than one account everyone uses.

Every credential removed from the shared pool is one you no longer have to manage.

### 2. Give the remainder a proper home

For what genuinely must be shared, provide a password manager with real team features. The requirements that matter:

- **Client-side encryption**, so the vendor cannot read your vault. If the provider holds a key that opens your credentials, so does anyone who compels or compromises the provider.
- **Granular sharing** at vault and item level, so people get what their role needs and nothing more.
- **Time-bound access** that expires automatically, which is what makes contractor and vendor access safe.
- **A complete audit trail** — who viewed, edited, shared and exported what, and when.
- **SSO and SCIM integration**, so joining and leaving are automatic rather than remembered.

### 3. Make the safe path the fast path

This is the step that determines adoption. If retrieving a credential from the manager is slower than opening the spreadsheet, the spreadsheet wins.

Browser extensions, mobile access, offline availability and one-click sharing are not conveniences here — they are the security control, because they are what makes the correct behaviour the easiest behaviour. A perfectly secure system nobody uses protects nothing.

### 4. Clean up what already leaked

Migration is not the end. Every credential that lived in a spreadsheet, a chat log or a repository must be treated as exposed and rotated. Importing it into a vault does not make it secret again.

## A migration that works

The wrong approach is to announce a tool and expect adoption. The one that works:

**Week 1 — Find them.** Search file shares for spreadsheets with credential-shaped columns. Scan repositories and their history for secrets. Ask each team, without blame, where they currently keep shared logins. Framing matters: you are fixing a workflow gap, not conducting an audit.

**Week 2 — Import and organise.** Structure vaults by team and function. Flag duplicates, weak entries and anything appearing in public breach data.

**Week 3 — Onboard by team.** Roll out per team with a fifteen-minute walkthrough focused on the two things they will do daily: retrieve and share. Wire up SSO and SCIM so offboarding stops being manual.

**Week 4 — Rotate everything that was exposed.** Prioritise by privilege: domain and cloud admin first, then infrastructure, then application accounts.

**Ongoing — Delete the old copies.** Remove the spreadsheets. Purge the chat messages where your platform allows. Monitor for new sprawl, because it will reappear if the manager is ever slower than the shortcut.

## The uncomfortable audit question

If an auditor asked today, could you produce a list of every person who currently knows your domain administrator password?

Most organisations cannot. That is not a policy failure — it is the predictable outcome of never having given people a safe place to put a shared secret.

Our [Red-Vault platform](/products/red-vault/) is the product we built after finding the same spreadsheet in one assessment too many: zero-knowledge encryption, granular and time-bound sharing, full audit trail, and SSO-driven offboarding. If you would rather start by finding out how bad the sprawl currently is, our [security assessments](/services/vapt-penetration-testing/) include exactly that exercise. [Get in touch](/contact/).
