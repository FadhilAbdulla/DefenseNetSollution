---
title: "Measuring Detection Coverage With MITRE ATT&CK (Properly)"
description: "How to build an honest ATT&CK coverage map — why technique counts mislead, how to weight by relevance, and how to validate detections actually fire using atomic testing."
date: "2026-05-27"
category: "Security Operations"
tags: ["MITRE ATT&CK", "Detection Engineering", "SIEM", "Purple Team"]
---

Ask most security teams how good their detection is and you will get an anecdote. Ask for a number and you will usually get a percentage from a vendor dashboard that means very little.

MITRE ATT&CK gives you a way to answer the question honestly. It also gives you an easy way to answer it dishonestly, which is why most coverage maps are green in places they should not be.

## The problem with counting techniques

ATT&CK Enterprise currently describes hundreds of techniques and sub-techniques. The naive metric is: how many do we detect, divided by the total.

This produces a number that is both easy to inflate and largely meaningless:

- **Not all techniques are relevant to you.** If you run no macOS and no containers, techniques specific to them should not sit in your denominator.
- **Not all techniques are equally likely.** T1566 (Phishing) and T1195.003 (Compromise Hardware Supply Chain) are not comparable probabilities for a mid-market Indian business.
- **"Detected" is not binary.** A rule that catches one of eleven sub-techniques, in one log source, with 40% reliability, is not coverage of that technique.

A coverage map that shows 78% green while your organisation is trivially compromisable by a phishing email with a signed installer is worse than no map, because it creates confidence that is not earned.

## Build a relevance-weighted map instead

Four steps produce something you can defend in front of a board.

### Step 1: Scope the denominator to your estate

Filter the matrix to platforms you actually run — Windows, Linux, Azure AD/Entra ID, AWS, containers, network devices, SaaS. Everything else is noise for your purposes. This typically removes 30–40% of the matrix immediately and makes the remainder tractable.

### Step 2: Weight by threat relevance

Not every remaining technique deserves equal effort. Weight using three inputs:

- **Sector threat intelligence.** What are groups actually targeting organisations like yours doing? For Indian financial services, that is a different list from Gulf logistics or Kerala healthcare.
- **Your own incident history.** Techniques you have already seen deserve a permanent high weighting.
- **Prevalence data.** Public reporting on the techniques most commonly observed across all intrusions. The top twenty techniques account for a disproportionate share of real incidents.

The output is a tiered list: critical, important, monitor, out of scope.

### Step 3: Score detection maturity honestly

Replace binary "detected" with a scale. We use five levels:

| Level | Meaning |
| --- | --- |
| 0 | No telemetry — the data does not exist |
| 1 | Telemetry exists, no detection |
| 2 | Detection exists, untested or noisy |
| 3 | Detection tested, tuned, low false-positive rate |
| 4 | Detection tested, plus an automated response action |

A technique sitting at level 1 is a data problem. At level 2 it is an engineering problem. The distinction matters, because they consume different budgets and different people.

Most environments that believe they are at level 3 across the board are at level 1 or 2 for a significant fraction of techniques. Which brings us to the important part.

### Step 4: Validate by testing

A detection that has never fired in anger is a hypothesis, not a control.

Atomic testing — executing a controlled, benign version of a technique and confirming the alert appears — is the only way to turn the map from assertion into fact. Open-source atomic test libraries provide safe implementations for a large portion of the matrix.

Run tests in a controlled window with the SOC informed (or, for a more useful result, deliberately uninformed), and record for each test:

- Did telemetry capture the activity?
- Did a detection fire?
- How long until it appeared in the queue?
- Was it triaged correctly?

That last question is the one that embarrasses mature teams. Detections frequently fire and are then closed as benign by an analyst who did not recognise the significance. That is a training and documentation gap, and it is invisible unless you test end to end.

## What good coverage actually looks like

For a typical mid-market environment, realistic targets after a focused engineering programme:

- **Credential access, execution and persistence:** level 3 on the critical-weighted techniques. These are where you have the best signal and the highest payoff.
- **Initial access:** partial. Detecting phishing delivery reliably is genuinely hard; detecting what happens *after* the click is not. Weight your effort accordingly.
- **Discovery:** often deprioritised, and that is a mistake. Discovery commands are noisy for attackers and cheap for you to detect. `net group "Domain Admins" /domain` from a workstation is an excellent, low-false-positive signal.
- **Exfiltration:** hardest, because the distinction between exfiltration and normal business data movement is contextual. Focus on volume anomalies from unusual accounts rather than trying to inspect content.

The single most useful thing a coverage exercise produces is not the percentage. It is the list of techniques at level 0 — where you have no telemetry at all. Those are your blind spots, and they are usually fixable by turning on logging you already own.

## Common telemetry gaps worth fixing first

In nearly every assessment we run, the same gaps appear:

- **PowerShell script block logging** disabled, making a large class of execution invisible
- **Process command line auditing** off, so you can see `powershell.exe` ran but not what it ran
- **DNS query logging** absent, removing a high-value channel for detecting command-and-control
- **Cloud audit logs** enabled but not forwarded to the SIEM
- **Authentication logs from SaaS applications** entirely absent

None of these require a purchase. All of them materially change what is detectable.

## Making it a living artefact

A coverage map produced once and filed is a consulting deliverable, not a control. To keep it useful:

- Tag every detection rule with the technique IDs it covers, in the rule metadata
- Regenerate the map from the rule repository, automatically
- Re-run atomic tests quarterly, and after any platform migration
- Add every technique observed in a real incident to the critical tier permanently

Done this way, the map becomes the roadmap for the detection engineering backlog, and the artefact you show an auditor or a board when asked, "how do we know our monitoring works?"

Our [SIEM and detection engineering practice](/services/siem-engineering) builds and maintains exactly this — mapped, version-controlled detections with quarterly validation. If you would like a baseline assessment of where your current coverage sits, [that is where we would start](/contact).
