---
date: "2026-11-24"
title: "Ronin Bridge Hack (2022): Five Keys, a Forgotten Permission and US$600 Million"
description: "Attackers gained five of nine validator keys on the Ronin bridge, helped by an allow-list that was never revoked. The timeline, attribution and lessons."
name: "Ronin bridge hack"
organisation: "Sky Mavis / Ronin Network"
occurred: "2022-03-23"
period: "23 March 2022; disclosed 29 March"
sector: "Cryptocurrency / Gaming"
region: "Global"
attackType: "Social engineering and validator key compromise"
actor: "Lazarus Group (North Korea), according to the FBI"
impact: "173,600 ETH and 25.5 million USDC stolen; valuations range from US$540 million to US$625 million"
tags: ["Cryptocurrency", "Bridge", "Nation-State", "Social Engineering", "Access Review"]
services: ["identity-access-management", "managed-soc", "email-security-awareness"]
related: ["incidents/bnb-chain-bridge-exploit-2022", "incidents/bybit-hack-2025"]
references:
  - label: "Elliptic analysis"
    url: "https://www.elliptic.co/insights/540-million-stolen-from-the-ronin-defi-bridge/"
---

Withdrawals from Ronin needed five of nine validators. One organisation effectively held five.

## What happened

Attackers compromised a Sky Mavis employee through spear-phishing and reached four validator keys. The fifth signature came through the Axie DAO, which had earlier let Sky Mavis sign on its behalf. The arrangement ended in December 2021, but the permission was never revoked.

On 23 March 2022 they withdrew 173,600 ETH and 25.5 million USDC. Nobody at Ronin noticed until a user could not withdraw 5,000 ETH. Ronin disclosed the theft on 29 March, and the FBI later attributed it to Lazarus Group.

The Block reported that the lure was a fake job offer sent as a PDF. Sky Mavis's own postmortem confirms spear-phishing without that detail.

## How the attack worked

No mathematics failed. A threshold of five from nine offers little protection when one intrusion can reach five, and a temporary exception became permanent by neglect.

## What went wrong

- Four of nine keys in one organisation's environment
- A delegated permission that outlived its purpose
- No alert on an exceptional withdrawal for days

## Lessons and controls that would have helped

- Distribute keys across independent organisations and infrastructure
- Give every exception an expiry date and an owner
- Alert on large outflows and on bridge balance mismatches
- Hardware-backed signing with policy checks
- Training for technical staff on recruitment lures

## Questions to ask about your own organisation

1. How many of our approvals could one intrusion supply?
2. Which temporary permissions are still active?
3. Would a customer discover our breach before we do?
