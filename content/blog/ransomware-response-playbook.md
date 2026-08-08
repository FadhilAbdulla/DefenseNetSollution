---
title: "Ransomware Response Playbook: The First 24 Hours"
description: "A practical hour-by-hour incident response playbook for ransomware — isolation, evidence preservation, exfiltration assessment, communications and recovery sequencing."
date: "2026-07-15"
category: "Incident Response"
tags: ["Ransomware", "DFIR", "Playbook", "Business Continuity"]
featured: true
---

Ransomware is not a technical emergency that becomes a business emergency. It is a business emergency from minute one, and the decisions made in the first few hours determine whether recovery takes days or months.

This is the playbook we work from. It assumes you have just discovered encryption in progress or completed, and that you do not yet know how the attackers got in.

## Hour 0–1: Contain without destroying evidence

The instinct is to wipe and rebuild. Resist it. A rebuilt machine tells you nothing about how the attacker entered, which means you will rebuild straight back into the same compromise.

**Do:**

- Disconnect affected systems from the network — pull the cable or disable the switch port. Leave them **powered on**.
- Disable the accounts you can see being used, starting with any domain administrator account.
- Block outbound traffic to unknown destinations at the perimeter.
- Take a snapshot of virtual machines before touching them.
- Start a written log with timestamps. Every action, who took it, and why.

**Do not:**

- Power off machines. Memory contains encryption keys, injected processes and network connections that will be gone forever.
- Delete the ransom note. It identifies the group, which tells you their usual tradecraft.
- Restore from backup yet. If the attacker still has access, you will encrypt the restored data too.
- Log in to affected systems with domain administrator credentials. You will hand the attacker fresh credentials from memory.

That last point causes more damage than almost anything else during response. Use local accounts or dedicated break-glass credentials that are not privileged domain-wide.

## Hour 1–3: Establish scope

Three questions matter, in this order:

1. **Which systems are encrypted?** Build a list, not an impression.
2. **Which systems are compromised but not encrypted?** These are usually the more dangerous ones — the attacker's footholds.
3. **Is the attacker still active?** Check for live command-and-control traffic, new account creation, and scheduled tasks created in the last 72 hours.

The answer to question three changes everything. An attacker still in the environment means containment is incomplete, and recovery cannot begin.

Look specifically for the standard pre-encryption sequence: credential dumping, discovery commands (`net group "Domain Admins" /domain`, `nltest`, AD enumeration tools), lateral movement over SMB or RDP, disabling of endpoint protection, deletion of volume shadow copies, and staging of an archive tool such as WinRAR or Rclone.

That last one matters enormously for the next section.

## Hour 3–6: Determine whether data was stolen

Modern ransomware groups exfiltrate before they encrypt. Whether they did in your case determines your legal and regulatory exposure, and it is a question you must answer with evidence rather than hope.

Indicators of exfiltration:

- Large outbound transfers in firewall or proxy logs, particularly to cloud storage providers, `mega.nz`, or a single unfamiliar IP.
- Presence of Rclone, MegaSync, FileZilla or similar tools on servers where they do not belong.
- Archive files staged in temporary directories, particularly split archives.
- Access to file shares by an account that has no business reason to browse them.

Be precise in what you conclude. "We found no evidence of exfiltration" and "no exfiltration occurred" are different statements, and only one of them is defensible to a regulator. Under India's **CERT-In directions**, reportable cyber incidents must be notified within six hours of noticing them — so this assessment runs in parallel with notification, not before it.

## Hour 6–12: Decide on the recovery path

There are three viable paths and one bad one.

**Path 1: Restore from backup.** The right answer when backups are recent, complete and verifiably clean. Test the restore in an isolated environment first. Confirm the backup pre-dates initial access, not just encryption — attackers are often present for weeks.

**Path 2: Rebuild.** Slower, but necessary when backups are missing, encrypted or untrustworthy. Prioritise by business function, not by system.

**Path 3: Decryption tooling.** Check the No More Ransom project and vendor decryptors. For some families, free decryptors exist. This is worth ten minutes of checking.

**The bad path: paying without analysis.** Payment does not guarantee decryption, does not prevent publication of stolen data, and in many jurisdictions carries sanctions exposure. If payment is being considered, it is a board and legal decision informed by counsel and your insurer — not a technical one. Our role is to give you accurate facts to decide with, including a realistic assessment of whether the decryptor is likely to work.

## Hour 12–24: Sequence the recovery

Recovery order matters more than recovery speed:

1. **Rebuild the identity layer first.** If Active Directory was compromised, everything downstream is untrustworthy. Reset the `krbtgt` account twice, rotate all privileged credentials, and rebuild domain controllers from known-good media where necessary.
2. **Restore core infrastructure** — DNS, DHCP, certificate services.
3. **Restore business-critical applications** in priority order agreed with the business, not with IT.
4. **Restore user endpoints** last.

Each restored system goes back onto a clean network segment with endpoint detection installed and reporting *before* it rejoins production. Restoring into the same flat network that just got encrypted is how organisations get hit twice in a fortnight.

## Communications: parallel, not sequential

While technical response runs, someone must own communication. Prepare positions for:

- **Employees** — what to do, what not to do, and where to get updates. Assume anything you write internally may become public.
- **Customers** — factual, timely, without speculation about cause.
- **Regulators** — CERT-In within six hours; sector regulators such as the RBI, SEBI or IRDAI as applicable; DPDPA notification obligations where personal data is affected.
- **Insurer** — usually within 24–72 hours per policy terms, and often before you engage external responders, or the cost may not be covered.
- **Law enforcement** — local cybercrime cell, and the National Cyber Crime Reporting Portal.

Use an out-of-band channel. If the attacker is in your email, your incident bridge should not be.

## After the fire: the part most organisations skip

The engagement is not finished when systems are back. Within two weeks, you should have:

- A **root cause analysis** naming the initial access vector, with evidence.
- A **dwell time estimate** — how long they were inside before encryption.
- A **control gap list** with owners and dates, not recommendations in a PDF.
- **New detections** deployed for every technique observed, validated by testing.

The uncomfortable statistic is that a meaningful proportion of ransomware victims are hit again within a year, usually through the same weakness. The difference between those organisations and the ones that are not is entirely down to whether this last phase actually happened.

## Preparation beats response

Everything above is easier if it was rehearsed. The three controls that most reliably change ransomware outcomes:

- **Offline or immutable backups**, tested by restoring — not by checking that the job succeeded.
- **Phishing-resistant MFA** on remote access and privileged accounts.
- **Detection on the pre-encryption sequence** — credential dumping, shadow copy deletion, mass file modification — because that is where you have hours of warning rather than seconds.

If you want that sequence tested against your own environment before an attacker tests it for you, our [incident response team](/services/incident-response) runs tabletop and technical readiness exercises. If you are dealing with something live right now, call **+91 86603 71224** — the line is answered 24/7.
