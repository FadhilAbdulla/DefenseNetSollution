---
date: "2026-11-24"
title: "Binance Hot Wallet Hack (2019): How 7,000 Bitcoin Left in One Transaction"
description: "In May 2019 attackers withdrew about 7,000 BTC from Binance after collecting user API keys and 2FA codes. What is confirmed, how Binance responded and the control lessons."
name: "Binance hot wallet hack"
organisation: "Binance"
occurred: "2019-05-07"
period: "7 May 2019"
sector: "Cryptocurrency exchange"
region: "Global"
attackType: "Account compromise and coordinated hot-wallet withdrawal"
actor: "Not established in the sources reviewed"
impact: "About 7,000 BTC taken, worth roughly US$40 million at the time"
tags: ["Cryptocurrency", "Bitcoin", "Binance", "API Keys", "Phishing", "Hot Wallet"]
services: ["identity-access-management", "threat-intelligence", "managed-soc"]
related: ["incidents/bnb-chain-bridge-exploit-2022", "incidents/bybit-hack-2025"]
references:
  - label: "Security Affairs report"
    url: "https://securityaffairs.com/85157/cyber-crime/binance-exchange-hacked.html"
---

Bitcoin's protocol was not broken here. Attackers gained enough control of customer accounts to make the exchange send the coins itself.

## What happened

Binance said it discovered a large-scale breach on 7 May 2019 at 17:15:24 UTC. Attackers had obtained a large number of user API keys, two-factor codes and possibly other information, using phishing, viruses and other methods. About 7,000 BTC then left the exchange's hot wallet in a single transaction.

Binance stated that the wallet held around 2% of its bitcoin and that other wallets were unaffected. These figures come from the company and were not independently audited in the reporting we reviewed.

## Response

- Withdrawals and deposits were suspended during a security review
- Existing API keys were restricted to trading only
- Binance said its Secure Asset Fund for Users (SAFU) would cover the loss in full
- A proposal to reverse the theft by reorganising the Bitcoin blockchain was discussed publicly and not pursued

## How the attack worked

The notable feature is patience. Many accounts were gathered before any were used, so the final activity resembled approved customer withdrawals and passed existing checks. A per-account limit does little when hundreds of accounts act together.

## What went wrong

- Codes and keys that could be phished were sufficient to authorise withdrawal
- API keys could do more than many customers needed
- Controls judged individual actions better than collective behaviour

## Lessons and controls that would have helped

- Phishing-resistant MFA for withdrawals, plus address allow-lists with a waiting period
- API keys without withdrawal rights by default, and bound to source addresses
- Detection across accounts: shared destinations, timing, devices and networks
- Limits on total hot-wallet outflow, with a human decision above a threshold
- Minimal hot-wallet balance, so that the worst case is survivable

## Questions to ask about your own organisation

1. Would we notice 500 normal-looking requests heading to one destination?
2. Which API keys can move money, and who reviewed them?
3. Can one transaction empty a wallet or account?

For patterns across several thefts, read our [crypto exchange attack report](/blog/crypto-exchange-attacks-report/).
