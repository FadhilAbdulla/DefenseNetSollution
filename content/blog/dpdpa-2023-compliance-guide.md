---
title: "DPDPA 2023: What Indian Businesses Actually Have to Do"
description: "A practical guide to India's Digital Personal Data Protection Act — consent architecture, data principal rights, breach notification, and the technical controls that make compliance provable."
date: "2026-06-24"
category: "Compliance"
tags: ["DPDPA", "India", "Data Protection", "Privacy"]
featured: true
---

India's Digital Personal Data Protection Act, 2023 is the first comprehensive personal data law the country has had. It is shorter than the GDPR, more prescriptive in places, and considerably less forgiving about consent.

Most compliance content on the subject is written by lawyers for lawyers. This is written for the people who have to build the systems.

## Who it applies to

The Act applies to processing of digital personal data within India, and to processing outside India where it relates to offering goods or services to data principals in India. If you hold customer records, employee records or user accounts, you are in scope.

Two roles matter:

- **Data Fiduciary** — the entity that determines the purpose and means of processing. This is you.
- **Data Processor** — an entity processing on your behalf. Your cloud provider, your payroll vendor, your CRM.

Some organisations will be designated **Significant Data Fiduciaries** based on volume and sensitivity of data, and carry additional obligations: a Data Protection Officer based in India, independent data auditors, and periodic Data Protection Impact Assessments.

## The consent problem

This is where most implementations fail, because the Act's consent standard is stricter than what typical Indian websites and apps do today.

Consent must be **free, specific, informed, unconditional and unambiguous, with a clear affirmative action**. In practice:

- **No pre-ticked boxes.** A checkbox that arrives already selected is not affirmative action.
- **No bundling.** You cannot require consent to marketing as a condition of providing a service that does not need it.
- **Purpose-specific.** "We may use your data to improve our services" is not a specified purpose. Each purpose needs its own consent, and users must be able to withdraw one without withdrawing all.
- **Withdrawal must be as easy as giving.** If consent took one tap, withdrawal cannot require an email to support and a seven-day wait.
- **Notice in the user's language.** The Act requires the notice to be available in English and the languages listed in the Eighth Schedule of the Constitution.

The engineering consequence is that consent cannot be a boolean column on the user table. You need a consent record store: purpose, timestamp, version of the notice presented, mechanism of collection, and withdrawal state. Auditors will ask you to produce the exact notice a specific user saw on a specific date.

## Data principal rights you must build for

Four rights require operational capability, not just policy text:

**Right to access.** Provide a summary of personal data being processed, the processing activities, and the identities of other fiduciaries with whom data has been shared. Build the export before you are asked for it.

**Right to correction and erasure.** Correction, completion, updating and erasure — including erasure when consent is withdrawn and retention is no longer necessary. This is harder than it looks in systems with backups, data warehouses and downstream analytics copies. Map where personal data flows before you promise erasure.

**Right to grievance redressal.** A named, reachable mechanism with a defined response time, exhausted before a data principal approaches the Data Protection Board.

**Right to nominate.** A data principal can nominate another individual to exercise their rights in the event of death or incapacity. This is a genuinely novel provision and needs a field in your identity model.

## Breach notification

The obligation is to notify both the Data Protection Board and each affected data principal in the event of a personal data breach. The Act does not provide a materiality threshold — the safe assumption is that notification applies broadly.

This sits alongside, not instead of, the **CERT-In directions of 2022**, which require reporting of specified cyber incidents within six hours of noticing them. In a real incident you are running two notification clocks simultaneously, with different recipients and different content requirements.

Practical implication: your incident response plan needs a data-impact assessment workstream running in parallel with technical containment from the first hour. Retrofitting "which personal data was affected" a week later does not meet either timeline.

## Security safeguards

The Act requires "reasonable security safeguards" to prevent breach, without enumerating them. That vagueness is not a licence — it means the standard you will be measured against is what a competent organisation in your sector would have done.

In practice, expect scrutiny of:

- **Encryption** of personal data at rest and in transit
- **Access control** — least privilege, with periodic recertification of who can see what
- **Logging and monitoring** sufficient to detect and reconstruct unauthorised access
- **Retention limits** actually enforced, not just documented
- **Processor contracts** binding your vendors to equivalent obligations
- **Deletion on purpose completion**, including from backups within a defined cycle

The retention obligation deserves emphasis. The Act requires erasure when the purpose is no longer served, and Indian organisations habitually retain everything indefinitely. A retention schedule that exists in a policy but is not enforced by a scheduled job is a finding waiting to happen.

## Penalties

The Board can impose penalties up to **₹250 crore** for failure to take reasonable security safeguards to prevent a personal data breach, and up to **₹200 crore** for failure to notify. These are per-instance ceilings, not caps on total exposure across findings.

That structure matters strategically: the largest single penalty in the Act attaches to security failure, not to paperwork failure. Investment in detection, access control and encryption is the highest-leverage compliance spend available.

## A workable implementation sequence

**Months 0–2 — Discovery.** Map every system holding personal data, what fields, from whom, for what purpose, shared with whom, retained how long. This is tedious and non-negotiable; every subsequent step depends on it.

**Months 2–4 — Consent architecture.** Build the consent record store, rewrite notices per purpose, implement granular withdrawal, and translate notices.

**Months 4–6 — Rights fulfilment.** Build access export, correction workflow, erasure workflow (including downstream propagation), nomination field, and grievance mechanism with SLAs.

**Months 5–7 — Security uplift.** Close the gaps found in discovery: encryption, access recertification, logging, retention enforcement jobs.

**Months 6–8 — Third parties.** Update processor agreements, assess vendor security, document cross-border transfer positions.

**Ongoing — Evidence.** Every control needs an artefact that proves it operated. Compliance is not the state of your systems; it is your ability to demonstrate the state of your systems.

## The overlap dividend

If you already hold ISO 27001 or are pursuing SOC 2, a substantial portion of the security safeguard work is done. Map DPDPA requirements onto your existing control set rather than building a parallel programme — one control, one piece of evidence, several frameworks satisfied.

Our [compliance and vCISO practice](/services/compliance-consulting) builds exactly that unified control matrix, covering DPDPA alongside ISO 27001, SOC 2 and PCI-DSS. If you are starting from zero, the discovery phase is where we would begin.
