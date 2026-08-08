---
title: "The Nine AWS Misconfigurations We Find in Almost Every Assessment"
description: "Public S3 buckets are the least of it. The IAM, network and logging misconfigurations that actually lead to compromise in AWS environments — and how to find them in your own account."
date: "2026-05-13"
category: "Cloud Security"
tags: ["AWS", "Cloud Security", "IAM", "CSPM"]
---

Cloud breaches are rarely exotic. In assessment after assessment, the same handful of misconfigurations show up — and the ones that cause real damage are usually not the ones organisations worry about.

Here are the nine we find most often, ranked roughly by how often they turn into a genuine attack path.

## 1. Over-permissive IAM roles

By a wide margin the most consequential finding. The pattern is always the same: a role was created during a project, permissions were widened until things worked, and nobody narrowed them afterwards.

Watch for:

- `"Action": "*"` on `"Resource": "*"` in any policy that is not a break-glass admin role
- `iam:PassRole` combined with a service that can assume roles — a reliable privilege escalation primitive
- `iam:CreatePolicyVersion` or `iam:AttachUserPolicy` granted to non-administrators, which is administrator access by another name
- Wildcard trust policies allowing any principal in an account to assume a role

**How to fix without breaking things:** derive least-privilege policies from actual usage. IAM Access Analyzer can generate a policy from CloudTrail history. Deploy the tightened policy alongside the existing one in audit mode, watch for what would have been denied, then enforce.

## 2. Instance metadata service v1 still enabled

IMDSv1 is unauthenticated and reachable by any process on the instance — including a vulnerable web application performing a server-side request. Retrieving temporary credentials for the instance role is a single HTTP request, and that is the mechanism behind several of the largest cloud breaches on record.

IMDSv2 requires a session token obtained via a PUT request with a hop limit, which defeats SSRF exploitation.

Enforce `HttpTokens: required` on every instance and bake it into your launch templates and AMIs. Then set the account-level default so new instances inherit it.

## 3. CloudTrail gaps

Three variants, all common:

- CloudTrail enabled in one region only, while resources exist in several
- Data events (S3 object-level, Lambda invocations) not logged, so you can see the bucket policy changed but not what was read
- The trail's own S3 bucket writable by the same roles that CloudTrail monitors, allowing an attacker to delete their tracks

Fix: an organisation trail covering all regions, log file validation enabled, delivered to a dedicated logging account that production roles cannot write to. That last part is what makes the log trustworthy during an investigation.

## 4. Security groups open to the world

`0.0.0.0/0` on port 22, 3389, 3306 or 6379 still appears regularly. SSH and RDP get attention; database and cache ports frequently do not.

Redis and MongoDB exposed without authentication remain a live problem, and internet-wide scanning finds them within minutes of exposure.

Fix: default-deny egress and ingress in your baseline, SSM Session Manager instead of SSH bastions, and an automated control that flags or reverts any security group rule opening a port to `0.0.0.0/0`.

## 5. Unencrypted or public snapshots

EBS and RDS snapshots are frequently shared for legitimate reasons — a vendor debugging session, a cross-account restore — and then never unshared. A public snapshot is a full copy of your data with no authentication required.

Fix: enable EBS encryption by default at account level, and add a continuous check for snapshots with public or unexpected cross-account sharing.

## 6. S3 buckets that are technically private but functionally public

Block Public Access has substantially reduced the classic open bucket. What replaced it is subtler:

- Bucket policies granting access to `"AWS": "*"` with a weak condition
- Buckets fronted by a CloudFront distribution with no origin access control, where the bucket itself is locked but the distribution is not
- Presigned URLs with multi-year expiry embedded in client applications

Fix: enable Block Public Access at the account level, use origin access control for CloudFront, and cap presigned URL lifetimes in code.

## 7. Long-lived access keys

IAM users with access keys that have not rotated in years, often committed to a repository at some point in their life, are one of the most common initial access vectors in cloud incidents.

Fix: eliminate IAM users for workloads entirely — use roles for EC2, ECS, Lambda and IAM Roles Anywhere for on-premises. For human access, use identity federation through IAM Identity Center rather than static keys. Where a key genuinely cannot be avoided, rotate on a schedule and monitor for use from unexpected locations.

## 8. Missing GuardDuty, or GuardDuty nobody reads

Enabling GuardDuty is cheap and the detections are good. The failure mode is that findings go to a console nobody logs into.

Fix: enable across all accounts and regions from a delegated administrator account, and forward findings to your SIEM so they enter the same triage queue as everything else. A finding that does not create a ticket does not exist.

## 9. No infrastructure-as-code guardrails

Every misconfiguration above is cheapest to fix in a pull request and most expensive to fix in production. Most organisations have adopted Terraform or CloudFormation without adding policy checks to the pipeline.

Fix: run policy-as-code — Checkov, tfsec, OPA/Conftest — in CI, failing the build on high-severity findings. Start in warn mode for two sprints to establish the baseline, then enforce. Pair it with drift detection, because console changes will always happen.

## A pragmatic order of work

If you have limited time, do these in order:

1. Enforce IMDSv2 everywhere — cheap, no operational impact, closes a severe path
2. Fix organisation-wide CloudTrail into a separate logging account
3. Audit and tighten wildcard IAM policies, starting with `PassRole` combinations
4. Enable Block Public Access and EBS encryption at account defaults
5. Eliminate long-lived access keys for workloads
6. Add policy-as-code to CI

The first four can be completed in a fortnight in most environments and remove the majority of realistic attack paths.

## Finding these in your own account

You do not need a commercial tool to start. Prowler and ScoutSuite are open-source, run against a read-only role, and produce a findings list mapped to CIS Benchmarks within an hour. Run one this week; the output is usually sobering and immediately actionable.

Where a commercial CSPM earns its cost is continuous monitoring and drift detection — knowing that a bucket became public at 14:20 rather than finding out at the next audit.

Our [cloud security practice](/services/cloud-security) runs assessments across AWS, Azure and GCP and normalises findings into a single prioritised risk register, so multi-cloud estates are not read through three different vendor consoles. [Get in touch](/contact) if you want a baseline of where yours currently stands.
