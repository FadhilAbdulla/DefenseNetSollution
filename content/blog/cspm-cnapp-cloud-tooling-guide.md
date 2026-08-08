---
title: "CSPM, CWPP, CIEM, CNAPP: What Cloud Security Tooling Actually Does"
description: "A plain explanation of the cloud security acronyms, what each category genuinely solves, where the overlap is, and how to decide what you need before a vendor decides for you."
date: "2025-06-18"
category: "Cloud Security"
tags: ["CSPM", "CNAPP", "Cloud Security", "Tooling"]
---

Cloud security tooling has generated more acronyms than almost any other area of the industry, and vendors have strong commercial incentive to keep the boundaries blurry. Here is what each category actually does, and how to work out what your environment needs.

## The categories

### CSPM — Cloud Security Posture Management

**Solves:** misconfiguration. Continuously assesses your cloud configuration against benchmarks and best practice, and alerts on drift.

**Finds:** public storage buckets, over-permissive security groups, unencrypted volumes, disabled logging, weak IAM policies, missing MFA on root accounts.

**Does not find:** anything happening inside a workload, or vulnerabilities in your code.

**Who needs it:** everyone with cloud infrastructure. This is the baseline category, and open-source options (Prowler, ScoutSuite, CloudSploit) provide a genuine starting point at zero cost. Commercial tools add continuous monitoring, multi-cloud normalisation and remediation workflows.

### CWPP — Cloud Workload Protection Platform

**Solves:** security of the running workload — VMs, containers, serverless functions.

**Provides:** vulnerability scanning inside the workload, runtime threat detection, file integrity monitoring, and behavioural detection for processes and network activity.

**Who needs it:** anyone running containers or VMs with meaningful data. If you already have a strong EDR that covers Linux servers and containers, you may have partial coverage already — check before buying twice.

### CIEM — Cloud Infrastructure Entitlement Management

**Solves:** identity and permission sprawl, which is the actual mechanism of most cloud breaches.

**Provides:** effective permission analysis (what a principal can *really* do, after all policy layers combine), privilege escalation path detection, unused permission identification, and right-sizing recommendations derived from actual usage.

**Who needs it:** organisations past a few hundred cloud identities, and anyone in a multi-account or multi-cloud setup. The analysis is genuinely hard to do manually — effective permissions in AWS are the intersection of identity policies, resource policies, permission boundaries, session policies and service control policies.

This category is underrated relative to its value. Cloud breaches are overwhelmingly identity breaches.

### CNAPP — Cloud-Native Application Protection Platform

**Solves:** the fragmentation of the above. A CNAPP is the consolidation of CSPM, CWPP, CIEM and usually code scanning into one platform with a shared data model.

**The genuine benefit** is correlation. A CSPM tells you a security group is open. A CWPP tells you a container has a critical vulnerability. A CNAPP tells you that *this specific container, with this exploitable vulnerability, is reachable from the internet through that open security group, and runs with a role that can read your production database.*

That single sentence is worth more than a thousand individually-ranked findings, because it identifies the one path that actually matters.

**Who needs it:** organisations with substantial cloud footprints where the volume of individual findings has become unmanageable. If you have fewer than a hundred cloud resources, a CNAPP is over-buying.

### Adjacent categories you will encounter

- **SSPM** — SaaS Security Posture Management. Configuration assessment for SaaS applications (Microsoft 365, Salesforce, Workday) rather than infrastructure. Genuinely useful and frequently overlooked, because most organisations' sensitive data now lives in SaaS.
- **DSPM** — Data Security Posture Management. Discovers where sensitive data actually is across cloud stores and who can reach it. Valuable when you genuinely do not know where regulated data lives, which is more common than most organisations admit.
- **KSPM** — Kubernetes-specific posture management, usually a component of a CNAPP rather than a standalone purchase.

## How to decide what you need

### Start with what you actually have

Before evaluating anything, answer:

- How many cloud accounts or subscriptions, across how many providers?
- How many workloads, and of what type — VMs, containers, serverless?
- How many identities, human and machine?
- What regulated data do you hold, and where?
- What do you already own? Your cloud provider's native tooling, your EDR and your existing SIEM may cover more than you think

That last point matters. AWS Security Hub, Microsoft Defender for Cloud and Google Security Command Center each provide substantial native posture management. For single-cloud organisations, the native tool plus good process frequently beats a commercial multi-cloud platform.

### A sensible progression

**Stage 1 — Free.** Run Prowler or ScoutSuite. Fix what it finds. Enable your cloud provider's native security service and forward findings to your SIEM. Most organisations have not exhausted this stage.

**Stage 2 — Native plus process.** Native posture management across all accounts, findings routed into a tracked backlog with ownership and SLAs, and infrastructure-as-code policy checks in CI so new misconfiguration is prevented rather than detected.

**Stage 3 — Identity.** Add CIEM capability, or dedicate effort to effective-permission analysis. This is where the highest-value findings are once basic posture is clean.

**Stage 4 — Consolidation.** Consider a CNAPP when finding volume across separate tools has become unmanageable, or when multi-cloud normalisation is consuming real analyst time.

Most organisations attempt to buy at stage 4 while still having stage 1 problems. The tool then surfaces thousands of findings that nobody has capacity to action, and the platform becomes shelfware with a subscription.

## Evaluation questions that separate products

- **How are findings prioritised?** If the answer is "by severity," you will drown. You want reachability and exploitability analysis
- **Does it show attack paths**, or only individual findings?
- **How does it handle exceptions?** A risk-accepted finding must stay suppressed without disappearing from the record
- **What is the false positive rate on IAM findings?** This is where products differ most
- **Does it integrate with our ticketing and our SIEM**, or is it another console?
- **Agent or agentless?** Agentless deploys faster and sees less at runtime; agents see more and cost operational effort. Many products offer both, and the honest answer for most environments is agentless for coverage plus agents on the workloads that matter
- **What does it cost at our scale in two years**, not at current size?

## The unglamorous truth

Tooling is not the constraint in most cloud security programmes. Ownership is.

The organisations with good cloud security posture are not the ones with the most expensive platform. They are the ones where every cloud account has a named owner, findings route to that owner automatically with an SLA, misconfiguration is blocked in CI before it deploys, and someone reviews the trend monthly.

That operating model works with free tooling. Without it, no platform helps.

Our [cloud security practice](/services/cloud-security) assesses AWS, Azure and GCP estates, normalises findings into a single prioritised risk register, and builds the CI guardrails that stop the same misconfiguration returning. [Get in touch](/contact) if you want a baseline before you buy anything.
