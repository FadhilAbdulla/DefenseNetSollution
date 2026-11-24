---
title: "Asset Threat Profile: A One-Page Template You Can Reuse"
description: "A practical template for profiling the threats to one critical asset, with a completed payment API example and guidance on keeping profiles current."
date: "2026-11-24"
category: "Threat Intelligence"
tags: ["Threat Profiling", "Threat Modelling", "Template"]
---

A risk register says ransomware is a high risk. An asset threat profile says how this group would reach this system, and what is meant to stop them. The second is something an engineer can act on.

## The template

| Field | Question |
| --- | --- |
| Asset and owner | What is it, and who decides? |
| Why it matters | What happens if it leaks, changes or stops? |
| Who would want it | Which realistic adversaries, and why? |
| Ways in | How could they reach it, including through people and suppliers? |
| On target | What would they do once there? |
| Controls | What should stop or reveal each step? |
| Evidence | When was each control last proven? |
| Gaps | What will change, by whom, by when? |

## Completed example: payment API

- **Why it matters:** fraudulent payouts and loss of card-scheme trust.
- **Who:** organised fraud groups; an insider with support access.
- **Ways in:** stolen partner key, broken object-level authorisation, a compromised support account.
- **On target:** change beneficiary, issue refunds, enumerate accounts.
- **Controls:** key rotation, per-partner limits, dual approval on beneficiary changes, alert on refund spikes.
- **Evidence:** limits tested in May; refund alert never tested.
- **Gap:** test refund alert within two weeks, owner payments lead.

The untested alert is the point of the exercise. It looked like a control until someone asked for evidence.

## Choosing assets

Start with five to ten: identity provider, payment flow, customer database, backups, build pipeline. Backups are regularly forgotten and regularly attacked.

## Keeping it alive

Review on architecture change, after a relevant breach, or every six months. One page is a deliberate limit. A long profile does not get updated.

Need help running the workshops? See [Threat-Informed Defense Intelligence](/services/threat-informed-defense/).
