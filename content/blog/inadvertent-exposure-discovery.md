---
title: "Inadvertent Exposure: Finding What You Published by Accident"
description: "Public buckets, forgotten subdomains, committed keys and test portals. Where accidental exposures come from, how to find them and how to validate before raising an alarm."
date: "2026-11-24"
category: "Security Operations"
tags: ["Exposure", "Misconfiguration", "Subdomain Takeover"]
---

Not every exposure is a vulnerability. Often nothing is broken: someone published a thing that was never meant to be public.

## Where accidental exposure comes from

- **Temporary access** that never expired, such as a port opened for a vendor.
- **Copies of production**: staging sites and database dumps with real data.
- **Abandoned DNS** pointing at a deprovisioned cloud service that anyone can claim.
- **Keys in code**, including in old commits and container layers.
- **Sharing links** set to anyone with the link.
- **Acquisitions** whose estate nobody inventoried.

## How to look

1. Certificate transparency logs reveal hostnames you never registered centrally.
2. Cloud provider APIs list what is public now, which is more reliable than guessing from outside.
3. Secret scanning should cover full git history, not just the current branch.
4. DNS zones should be compared with live resources to find dangling records.
5. Search engines and internet scan datasets show what strangers already see.

Inside-out and outside-in views disagree. The disagreements are usually where the findings are.

## Validate before you escalate

- Confirm the asset is yours.
- Confirm the access is real, without downloading more data than needed to prove it.
- Check whether a key is live using the least invasive call the provider offers.
- Establish since when, and whether access logs show use.
- Rule out intent: some things are public on purpose.

## Fix the cause

Removing the bucket policy closes one exposure. An organisation-level block on public storage, expiry on firewall exceptions, push protection for secrets and DNS removal in the decommissioning checklist close the class.

When something sensitive is confirmed, follow a [notification protocol](/blog/critical-finding-notification-protocol/). For ongoing coverage, see [Threat Surface Management](/services/threat-surface-management/).
