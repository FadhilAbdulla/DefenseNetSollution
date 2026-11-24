---
title: "Crypto Exchange Attacks Report: Binance, Bybit, Ronin and the Pattern Behind Them"
description: "A comparison of four major cryptocurrency thefts, including both Binance-related incidents: entry points, failed controls, related CVEs and a defensive checklist."
date: "2026-11-24"
category: "Threat Intelligence"
tags: ["Cryptocurrency", "Binance", "Report", "Bitcoin"]
---

Headlines speak of hacking bitcoin. In the four thefts compared here, nobody defeated Bitcoin's cryptography. Attackers went after people, interfaces, permissions and verification code.

## The four cases

| Incident | What was taken | Way in | Control that failed |
| --- | --- | --- | --- |
| [Binance, May 2019](/resources/incidents/binance-hot-wallet-hack-2019/) | About 7,000 BTC, roughly US$40m | Stolen API keys and 2FA codes | Detection across accounts |
| [Ronin, Mar 2022](/resources/incidents/ronin-bridge-hack-2022/) | 173,600 ETH and 25.5m USDC | Spear-phishing and an unrevoked permission | Separation of approvals |
| [BNB Chain bridge, Oct 2022](/resources/incidents/bnb-chain-bridge-exploit-2022/) | 2m BNB obtained; much less left the chain | Forged proof | Verification code |
| [Bybit, Feb 2025](/resources/incidents/bybit-hack-2025/) | About US$1.5bn | Compromised wallet supplier | What signers could see |

Values are at the time of each theft, as reported by the companies, the FBI or analysts. They are not directly comparable.

## Two different Binance incidents

The 2019 theft came from the exchange's hot wallet. The 2022 exploit hit a bridge on BNB Chain, a blockchain associated with Binance. Merging them produces wrong lessons: the first was an account security problem, the second a code verification problem.

## What repeats

- **The approval is the target.** Four-eyes control fails if both pairs of eyes see the same false screen.
- **Thresholds are counted, not examined.** Five of nine means little when one party reaches five.
- **Speed favours the thief.** Limits and delays were missing where value was greatest.
- **Detection arrived late.** At Ronin a customer noticed first.
- **Recruitment is an attack channel.** Engineers were approached directly.

## Where CVEs fit

Two of these thefts, Binance 2019 and Ronin, are not tied to a CVE in the sources we reviewed. Patching alone would not have stopped them. Vulnerabilities still matter to the sector: [CVE-2024-7971](/resources/cve/cve-2024-7971/) was a Chrome zero-day used by an actor that targets cryptocurrency firms. Public-facing PHP applications bring their own route, described in [PHP to shell](/blog/php-to-shell-web-shell-defence/).

## A defensive checklist

1. Phishing-resistant MFA for staff and for withdrawals.
2. API keys without withdrawal permission by default.
3. Independent decoding of every high-value transaction.
4. Dedicated signing devices that never browse or run code projects.
5. Outflow limits and delays that grow with value.
6. Alerts on collective behaviour and balance mismatches.
7. Expiry on delegated permissions.
8. Integrity monitoring of supplier scripts.
9. A rehearsed pause decision with named people.
10. Minimal funds in hot wallets.

## Scope of this report

It covers four incidents chosen for different failure modes, not every major theft, and relies on public sources reviewed in November 2026. Nothing here is investment advice, and DefenseNet was not involved in investigating these cases.
