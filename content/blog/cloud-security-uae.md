---
title: "Cloud Security in the UAE: Data Residency, Shared Responsibility and Configuration"
description: "A guide for UAE organisations on AWS, Azure and other clouds — in-country regions, who is responsible for what, the misconfigurations behind most cloud breaches, and how to fix them."
date: "2026-10-31"
category: "UAE & Dubai"
tags: ["Dubai", "UAE", "Cloud Security", "AWS", "Azure", "Data Residency"]
---

UAE organisations have moved to the cloud quickly, helped by in-country cloud regions: Microsoft Azure runs UAE North in Dubai and UAE Central in Abu Dhabi, Amazon Web Services opened its Middle East (UAE) region in 2022, and Oracle operates cloud regions in Dubai and Abu Dhabi. Speed has a cost, though. Most cloud breaches are not caused by the provider — they are caused by how customers configure what they rent.

## The shared responsibility model, in plain terms

The cloud provider secures the physical data centres, hardware and core services. You secure everything you configure: identities and permissions, network exposure, storage settings, encryption choices, logging, and the workloads you run.

When a storage bucket is left public or an administrator account has no MFA, the provider has not failed. The customer has. The [Snowflake customer breaches](/resources/incidents/snowflake-customer-breaches-2024/) are a recent, painful example: the platform was not hacked; customer accounts without MFA were.

## Data residency in the UAE

Several UAE rules push data to stay in-country or under strict conditions:

- The **UAE PDPL** (Federal Decree-Law No. 45 of 2021) restricts transfers of personal data outside the UAE to jurisdictions with adequate protection or under specified safeguards.
- **Health data** is governed by Federal Law No. 2 of 2019 on the use of ICT in health fields, which generally requires health data to be stored and processed inside the UAE, with limited exceptions.
- **Dubai Government** cloud use is shaped by DESC's cloud security standards, and **financial institutions** follow Central Bank of the UAE requirements.
- **DIFC and ADGM** entities apply their own data protection laws.

In-country regions make compliance much easier, but residency is a configuration decision too: backups, logs, replicas and SaaS integrations can quietly move data abroad.

## The misconfigurations we find most often

1. **Over-permissive identities.** Users and service accounts with administrator rights they never use.
2. **No MFA on privileged accounts**, especially old root or global administrator accounts.
3. **Public storage** — buckets, blobs and snapshots readable by anyone.
4. **Exposed management ports.** SSH, RDP and databases open to the internet.
5. **Logging switched off** or retained for too short a time to investigate anything.
6. **No guardrails.** Nothing stops the next engineer recreating the same mistake.

Our [AWS misconfigurations article](/blog/aws-security-misconfigurations/) covers several of these in detail.

## What good looks like

- A single inventory of every account, subscription and resource.
- Least-privilege roles derived from real usage, with phishing-resistant MFA for administrators.
- Continuous posture monitoring against CIS Benchmarks, with drift alerts.
- Policy-as-code in deployment pipelines, so insecure infrastructure is blocked before it exists.
- Cloud logs streamed to a SOC that knows what to look for.

## How we help UAE organisations

Our [cloud security service](/services/cloud-security/) assesses AWS, Azure and Google Cloud estates, prioritises findings by real exposure, and builds guardrails so they stay fixed. If you are planning a move into a UAE region, our [server and cloud migration service](/services/server-migration/) carries security across from day one. Talk to our [Dubai team](/dubai/) to start with a read-only assessment.
