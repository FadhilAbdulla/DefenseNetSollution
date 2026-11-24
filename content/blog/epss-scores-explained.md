---
title: "EPSS Scores Explained: What AI/ML Threat Prediction Can and Cannot Tell You"
description: "How to read EPSS probability and percentile, why a low score is not a safe score, and where machine-learning exploit prediction belongs in a decision."
date: "2026-11-24"
category: "AI & Security"
tags: ["EPSS", "Machine Learning", "Threat Prediction"]
---

The Exploit Prediction Scoring System (EPSS), maintained by FIRST, is the best-known example of machine-learning threat prediction. It estimates the probability that a CVE will be exploited in the next 30 days, as a number from 0 to 1. Scores are public and refreshed daily.

## Probability and percentile

These are easy to confuse. A probability of 0.10 means an estimated 10% chance. The percentile tells you how that compares with other CVEs. Because most CVEs score very low, a modest probability can sit at a high percentile. Quote both.

## What EPSS does not know

- Whether you run the software
- Whether it is reachable in your network
- What the asset is worth
- What controls sit in front of it
- Whether an adversary is targeting you specifically

It also works on CVEs. Misconfigurations, leaked keys and custom application flaws have no score.

## A low score is not a safe score

A newly published CVE may score low until evidence accumulates. Treat **known exploitation**, such as a CISA KEV listing, as overriding any prediction: an estimate adds nothing once the event has happened.

## Using prediction responsibly

1. Use it to order work, not to dismiss it.
2. Set thresholds from the number of fixes you can actually make.
3. Re-score daily, but change priorities less often.
4. Show the reason beside every ranking.
5. Look back each quarter: what was exploited that we ranked low?

## Beyond EPSS

Vendors offer models trained on additional data. Ask what is being predicted, over what period, and how accuracy was measured on cases the model had not seen. If the answer is only a score out of 100, be cautious.

For a complete decision method, including reachability and asset value, read [our prioritisation guide](/blog/cve-patching-prioritisation/).
