---
title: "Attack Surface vs Threat Surface: What the Difference Means in Practice"
description: "Attack surface is everything reachable. Threat surface is the part a real adversary has reason and means to use. How to define both and where each helps."
date: "2026-11-24"
category: "Threat Intelligence"
tags: ["Threat Surface", "Attack Surface", "CTEM"]
---

The two terms are often used as synonyms. Separating them helps, because they answer different questions: *what could be attacked* and *what is likely to be*.

There is no single official definition of threat surface, so agree one before you buy or measure anything. This is the one we use.

## The attack surface

Every point where someone could try to get in or take data out: internet-facing hosts, APIs, mobile apps, cloud storage, SaaS tenants, repositories, staff mailboxes, supplier connections and physical sites. It is an inventory, and it exists whether or not anyone is interested in you.

## The threat surface

The subset that a plausible adversary has a reason to want, a technique to use against, and a path to reach. A brochure site and a payment API may both be on the attack surface. For a fraud group, only one is interesting.

## A worked example

| Asset | Reachable? | Valuable to whom? | Priority |
| --- | --- | --- | --- |
| VPN gateway | Internet | Ransomware affiliates | High |
| Marketing microsite | Internet | Opportunistic defacement | Low |
| Supplier SFTP account | Supplier only | Data thieves | High |
| Lab server | Isolated | Nobody likely | Low |

The supplier account is the instructive row. An internet scan does not see it, yet it may be the easiest route to valuable data.

## All channels, not only hosts

Scanning IP ranges misses repositories with committed keys, abandoned DNS records that allow subdomain takeover, over-shared SaaS documents and fake profiles used for phishing. List channels first, then assets inside each channel, then give every one an owner.

## Where this fits in CTEM

Continuous threat exposure management, a programme model from Gartner, runs through scoping, discovery, prioritisation, validation and mobilisation. Attack surface work mainly serves discovery. Threat surface thinking shapes scoping and prioritisation.

Our [Threat Surface Management service](/services/threat-surface-management/) maintains both views.
