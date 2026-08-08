---
title: "RBI Cybersecurity Framework: What Banks and NBFCs Must Demonstrate"
description: "Baseline controls, the SOC requirement, incident reporting timelines and IT governance expectations under RBI cybersecurity guidance — and how supervisory inspections actually test them."
date: "2025-07-16"
category: "Compliance"
tags: ["RBI", "Banking", "NBFC", "Financial Services"]
---

Financial institutions in India operate under the most prescriptive cybersecurity supervision of any sector. The Reserve Bank's cybersecurity framework, its IT governance and outsourcing directions, and the master directions applicable to each entity class together define a set of expectations that inspections test directly.

This is a practitioner's summary of what those expectations mean operationally.

## The structure of the obligation

Rather than a single document, banks and NBFCs are governed by a stack: the cybersecurity framework for banks, the master direction on IT governance, risk and controls, outsourcing of IT services directions, and entity-specific master directions scaled by size and classification.

The common thread across all of them is the same expectation: **security must be governed at board level, controls must be documented and operating, and the institution must be able to evidence both.**

Three characteristics distinguish RBI supervision from general compliance work:

- **Board accountability is explicit.** The board or a designated committee must review cybersecurity posture regularly, and the minutes are examined.
- **Controls are prescribed rather than risk-selected.** Unlike ISO 27001, where you justify control selection through risk assessment, baseline controls are expected regardless.
- **Inspections test operation, not documentation.** A policy without evidence of operation is a finding.

## Baseline controls that inspections consistently test

### Inventory and classification

A current inventory of information assets, business applications and their criticality, with owners identified. This underpins everything else, and gaps here cascade into every other finding.

### Network security and segmentation

Segregation between the corporate network, the data centre, the card and payment environment, and any internet-facing zone. Documented, diagrammed, and — critically — tested. A network diagram that does not match the running configuration is a common and serious finding.

### Access control

- Role-based access with documented approval
- Periodic recertification of access, evidenced with sign-off
- Privileged access managed through a PAM solution, with session recording
- Segregation of duties enforced, particularly in payment and transaction processing
- Removal of access on exit, evidenced against HR records

The exit process is tested by sampling. Institutions are routinely found with active accounts belonging to people who left months earlier.

### Security operations centre

Continuous monitoring is expected, with capability to detect and respond around the clock. Whether it is in-house, outsourced, or hybrid is your choice — but the capability must exist, must be staffed, and must be demonstrable.

Where the SOC is outsourced, the outsourcing directions apply: due diligence on the provider, a written agreement covering security and data location, the right to audit, and — importantly — the institution remains accountable. "Our provider handles that" is not an answer to an inspector.

### Vulnerability management and testing

- Periodic vulnerability assessments across the estate
- Penetration testing of internet-facing and critical applications, at defined intervals and after significant change
- Documented remediation with timelines by severity
- Evidence that remediation actually occurred, and retesting

### Patch management

Defined timelines by severity, with an exception process for what cannot be patched, and compensating controls documented for each exception.

### Incident response

A documented plan, tested, with defined roles. Incident reporting to the RBI within the timelines specified for your entity class — which are typically shorter than the CERT-In six-hour window — and to CERT-In in parallel.

Institutions consistently underestimate that these are separate obligations with separate recipients.

### Business continuity and disaster recovery

- Documented BCP and DR plans with defined recovery time and recovery point objectives
- Regular DR drills with evidence, including actual failover rather than tabletop only
- A near-site or far-site DR arrangement appropriate to the criticality of the service

DR drill evidence is examined closely. A drill report describing a successful failover, with no corresponding system logs, does not survive scrutiny.

### Data protection

Encryption in transit and at rest for customer data, key management with documented procedures, and data localisation compliance where applicable — payment system data must be stored in India under the relevant RBI direction.

### Third-party and outsourcing risk

Due diligence before engagement, written agreements with security clauses, ongoing monitoring, right to audit, and defined exit provisions. For material outsourcing, board-approved policy and reporting.

### Customer awareness

Programmes to inform customers about phishing, fraud and safe practices, with evidence of delivery.

## The reporting obligations, mapped

During an incident, several clocks run simultaneously. Map them once, in advance:

| Recipient | Trigger | Timeline |
| --- | --- | --- |
| RBI | Cyber incident per applicable master direction | Per your entity class — typically hours |
| CERT-In | Specified cyber incident | 6 hours of noticing |
| Data Protection Board | Personal data breach (DPDPA) | As specified |
| Affected customers | Where their data or funds are affected | Per direction and contract |
| Card networks | Where card data is involved | Per network rules |

Each has different content requirements. Pre-draft the templates.

## What inspections actually find

The recurring findings, in rough order of frequency:

1. **Access recertification not performed, or performed without evidence.** The review happened in a meeting; nobody signed anything.
2. **Privileged access outside PAM.** Break-glass accounts, service accounts and vendor accounts bypassing the controlled path.
3. **Vulnerability remediation overdue** beyond the institution's own stated timelines, with no documented exception.
4. **DR drills not conducted, or conducted as tabletop only** when actual failover was required.
5. **Outsourcing agreements missing required clauses** — audit rights, incident notification, data location.
6. **Board reporting irregular** or lacking substantive content.
7. **Log retention insufficient** or logs not centrally collected.
8. **Network diagrams out of date** relative to actual configuration.

Note how many of these are evidence failures rather than control failures. The control frequently exists; the proof does not.

## Building the evidence engine

The institutions that come through inspections well have made one structural decision: evidence generation is automated and continuous, not assembled before an inspection.

Practically:

- Access recertification runs on a schedule from the identity platform, with digital sign-off recorded
- Vulnerability data flows into a tracked backlog with SLA measurement, reportable at any moment
- Patch compliance is reported from the management platform, not from a spreadsheet
- DR drill results are captured with system evidence attached
- Board reporting draws from the same underlying metrics rather than being written from scratch each quarter

This turns inspection preparation from a two-month scramble into a document export, and it has a second benefit: the metrics are real, so management is governing on facts.

## The overlap with other frameworks

RBI baseline controls map substantially onto ISO 27001:2022 Annex A and onto PCI-DSS where card data is involved. Institutions running these as separate programmes duplicate effort every year.

Build a single control matrix mapped to RBI requirements, ISO 27001, PCI-DSS and DPDPA. One control, one piece of evidence, several obligations satisfied.

Our [compliance and vCISO practice](/services/compliance-consulting) supports banks and NBFCs on exactly this — unified control matrices, evidence automation and inspection readiness — alongside a [managed SOC](/services/managed-soc) built to meet the continuous monitoring and India-resident retention expectations. [Get in touch](/contact) if an inspection is approaching.
