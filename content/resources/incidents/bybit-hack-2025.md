---
date: "2026-11-24"
title: "Bybit Hack (2025): The US$1.5 Billion Theft Through a Trusted Interface"
description: "How a compromised Safe{Wallet} developer machine led to altered signing code and the theft of about US$1.5 billion from Bybit, attributed by the FBI to North Korea."
name: "Bybit hack"
organisation: "Bybit and Safe{Wallet}"
occurred: "2025-02-21"
period: "4–21 February 2025"
sector: "Cryptocurrency exchange"
region: "Global; Bybit opened its headquarters in Dubai in 2023"
attackType: "Supply chain compromise and transaction manipulation"
actor: "TraderTraitor (North Korea), according to the FBI"
impact: "About US$1.5 billion in virtual assets stolen"
tags: ["Cryptocurrency", "Supply Chain", "Nation-State", "Cold Wallet", "Social Engineering"]
services: ["application-security", "identity-access-management", "managed-edr-xdr"]
related: ["incidents/ronin-bridge-hack-2022", "cve/cve-2024-7971"]
references:
  - label: "FBI public service announcement I-022625-PSA"
    url: "https://www.ic3.gov/PSA/2025/PSA250226"
  - label: "The Hacker News summary of the Safe findings"
    url: "https://thehackernews.com/2025/03/safewallet-confirms-north-korean.html"
---

Bybit's funds were in a cold wallet protected by several approvers. The approvers approved the theft, because the interface showed them something other than what they signed.

## What happened

On or about 21 February 2025, roughly US$1.5 billion in virtual assets was taken. The FBI attributed it to North Korea on 26 February, using the name TraderTraitor, and reported that assets were quickly converted and spread across thousands of addresses.

## Timeline

| Date (2025) | Event |
| --- | --- |
| 4 Feb | A Safe{Wallet} developer's macOS machine is compromised after a malicious Docker project is run, likely through social engineering |
| After 4 Feb | AWS session tokens are hijacked, bypassing MFA |
| 19 Feb | Benign JavaScript served by Safe{Wallet} is replaced |
| 21 Feb | The code activates during a Bybit transaction |
| 26 Feb | FBI public announcement |

## How the attack worked

The altered code targeted Bybit's wallet specifically and left others alone, which reduced the chance of discovery. Signers saw a routine transfer while authorising a change that handed over control of the wallet. Multi-signature protection verified who signed, not whether they understood what they signed.

## What went wrong

- A developer workstation could reach production delivery
- Session tokens outlived the MFA that created them
- Signers depended on the same compromised display
- Changed web code was not independently verified

## Lessons and controls that would have helped

- Decode and verify transactions on an independent device
- Simulate transactions and block unexpected control changes
- Short-lived, device-bound cloud sessions
- Signed, monitored front-end releases with integrity checks
- Run untrusted projects only in disposable environments

## Questions to ask about your own organisation

1. Do approvers see what is executed, or what a website says?
2. Can one developer session alter production?
3. Would we notice a JavaScript file changing?
