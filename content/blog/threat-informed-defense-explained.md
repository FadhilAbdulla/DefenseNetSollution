---
title: "Threat-Informed Defense Explained: From Adversary Behaviour to Control Changes"
description: "What threat-informed defense means, how it differs from consuming threat intelligence, and a four-step cycle for using adversary behaviour to choose defensive work."
date: "2026-11-24"
category: "Threat Intelligence"
tags: ["Threat-Informed Defense", "CTID", "MITRE ATT&CK"]
---

Threat-informed defense uses knowledge of how adversaries actually operate to decide what to defend, test and improve. The abbreviation CTID refers to the Center for Threat-Informed Defense, which publishes open research in this field. The discipline itself is free for anyone to apply.

## What it is not

It is not subscribing to more feeds. An indicator such as an IP address expires quickly. A behaviour, such as dumping credentials from memory, stays useful because attackers find it harder to change.

## The cycle

### 1. Choose a few adversaries

Pick by sector, region and what you hold. Three well-understood groups beat thirty names on a slide.

### 2. Extract behaviours

List their techniques from public reporting and your own incidents. Keep the source for each one so that it can be challenged.

### 3. Compare with your defences

For each behaviour ask what prevents it, what would detect it and when either was last proven. Unproven counts as unknown.

### 4. Change something

Each cycle should finish with a hardened setting, a new detection or a test. If nothing changed, it was reading.

## A short example

A regional ransomware group commonly enters through VPN accounts without MFA, then uses remote management tools. The resulting actions are concrete: enforce MFA on the last exempt accounts, block unapproved remote tools, alert on their installation, and rehearse isolation.

## Common failures

- Choosing famous adversaries over likely ones
- Counting techniques as if all mattered equally
- Intelligence and detection teams that never meet
- Never retiring an assumption

Once adversaries are chosen, [profile the assets they would want](/blog/asset-threat-profile-template/). Our [Threat-Informed Defense service](/services/threat-informed-defense/) runs the cycle quarterly.
