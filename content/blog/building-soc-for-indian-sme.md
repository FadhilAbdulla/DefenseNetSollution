---
title: "Building Security Monitoring for an Indian SME on a Real Budget"
description: "In-house, outsourced or hybrid? A cost-realistic guide to establishing 24/7 detection and response for a 100–1000 person Indian business, and what to do first if budget is tight."
date: "2025-11-05"
category: "Security Operations"
tags: ["SOC", "SME", "India", "Managed Security"]
---

Every security vendor's reference architecture assumes a team of fifteen and a seven-figure budget. Most Indian businesses have neither, and the advice available to them is either enterprise material scaled down badly or generic checklists that do not survive contact with reality.

Here is a realistic assessment of the options.

## The staffing arithmetic

The first thing to understand about 24/7 monitoring is that it is a staffing problem before it is a technology problem.

Genuine round-the-clock coverage requires a minimum of five to six analysts to cover three shifts with leave, illness and attrition accounted for. Add a detection engineer and a team lead and you are at seven to eight people before a single tool is licensed.

For most organisations under a thousand employees, that headcount cannot be justified against the risk being managed — and more practically, cannot be recruited and retained. Experienced SOC analysts in India have abundant options, and a small in-house team competing with product companies and global service providers on compensation will lose.

This is why the honest recommendation for most SMEs is not "build a SOC."

## Option 1: Fully in-house

**Works when:** you are a regulated financial institution with mandated in-house capability, you have a genuinely unusual environment that outsiders cannot learn quickly, or you have data sovereignty constraints that prohibit external access.

**Realistic cost:** seven to eight salaries, SIEM licensing, EDR licensing, and the management overhead of running a 24/7 rota.

**The failure mode:** hiring two analysts, calling it a SOC, and discovering that coverage exists between 9 and 6 on weekdays only — which is precisely when attackers avoid operating. Partial coverage marketed internally as full coverage is worse than acknowledged partial coverage, because it stops the organisation from buying the thing it needs.

## Option 2: Fully outsourced

**Works when:** you need coverage now, you do not have specialist security staff, and your environment is reasonably standard.

**Realistic cost:** a monthly retainer, typically scaled by endpoint count and log volume. For a 200-person business with a standard Microsoft or Google estate, this lands well below the cost of a single senior analyst.

**What to check before signing:**

- **Is it actually 24/7 with humans**, or is it automated alerting overnight with human review the next morning? Ask directly, and ask for the shift roster structure
- **Where is the analyst team located**, and what languages do they operate in?
- **What is the response SLA by severity**, and what is the remedy if it is missed?
- **Do they perform containment**, or only notify? A provider who emails you at 03:00 and waits is providing monitoring, not response
- **Whose licences?** Some providers require you to buy their stack; others operate in yours. The latter is better for you at renewal
- **Where does log data reside?** For Indian organisations, CERT-In requires 180-day retention within Indian jurisdiction
- **What happens on exit?** Do you keep the detection content and the historical data?

**The failure mode:** a provider that forwards raw alerts with no investigation. You now pay a retainer *and* do the triage. Ask to see a sample escalation from a real incident — redacted — during evaluation. The quality of that document tells you almost everything.

## Option 3: Hybrid — usually the right answer

One or two internal security people who own context, risk decisions and vendor management, with an external provider supplying 24/7 monitoring, detection engineering and surge capacity for incidents.

This works because the two halves need different things. Your internal person needs deep knowledge of your business, your systems and your people — knowledge that takes years to build and cannot be outsourced. The provider supplies scale, coverage across time zones, and exposure to attacks across many clients that a single organisation never sees.

**Realistic split:**

| Internal | External |
| --- | --- |
| Risk decisions and prioritisation | 24/7 monitoring and triage |
| Asset and business context | Detection engineering |
| Change management, remediation | Threat hunting |
| Vendor management | Incident response surge |
| Compliance ownership | Forensics capability |

## If your budget is genuinely constrained

Some organisations cannot afford any of the above this year. That is a legitimate position, and there is a sequence that materially reduces risk before any monitoring spend.

**Tier 0 — Free or near-free, do this month:**

- Enable MFA everywhere, with number matching. If you are on Microsoft 365 or Google Workspace, this is a configuration change
- Block legacy authentication protocols
- Enable and retain the audit logs you already pay for and are not collecting
- Deploy LAPS for unique local administrator passwords across Windows machines
- Disable LLMNR and NBT-NS by Group Policy
- Restrict local administrator rights on user workstations
- Patch internet-facing systems within a defined window, and know what they are

Every one of these closes an attack path we exploit routinely during testing. None require a purchase.

**Tier 1 — Modest spend, this quarter:**

- **EDR on every endpoint.** If you buy one security product, buy this. It provides both prevention and the telemetry any future monitoring depends on
- **Tested backups**, offline or immutable. Restore something, do not just check the job status
- **Email security** beyond the platform default
- **An annual penetration test** of your internet-facing systems

**Tier 2 — Monitoring, when you can fund it:**

- Managed detection and response on the telemetry you now have
- Detection engineering to tune to your environment
- An incident response retainer, which also secures your place in the queue when something happens

The order matters. Monitoring without EDR gives an analyst very little to work with. EDR without MFA means you are watching an attacker walk in through the front door.

## Questions to ask any provider

Beyond the commercial terms, five questions that reveal capability:

1. **"Walk me through your last severity-1 escalation."** Redacted, but real. You are listening for structure, evidence and decisiveness
2. **"What is your median time from alert to human triage?"** If they cannot answer with a number, they do not measure it
3. **"How do you decide what to detect?"** The answer should reference ATT&CK coverage and a detection engineering process, not "our platform includes 5,000 rules"
4. **"What percentage of alerts do you close without escalating?"** A very low number means they are forwarding noise. A very high number without explanation warrants asking what they are missing
5. **"What would you do first in our environment?"** A good provider will identify a gap during evaluation and tell you about it, including when the fix does not involve buying anything from them

## The realistic target for a mid-sized Indian business

Within twelve months, achievable on an SME budget:

- MFA and legacy authentication blocked, estate-wide
- EDR deployed and reporting to a monitored platform
- 24/7 detection and response through a provider, with defined SLAs
- Tested, offline backups
- An annual penetration test with remediation completed
- An incident response retainer in place
- 180-day log retention meeting CERT-In requirements

That is not an enterprise security programme. It is enough to make your organisation a materially harder target than the ones around it, which is most of what you can practically buy.

Our [managed SOC](/services/managed-soc) is built specifically for this segment — India-resident log retention, transparent SLAs, and pricing designed around SME budgets rather than enterprise minimums. [Talk to us](/contact) about what your environment would actually cost to monitor.
