---
title: "Your Supplier Was Breached: What to Do in the First 48 Hours"
description: "A checklist for when a vendor or partner announces a security incident: establish exposure, cut risky access, ask the right questions and decide whether to notify."
date: "2026-11-24"
category: "Incident Response"
tags: ["Supplier Breach", "Third-Party", "Checklist"]
---

A vendor you use is in the news. You do not control the incident or the facts, but you still have decisions to make. Assessing suppliers beforehand is a separate job, covered in [third-party risk](/blog/supply-chain-third-party-risk/).

## Hours 0–4: are we connected?

- Which of our systems connect to them, and with which accounts, tokens and network paths?
- What data of ours do they hold?
- Do we run their software, and which versions?
- Who internally owns the relationship?

## Hours 4–12: reduce dependence

Rotate API keys and tokens they hold. Suspend remote access and single sign-on trust where the business can tolerate it. Pause automatic updates if their build pipeline is in doubt. Write down every change so it can be reversed.

## Hours 12–24: look for use

Review logs for the supplier's accounts and addresses for the period they disclose, and earlier: first-announced dates often move. Watch for logins from new locations, bulk reads and new credentials. Expect phishing that refers to the incident.

## Questions to send

1. Was our data or our tenant affected? If unknown, when will you know?
2. What was the first evidence of unauthorised access?
3. Were credentials, keys or source code taken?
4. What indicators can you share?
5. What should customers do now?

## Hours 24–48: decide

Determine with counsel whether you must notify regulators, customers or insurers. Your duty may begin even while the supplier is still investigating. Record what you knew and when.

## Afterwards

Restore access deliberately, not by default. The [Kaseya](/resources/incidents/kaseya-vsa-ransomware-2021/) and [MOVEit](/resources/incidents/moveit-cl0p-mass-exploitation-2023/) cases show how far supplier incidents travel.

Monitoring for related breaches is part of [Threat-Informed Defense Intelligence](/services/threat-informed-defense/).
