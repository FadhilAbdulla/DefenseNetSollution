---
title: "Digital Forensics: What to Do in the First Hour (and What Destroys Evidence)"
description: "Memory before disk, isolation before shutdown, and the well-meaning actions that ruin an investigation. A practical evidence-preservation guide for the people who find the incident first."
date: "2025-08-27"
category: "Incident Response"
tags: ["Digital Forensics", "DFIR", "Evidence", "Memory Analysis"]
---

The person who discovers an incident is rarely a forensic examiner. They are usually a system administrator who noticed something wrong, and what they do in the next hour determines whether the investigation can answer the questions that matter.

This is written for that person.

## The three questions the investigation must answer

Everything about evidence handling follows from these:

1. **How did they get in?** Without this, you rebuild into the same compromise.
2. **What did they reach?** This determines your regulatory and customer notification obligations.
3. **Are they still here?** This determines whether containment is complete.

Each of those answers lives in evidence that is easy to destroy accidentally.

## What destroys evidence

In rough order of how often we see it:

**Powering the machine off.** Memory contains running processes, network connections, injected code, decryption keys, and credentials in cleartext. All of it disappears on shutdown. Ransomware encryption keys have been recovered from memory in real cases — but only when the machine stayed on.

**Rebuilding or reimaging.** Understandable urgency, permanent loss. Once the disk is wiped, initial access is usually unknowable.

**Logging in with a domain administrator account.** This places privileged credentials in the memory of a machine the attacker controls. It is the single most damaging response action, because it escalates the incident while you are trying to contain it.

**Running antivirus removal.** Deletes the malware, and with it the artefact that identifies the campaign and the timeline.

**Deleting the ransom note or the phishing email.** Both are evidence. The note identifies the group and their known tradecraft; the email carries headers that trace delivery.

**Letting logs roll over.** Windows event logs and firewall logs have finite retention. In a compromise with weeks of dwell time, the critical entries may be days from being overwritten. Export them early.

**Waiting.** Cloud audit logs, DHCP leases, proxy logs and VPN records all age out. Every hour of delay narrows what can be reconstructed.

## The first hour, in order

### 1. Isolate, do not shut down

Remove network connectivity: unplug the cable, disable the switch port, or apply an EDR isolation action. Leave the machine powered on and logged in as it is.

For virtual machines, take a **snapshot including memory** before doing anything else. This is the single best evidence-preservation action available in a virtualised environment, and it takes seconds.

For cloud instances, do not terminate. Detach from load balancers, tighten the security group to deny all, and snapshot the volume.

### 2. Capture memory

Memory is the most volatile and often the most valuable evidence. Capture it before anything else touches the machine.

Tools: WinPmem, DumpIt, Magnet RAM Capture, or your EDR's built-in acquisition. Write the image to external media or a network share, not to the local disk — writing locally overwrites unallocated space that may contain deleted artefacts.

If you have no memory acquisition tool available and no EDR that can do it, this is a reason to call for help rather than to proceed.

### 3. Capture volatile system state

If a full memory image is not possible, capture the volatile data that would otherwise be lost:

- Running processes with full command lines and parent process IDs
- Active network connections with owning processes
- Logged-on users and active sessions
- Scheduled tasks and services
- DNS cache
- Loaded drivers

Run these from trusted external media where possible, and record every command you run and when.

### 4. Preserve logs before they roll

Export, immediately:

- Windows Security, System, Application and PowerShell Operational event logs
- Firewall and proxy logs for the relevant period
- VPN and remote access logs
- Cloud audit logs — CloudTrail, Entra ID sign-in and audit logs, Google Workspace admin logs
- Email gateway logs and, where relevant, the mailbox audit log
- EDR telemetry, exported rather than left in the console

Copy to a location the attacker cannot reach, in an account they do not control.

### 5. Image the disk

After memory. A forensic image — a bit-for-bit copy — preserves deleted files, slack space and unallocated regions that a file-level copy misses.

Where a full forensic image is impractical (large servers, live production), triage collection tools such as KAPE or Velociraptor gather the artefacts that matter — registry hives, event logs, prefetch, browser history, MFT, USN journal — in minutes rather than hours. For most incidents this is sufficient and far more practical.

### 6. Document as you go

A contemporaneous record, with timestamps:

- What was observed, when, and by whom
- Every action taken and its justification
- Every tool run, with its version
- Who handled which piece of evidence, and where it is stored

If the incident becomes a legal, insurance or regulatory matter, this record is the difference between evidence and hearsay. Reconstructing it afterwards is not the same thing and is visible as such.

## Chain of custody

For anything that may end up in a legal process, record for each item: what it is, when it was collected, by whom, from where, its hash value, and every transfer of possession since.

Hash the evidence at collection (SHA-256) and verify the hash whenever it is copied. This demonstrates the evidence has not been altered.

## Cloud and SaaS specifics

Cloud incidents have shorter evidence windows and different mechanics:

- **Snapshot before terminating** anything. Auto-scaling groups will happily destroy your evidence while you investigate
- **Export audit logs immediately.** Default retention in the console is often 90 days or less, and some events are shorter
- **Preserve the identity trail.** Which credentials, from where, what did they do — this is usually the core of a cloud investigation
- **Check for persistence** that survives instance replacement: IAM users and access keys created, roles modified, Lambda functions, scheduled tasks, OAuth application grants
- **Mailbox audit logs** in Microsoft 365 and Google Workspace need to be explicitly exported; the retention on the default configuration is limited

## When to stop and call for help

Handle it internally when: the scope is a single endpoint, the malware is commodity, there is no evidence of lateral movement, and no sensitive data is involved.

Call for external help when any of the following are true:

- Multiple systems are affected
- Domain controllers or identity infrastructure are involved
- There is evidence of data exfiltration
- Ransomware has executed
- The incident may be reportable to a regulator
- Insurance or legal proceedings are likely
- You do not have the tooling to acquire memory

There is no shame in the last one. The cost of calling early is a bill; the cost of calling late is an investigation that cannot answer the questions.

## Preparing before you need it

Three things make the first hour dramatically better and can be done this month:

1. **Have acquisition tooling ready** and know how to use it. Practise on a test machine
2. **Extend log retention.** Windows event logs default to sizes that roll over in days on a busy server. Increase them, and forward centrally
3. **Write the first-hour checklist** and put it somewhere findable — not only in the SharePoint site that may be unavailable during the incident

Our [incident response and forensics team](/services/incident-response) provides retained readiness support including tooling deployment and first-responder training, and can mobilise for live incidents. If you are dealing with something right now, call **+91 86603 71224** — and until we speak, isolate rather than shut down.
