---
title: "Hospital Cybersecurity in India: Why Healthcare Keeps Getting Hit"
description: "Medical devices that cannot be patched, flat networks, and a threat model where downtime is a clinical risk. A practical security programme for Indian hospitals and diagnostics chains."
date: "2025-07-30"
category: "Threat Intelligence"
tags: ["Healthcare", "Ransomware", "Medical Devices", "ABDM"]
---

Healthcare is among the most targeted sectors globally, and Indian hospitals have not been exempt. The reasons are structural rather than accidental, and understanding them is the starting point for a programme that works within clinical reality rather than against it.

## Why hospitals are attractive targets

**Downtime has clinical consequences.** A manufacturer losing a day of production loses money. A hospital losing its systems loses access to patient histories, medication records, imaging and lab results. That pressure makes payment more likely, and attackers know it.

**Data is uniquely valuable.** A medical record contains identity data, financial data, insurance details and clinical history. It cannot be reissued the way a card number can.

**The attack surface is unusually broad.** A mid-sized hospital runs its HIS, PACS, LIS, pharmacy systems, biomedical devices, building management, and a network shared by staff, patients and visitors — often with far fewer IT staff than a comparable business.

**Medical devices are unpatched by design.** An infusion pump or an MRI console runs a vendor-validated software configuration that cannot be modified without voiding certification. Many run operating systems that reached end of support years ago.

## The specific weaknesses we find

Across assessments in Indian healthcare, the same findings recur:

**Flat networks.** Biomedical devices, clinical workstations, administrative systems and guest Wi-Fi on the same broadcast domain or trivially reachable from each other. A compromised reception PC can reach the PACS.

**Shared clinical credentials.** A single login used by every nurse on a shift, because individual logins slow down care at the bedside. This is a real clinical workflow problem with a real security consequence: no attribution, and no ability to detect anomalous access.

**Unmanaged remote access.** Device vendors with permanent VPN access, shared credentials, no MFA and no logging.

**Legacy operating systems.** Windows 7 and older on imaging consoles and lab equipment, connected to the network.

**Backups that share the network.** Backup systems reachable and writable from the same network as the systems they protect, so ransomware encrypts both.

**No monitoring.** Logs exist, nobody reviews them, and there is no alerting.

## A programme that fits clinical reality

Security in a hospital must never obstruct care. That constraint is non-negotiable and it shapes every control choice.

### Segment first

Segmentation delivers the largest risk reduction per rupee, and it is achievable without touching a single medical device.

Minimum viable segmentation:

- **Biomedical devices** in their own segment, with tightly defined flows to only the systems they must reach
- **Clinical systems** (HIS, PACS, LIS) separated from administrative and general workstations
- **Guest and patient Wi-Fi** fully isolated from every internal network
- **Backup infrastructure** on a separate segment with one-way flows and credentials not used elsewhere
- **Vendor access** through a brokered jump host, never directly to devices

Build this from observed traffic rather than assumptions — passive monitoring for a few weeks tells you what actually communicates with what, and prevents the segmentation project from breaking a clinical workflow nobody documented.

### Handle credentials realistically

Do not begin by banning shared logins. Understand why they exist — usually because a nurse cannot spend forty seconds authenticating at a bedside during a procedure — and solve that problem.

Practical approaches:

- **Badge tap authentication** with a short PIN, which is fast enough for clinical use
- **Fast user switching** on shared clinical workstations
- **Session persistence** at the workstation with quick re-authentication rather than full login
- **Individual accounts with an emergency break-glass path** that is logged and reviewed, so clinicians are never blocked in an emergency

The break-glass path is essential. A control that can block access during a medical emergency will be circumvented permanently, and rightly so.

### Protect unpatchable devices without patching them

- **Network isolation** so devices are unreachable from anywhere an attacker realistically lands
- **Allowlisting** on Windows-based consoles, which run a fixed application set and are well suited to it
- **Removable media controls**, since USB remains a live vector for imaging systems
- **Passive monitoring** for anomalous device behaviour — devices communicate in highly predictable patterns, which makes deviation a strong signal
- **Procurement requirements** so new equipment arrives with a defined patching commitment, an SBOM and a documented end-of-support date. This is the only way the problem shrinks over time

### Backups that survive an attack

The control that most reliably determines whether a hospital recovers in days or weeks:

- **Immutable or offline copies** that ransomware cannot reach or encrypt
- **Separate credentials**, not domain accounts
- **Restore testing** — actually restoring the HIS into an isolated environment and confirming it works, not checking that the backup job completed
- **Documented recovery time** for each clinical system, agreed with clinical leadership

### Detection, scoped sensibly

You do not need to monitor everything. Prioritise:

- Authentication and privilege changes on clinical systems
- Access to the biomedical segment from anywhere it should not originate
- Bulk record access — a single account reading hundreds of patient records is either a legitimate reporting job you know about, or an incident
- Ransomware precursors: shadow copy deletion, mass file modification, backup service tampering
- Vendor remote access outside scheduled windows

### Plan for downtime, clinically

Every hospital needs documented downtime procedures that clinical staff have practised: paper forms, manual workflows, how imaging results move without PACS, how medications are verified without the pharmacy system.

This is a clinical governance activity, not an IT one, and it must be exercised. During a real incident it will be the primary control keeping patients safe.

## Regulatory context in India

- **DPDPA 2023** applies fully to patient data, with consent, rights fulfilment, breach notification and retention obligations
- **CERT-In directions** require reportable incidents to be notified within six hours, and 180-day log retention within India
- **ABDM** participation carries its own security and privacy requirements for digital health records
- **NABH accreditation** includes information management standards that increasingly attract scrutiny

Building one control set mapped to all of these is considerably cheaper than treating them as separate programmes.

## Where to start with limited resources

Most Indian hospitals have small IT teams and constrained budgets. In priority order:

1. **Isolate guest Wi-Fi** completely. Cheap, fast, removes an easy path
2. **Separate backups** and test a restore of your HIS
3. **Fix vendor remote access** — brokered, MFA, time-limited, logged
4. **Segment biomedical devices** from general networks
5. **Deploy EDR** on all Windows systems that can accept it
6. **Enable MFA** on all remote and administrative access
7. **Write and exercise downtime procedures** with clinical leadership
8. **Add monitoring**, in-house or managed

The first four require configuration and planning rather than significant licensing spend, and they remove the most commonly used paths.

Our team works with hospitals and diagnostics chains across Kerala and the wider region on exactly this sequence, with [managed detection](/services/managed-soc) tuned to clinical environments and assessments designed never to touch a device in patient use. [Get in touch](/contact) for a segmentation and readiness review.
