---
title: "CERT-In Directions Explained: The Six-Hour Reporting Rule"
description: "What the CERT-In 2022 directions require from Indian organisations — reportable incident types, the six-hour clock, 180-day log retention, and how to actually operationalise them."
date: "2026-06-10"
category: "Compliance"
tags: ["CERT-In", "India", "Incident Reporting", "Log Retention"]
---

The CERT-In directions issued in April 2022 under Section 70B(6) of the Information Technology Act changed incident reporting for every organisation operating in India. Four years on, most organisations still discover the requirements during an incident rather than before one.

Here is what they actually oblige you to do.

## The six-hour clock

**Specified cyber incidents must be reported to CERT-In within six hours of noticing them or being brought to notice about them.**

Two words carry the weight. "Noticing" — not confirming, not investigating, not concluding. The clock starts when your team becomes aware of something that appears to be a reportable incident. And "brought to notice" — a customer email, a researcher disclosure, or a vendor alert starts the same clock.

Six hours is short. It is not enough time to complete an investigation, and the directions do not expect you to. The report is an initial notification; details follow. Organisations that wait until they understand the incident before notifying are the ones that breach the requirement.

## What must be reported

The directions list twenty categories. The ones that come up most often in practice:

- Targeted scanning or probing of critical networks and systems
- Compromise of critical systems or information
- Unauthorised access to IT systems or data
- Defacement of a website, or intrusion into a website
- Malicious code attacks — ransomware, malware infection, spyware
- Attacks on servers such as database, mail and DNS, and network devices
- Identity theft, spoofing and phishing attacks
- Denial of Service and Distributed Denial of Service attacks
- Attacks on critical infrastructure, SCADA, operational technology and wireless networks
- Data breach and data leak
- Attacks on IoT devices and associated systems
- Attacks on applications such as e-governance and e-commerce
- Fake mobile applications
- Unauthorised access to social media accounts

The breadth is deliberate. A phishing campaign against your staff is reportable. So is a website defacement. So, arguably, is targeted scanning of a critical system.

## The other obligations

Reporting gets the attention, but three further requirements have larger day-to-day engineering consequences.

### Clock synchronisation

All servers and network devices must synchronise to the Network Time Protocol servers of the National Informatics Centre or the National Physical Laboratory, or to NTP servers traceable to them.

This sounds trivial. It is not, in an estate that has grown organically — devices pointing at `pool.ntp.org`, cloud instances using provider time sources, and appliances with drifted clocks. During an incident, unsynchronised timestamps across systems make correlation genuinely difficult and can make evidence unusable.

### 180-day log retention, in India

Logs of all ICT systems must be maintained securely **for a rolling period of 180 days** and **within Indian jurisdiction**.

Two implications:

1. **Cost.** Retaining 180 days of logs across a full estate is expensive if everything sits in hot SIEM storage. The answer is tiering: recent data hot and searchable, older data in cheaper object storage that meets the retention requirement.
2. **Location.** If your SIEM ingests to a region outside India, this is a compliance problem. Check where your log data physically resides — not where your vendor is headquartered.

### Five-year KYC and transaction retention

Data centres, VPS providers, cloud service providers and VPN service providers must register and retain subscriber and customer records for five years after cancellation. Virtual asset service providers carry equivalent obligations. Most organisations are not in these categories, but if you resell hosting or run a VPN service, you are.

## What to include in the report

CERT-In publishes a reporting format. In practice, prepare to supply:

- Time of occurrence and time of detection
- Description of the incident and the affected systems
- IP addresses, domains and indicators involved
- Impact assessment — systems affected, data affected, services disrupted
- Actions taken so far
- Contact details of the reporting person

Reports go to `incident@cert-in.org.in`, or via the CERT-In portal. Sector regulators — the RBI for banks and NBFCs, SEBI for market entities, IRDAI for insurers — have their own parallel reporting obligations with different timelines. A bank experiencing a ransomware incident may be reporting to CERT-In within six hours, the RBI within two to six hours depending on the circular, and affected data principals under the DPDPA.

Those are three separate obligations. They are not satisfied by one email.

## How to operationalise this

The six-hour requirement fails organisations in predictable ways: nobody was sure whether the event qualified, nobody knew who was authorised to file, and the person who did know was asleep.

Four things fix it:

**1. Pre-decide what qualifies.** Write a one-page classification guide mapping your alert types to the CERT-In categories. When an alert fires at 02:00, the on-call analyst should not be interpreting a legal instrument.

**2. Name the filer and a deputy.** One person accountable, one backup, both reachable out of hours, both with the credentials and the template ready.

**3. Pre-draft the report.** Have the format filled in with everything that does not change — organisation details, contacts, sector — so an incident only requires the incident-specific fields.

**4. Default to reporting.** The cost of an unnecessary report is a few hours of work. The cost of a missed one is a statutory violation. When the classification is genuinely ambiguous, report.

Under Section 70B(7) of the IT Act, non-compliance can attract imprisonment up to one year or a fine up to one lakh rupees, or both. The reputational and regulatory consequences of a demonstrated failure to report typically exceed the statutory penalty.

## Where this intersects with your SOC

If you run a managed SOC — internally or with a provider — the six-hour clock should be an explicit term of the service. Ask your provider directly:

- Do you notify us within a timeframe that leaves us able to meet six hours?
- Do you supply the incident detail in a format that maps to the CERT-In report?
- Is our log data retained for 180 days, within India?

If the answer to any of those is unclear, that gap surfaces during your worst week, not a quiet one.

Our [managed SOC service](/services/managed-soc) is built with these timelines as a design constraint, including India-resident log retention and a pre-formatted incident notification pack. If you want a review of your current reporting readiness, [get in touch](/contact).
