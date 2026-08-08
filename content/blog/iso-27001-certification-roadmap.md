---
title: "ISO 27001:2022 Certification: A Realistic Month-by-Month Roadmap"
description: "What ISO 27001 certification actually takes — scoping, risk assessment, the 93 Annex A controls, internal audit and the two-stage external audit — with honest timelines and costs."
date: "2026-03-04"
category: "Compliance"
tags: ["ISO 27001", "Certification", "ISMS", "Audit"]
---

ISO 27001 certification is increasingly a condition of doing business — demanded by enterprise customers, tender processes and international partners. It is also frequently mis-sold as either trivially easy or impossibly onerous.

For a first-time certification in a mid-sized organisation, plan on four to seven months of committed effort. Here is what those months contain.

## What ISO 27001 actually requires

Two distinct things, and organisations routinely underestimate the first:

**Clauses 4–10** define the Information Security Management System — the governance machinery. Context, leadership commitment, planning, support, operation, evaluation and improvement. This is mandatory and non-negotiable.

**Annex A** lists 93 controls across four themes (organisational, people, physical, technological) in the 2022 revision, reorganised from the 114 controls of the 2013 version. You select controls based on your risk assessment and justify exclusions in a Statement of Applicability.

Auditors fail organisations on Clause 4–10 problems far more often than on missing technical controls. A company with excellent security and no management review record will not certify. A company with modest security, honestly assessed and properly governed, will.

## Month 1: Scope and gap assessment

**Define the scope.** Which parts of the organisation, which locations, which systems, which services. This is the most consequential decision in the project.

Scope too broadly and you are certifying systems that do not need it, at considerable extra cost. Scope too narrowly and your customers will notice that the certificate does not cover the service they buy — which defeats the purpose.

For most SaaS and services businesses, the right scope is the production service and the corporate functions that support it.

**Run a gap assessment** against Clauses 4–10 and Annex A. The output is a control-by-control status list with effort estimates. Expect to find that you already satisfy a third of the controls, partially satisfy a third, and have not addressed a third.

## Month 2: Risk assessment and treatment

This is the engine of the whole standard. Every control decision must trace back to it.

- **Build an asset and process inventory** for the defined scope.
- **Identify risks** — threat and vulnerability pairs against those assets, with realistic scenarios.
- **Assess** likelihood and impact using a documented, repeatable methodology. The methodology matters more to an auditor than the specific scores.
- **Decide treatment** — mitigate, transfer, avoid or accept. Accepted risks need documented sign-off from someone with the authority to accept them.
- **Produce the Statement of Applicability** mapping each of the 93 Annex A controls to applicable/not applicable, with justification.

The most common failure here is a risk register that was clearly written to justify controls already in place. Auditors recognise it immediately.

## Months 2–4: Documentation

The mandatory documented information includes: ISMS scope, information security policy, risk assessment and treatment methodology, Statement of Applicability, risk treatment plan, security objectives, evidence of competence, operational planning records, monitoring and measurement results, internal audit programme and results, and management review results.

Plus the supporting policies your Statement of Applicability commits you to: access control, cryptography, supplier security, incident management, business continuity, secure development, and so on.

**The trap:** downloading a template pack and changing the company name. Templates describe an organisation that does not exist, and the auditor tests whether the documents describe what actually happens. A short policy that is accurate beats a comprehensive one that is fiction.

## Months 3–5: Control implementation

The technical and operational work. What this involves depends entirely on your gap assessment, but the controls that most commonly need building from scratch:

- **A.5.7 Threat intelligence** — new in the 2022 revision, and frequently missed
- **A.8.16 Monitoring activities** — you need actual security monitoring, not just logging
- **A.8.23 Web filtering** — new in 2022
- **A.8.28 Secure coding** — a documented practice, not an aspiration
- **A.5.23 Cloud services security** — new in 2022, and substantial for cloud-native organisations
- **A.8.9 Configuration management** — baselines that are defined and enforced
- **A.5.30 ICT readiness for business continuity** — tested, with evidence

Note how many of these are 2022 additions. Organisations transitioning from the 2013 version consistently underestimate this.

## Month 5: Operate and collect evidence

Certification requires evidence that the ISMS has been *operating*, not merely that it exists. Auditors typically want to see at least three months of records.

That means: access reviews performed, incidents logged and closed, changes approved, supplier assessments completed, training delivered and recorded, backups tested.

This is the phase that cannot be compressed. Starting evidence collection in month five and booking the audit for month six does not work.

## Month 6: Internal audit and management review

**Internal audit** must cover the entire ISMS and be conducted by someone independent of the area being audited. For small organisations this usually means an external consultant — but not the one who built your ISMS, as that is a conflict the certification body will question.

Findings are expected. An internal audit that finds nothing is evidence that the audit was inadequate, and auditors treat it that way.

**Management review** is a formal meeting with defined inputs: audit results, feedback, nonconformities, risk assessment status, objectives progress, opportunities for improvement. Minute it properly. This record is examined in every external audit.

## Months 6–7: External certification audit

**Stage 1** is a documentation review, usually one to two days. The auditor confirms your ISMS is designed correctly and you are ready for Stage 2. Findings here are normal and are expected to be closed before Stage 2.

**Stage 2** is the implementation audit — typically three to five days for a mid-sized organisation. The auditor samples evidence, interviews staff, and tests whether the ISMS operates as documented.

Findings are classified as **major** (a systemic failure, must be closed before certification) or **minor** (an isolated lapse, closed with a corrective action plan). Most first-time certifications collect a handful of minors, which is normal and not a cause for alarm.

The certificate is valid for three years, with surveillance audits annually and full recertification at year three.

## Costs to budget

Beyond internal effort, budget for:

- **Certification body fees** — Stage 1, Stage 2, and annual surveillance
- **Consulting support**, if used
- **Internal audit**, if outsourced
- **Tooling gaps** identified during the gap assessment
- **Penetration testing**, commonly expected as evidence for technical controls

The largest cost is almost always internal time, and it is the one most consistently left out of business cases.

## Making it worth more than the certificate

Two decisions materially increase the return:

**Map to multiple frameworks from the start.** SOC 2, PCI-DSS and DPDPA share substantial control overlap with ISO 27001. Building a single mapped control matrix means one piece of evidence satisfies several auditors. Retrofitting this later costs far more.

**Automate evidence collection.** Access reviews, configuration baselines and vulnerability data can be produced continuously rather than assembled in a panic before each audit. This is the difference between an ISMS that improves security and one that consumes a month of everyone's year.

Our [compliance practice](/services/compliance-consulting) runs ISO 27001 programmes end to end, including the unified control matrix approach. If you are being asked for a certificate by a customer and need to know what it will realistically take, [start with a gap assessment](/contact).
