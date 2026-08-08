---
title: "Third-Party Risk: Your Security Is Now Your Vendors' Security"
description: "Software supply chain attacks, compromised suppliers and SaaS breaches. How to assess vendor risk in a way that reduces exposure instead of generating questionnaires."
date: "2025-10-08"
category: "Threat Intelligence"
tags: ["Supply Chain", "Third-Party Risk", "Vendor Management", "SBOM"]
---

Most organisations have more third parties with access to their data than they have employees. Almost none can produce an accurate list of them.

Third-party risk management has a reputation for being a questionnaire exercise that consumes effort and reduces nothing. That reputation is deserved for the way it is usually practised. It does not have to be.

## The three distinct problems

They get conflated, and they need different controls.

**1. Software supply chain.** Code you build into your product — libraries, packages, container base images, build tooling. Compromise here executes inside your systems with your privileges.

**2. Service providers with access.** Managed service providers, contractors, integrators, support vendors. They hold credentials to your environment. A compromise of their systems is functionally a compromise of yours.

**3. SaaS and data processors.** Vendors holding your data on their infrastructure. Their breach exposes your data without them ever touching your network.

A vendor questionnaire designed for category 3 tells you nothing useful about category 1.

## Software supply chain

The attacks that matter here are not hypothetical. Dependency confusion, typosquatted packages, compromised maintainer accounts and poisoned build pipelines have all produced widespread real-world compromise.

**Controls that work:**

- **Pin dependencies by hash**, not by version range. A caret range means your build pulls whatever was published this morning
- **Use an internal registry proxy** with an allowlist, rather than pulling directly from public registries. This also protects against dependency confusion, where an attacker publishes a public package with the same name as your internal one
- **Generate an SBOM per build.** When the next widely-exploited library vulnerability appears, the question "are we affected, and where?" should take minutes. Organisations without SBOMs spent weeks on this during Log4j
- **Verify signatures** on packages and container images where the ecosystem supports it
- **Secure the build pipeline itself.** CI systems typically hold credentials to production. Treat them as Tier 0 infrastructure: restrict who can modify pipeline definitions, require review for changes, and scope deployment credentials narrowly
- **Scan for secrets** on every commit, and treat any secret that reaches a repository as compromised, even a private one

The build pipeline point deserves emphasis. It is common to find organisations with strong production access controls whose CI system can deploy anything to anywhere, with permissions granted to any engineer who can approve their own merge.

## Service providers with access

This is the highest-consequence category and the least well managed. A managed service provider compromise gives an attacker privileged access to every client simultaneously — which is precisely why they are targeted.

**Controls that work:**

- **Inventory the access.** Every vendor account, what it can reach, who owns the relationship, when it was last used. This exercise alone reliably finds accounts belonging to vendors whose contracts ended years ago
- **Named individual accounts**, never shared. If three engineers at your MSP use one login, you cannot attribute anything
- **MFA, enforced.** Vendor accounts are frequently exempted for convenience. This is the exemption that gets used against you
- **Time-bounded access.** Enabled for a scheduled window, on request, disabled after. Standing vendor access is standing risk
- **Session recording** for privileged vendor activity
- **Network scoping.** A vendor supporting one application should not have network reachability to your entire estate
- **Quarterly review** removing access for vendors no longer engaged

Contractually, require notification of security incidents affecting their environment within a defined window, and the right to audit. Both are frequently negotiated away; both matter.

## SaaS and data processors

Here the questionnaire has a legitimate role, but only if it is proportionate and if the answers are used.

**Tier your vendors first.** Three tiers is enough:

- **Critical** — holds regulated or crown-jewel data, or an outage stops your business
- **Important** — holds business data, an outage is disruptive
- **Low** — no sensitive data, easily replaced

Applying the same 200-question assessment to all three is why the process collapses. Critical vendors warrant genuine scrutiny; low-tier vendors warrant a five-question check.

**For critical vendors, ask for evidence, not assertions:**

- A current SOC 2 Type II report or ISO 27001 certificate — and read the scope section, which frequently excludes the service you are buying
- Penetration test summary from the last twelve months
- Their incident notification commitment, in the contract
- Where data is stored geographically. For Indian organisations this has DPDPA and, for some sectors, localisation implications
- Sub-processor list, because their vendors are now your fourth parties
- Data deletion process and timeline on contract termination

**Then verify independently.** External attack surface data, breach history, and domain security posture are all observable without the vendor's cooperation, and they occasionally contradict what the questionnaire said.

## Contractual clauses worth insisting on

- **Incident notification** within a specific number of hours, not "promptly"
- **Right to audit**, or at minimum right to receive audit reports
- **Sub-processor change notification** with a right to object
- **Data location** commitments
- **Deletion on termination** with certification
- **Security requirements flow-down** to their sub-processors
- **Liability** that is not capped at three months of fees when they hold your entire customer database

That last one is where most negotiations end, but it is worth raising, because the vendor's willingness to carry any liability tells you what they think of their own controls.

## Detect, do not just assess

Assessment is a point-in-time judgement about a continuously changing thing. Assume it will be wrong eventually and build detection:

- Monitor vendor account activity in your environment the same way you monitor employee accounts — unusual hours, unusual systems, unusual volume
- Alert on vendor account use outside agreed maintenance windows
- Monitor for your own domains and data appearing in breach dumps and paste sites
- Track your SaaS estate — shadow IT means vendors you have never assessed are already holding your data

## Where to start if you have nothing

**Week 1:** Build the inventory. Every third party with either access to your systems or custody of your data. Finance's payment records are a better source than IT's asset list for finding the ones nobody remembers.

**Week 2:** Tier them. Identify the critical few.

**Weeks 3–4:** Audit access for critical vendors. Remove what is dormant, enforce MFA on what remains, and scope network reachability.

**Ongoing:** Assess critical vendors properly at onboarding and annually. Keep the low tier lightweight.

The access audit in weeks 3–4 typically produces the largest single risk reduction, and it requires no vendor cooperation at all.

Our [compliance and vCISO practice](/services/compliance-consulting) includes third-party risk programme design, and our [managed SOC](/services/managed-soc) monitors vendor account activity alongside employee identity. [Get in touch](/contact) if you cannot currently produce a list of who has access to what.
