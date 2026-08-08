---
title: "Active Directory Attack Paths: What We Find in Every Internal Test"
description: "Kerberoasting, unconstrained delegation, ACL abuse and the shortest path to Domain Admin. The AD weaknesses that appear in nearly every internal penetration test, and how to close them."
date: "2026-03-18"
category: "Offensive Security"
tags: ["Active Directory", "Privilege Escalation", "BloodHound", "Penetration Testing"]
---

Give a competent tester a single low-privileged domain account and network access. In most organisations, Domain Admin follows within a day — often within hours. Not because of a zero-day, but because Active Directory accumulates permissions the way an attic accumulates boxes.

These are the paths we find most consistently, roughly in order of how often they lead to full compromise.

## 1. Kerberoasting

Any authenticated domain user can request a Kerberos service ticket for any account with a Service Principal Name registered. That ticket is encrypted with the service account's password hash, and can be cracked offline at high speed.

Service accounts are the perfect target: their passwords are frequently weak, set once during installation years ago, never rotated, and the account is often over-privileged because that was the fastest way to make the application work.

**What to do:**

- Inventory every account with an SPN. Question why each one exists.
- Move to **group Managed Service Accounts (gMSA)** wherever the application supports them — passwords are 240 characters, machine-managed and rotated automatically.
- Where gMSA is not possible, enforce a 25+ character random password and rotate it.
- Remove service accounts from privileged groups. A SQL service account almost never needs Domain Admin, whatever the vendor documentation says.
- Detect it: Kerberos service ticket requests (event 4769) with RC4 encryption, in volume, from a single account.

## 2. AS-REP roasting

Accounts with Kerberos pre-authentication disabled allow anyone to request an encrypted blob crackable offline — without any credentials at all in some configurations.

This setting is usually enabled for legacy application compatibility and then forgotten. Query for it (`DONT_REQ_PREAUTH`), and remove it unless there is a documented, current reason.

## 3. Unconstrained delegation

A host configured for unconstrained delegation caches the Kerberos TGT of every user who authenticates to it. Compromise that host and you can extract the tickets — including, with a little coercion, a Domain Controller's.

Combined with a coercion technique to force a DC to authenticate to your compromised host, this is a direct path to full domain compromise.

**What to do:**

- Enumerate hosts with unconstrained delegation. There should be very few, and ideally none besides Domain Controllers.
- Migrate to constrained delegation, or better, resource-based constrained delegation.
- Add privileged accounts to the **Protected Users** group and mark them "sensitive and cannot be delegated."

## 4. ACL abuse

The most under-appreciated category. Over years of administration, accounts accumulate rights over other objects: `GenericAll`, `GenericWrite`, `WriteDacl`, `WriteOwner`, `ForceChangePassword`.

A helpdesk group with `ForceChangePassword` over an OU containing a privileged account is a one-step escalation. A service account with `WriteDacl` over a group can grant itself membership.

These paths are invisible in the AD console and obvious in BloodHound, which is why attackers use BloodHound.

**What to do:** run BloodHound yourself, quarterly. Look specifically at the shortest paths from "any authenticated user" to Domain Admins, and remove the edges. This single exercise finds more privilege escalation than any other AD review activity.

## 5. Credentials in Group Policy and shares

Still, in 2026, we find:

- Passwords in SYSVOL scripts and Group Policy Preferences
- Credentials in the `Description` field of user objects
- Deployment shares with unattended installation files containing local administrator passwords
- Documentation shares readable by all domain users containing infrastructure passwords

Every authenticated user can read SYSVOL. Search it. Then search your file shares for common credential patterns.

## 6. Shared local administrator passwords

One local administrator password across the estate means compromise of one workstation is compromise of all of them, via pass-the-hash. This is the mechanism behind most ransomware lateral movement.

**Fix:** deploy **LAPS** (now built into Windows) so every machine has a unique, rotated local administrator password. This is among the highest-value controls available in a Windows estate and it is free.

## 7. Excessive Domain Admin membership

The typical finding is a Domain Admins group with fifteen to forty members, including service accounts, contractors who left, and people who needed it once in 2019.

Every one of those accounts is a full-compromise target, and they log in to ordinary workstations where their credentials sit in memory.

**Fix:**

- Domain Admins should be a small number of dedicated accounts used only on privileged access workstations.
- Implement tiering: Tier 0 (domain controllers, identity), Tier 1 (servers), Tier 2 (workstations). Credentials from a higher tier never authenticate to a lower one.
- Just-in-time elevation removes standing membership entirely.

## 8. Legacy protocols

- **LLMNR and NBT-NS** enabled allow poisoning attacks that capture NTLM hashes from any broadcast on the network. Disable both by Group Policy.
- **SMB signing not required** allows NTLM relay. Require signing on all systems.
- **NTLMv1 or LM** still permitted anywhere is an immediate finding.

Disabling LLMNR/NBT-NS and requiring SMB signing removes an entire category of internal attack at essentially no operational cost. If your estate has not done this, it is the fastest meaningful improvement available.

## 9. Stale objects

Accounts of departed staff still enabled. Computer objects for machines decommissioned three years ago. Groups nobody can explain.

Each is an unmonitored credential. Run a quarterly review: accounts with no logon in 90 days get disabled, then deleted after a further 90.

## How to check your own environment

You do not need to hire anyone to get the first pass:

1. **Run BloodHound** with a low-privileged account. Look at the "Shortest Paths to Domain Admins" queries. This will tell you more in an afternoon than most annual audits.
2. **Run PingCastle.** It produces a scored AD health report with prioritised findings, free for internal use.
3. **Search SYSVOL** for the strings `password`, `cpassword` and `pwd`.
4. **Check for SPNs** on user accounts and for accounts without pre-authentication.

Any of those four will produce findings. All four together produce a remediation backlog worth a quarter of work.

## Detection, not just prevention

Some of these paths cannot be fully eliminated in a live business. Where that is true, detect them:

- Event 4769 with RC4 encryption in volume — Kerberoasting
- Event 4662 with directory replication GUIDs — DCSync attempts
- Event 4728/4732 adding members to privileged groups
- Authentication from a Tier 0 account to a Tier 2 workstation — a tiering violation, and a strong signal

Our [offensive security team](/services/vapt-penetration-testing) runs internal assessments built around exactly these paths, and our [detection engineering practice](/services/siem-engineering) turns each finding into a validated detection rule. [Talk to us](/contact) if you want to know how long the path from a single user account to Domain Admin is in your environment.
