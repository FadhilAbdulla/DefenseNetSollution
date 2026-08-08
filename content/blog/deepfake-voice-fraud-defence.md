---
title: "Deepfake Voice Fraud: When the CFO on the Call Is Not the CFO"
description: "Synthetic voice and video are now cheap enough for routine fraud. How these attacks are executed against Indian businesses, and the process controls that defeat them."
date: "2025-08-13"
category: "AI & Security"
tags: ["Deepfake", "Social Engineering", "Fraud", "AI"]
---

The technology to clone a voice convincingly from a few seconds of audio is freely available and requires no expertise. The technology to generate a live video call with a synthetic face is not much further behind.

For fraud, this changes one specific thing: verification methods that depend on recognising a person are no longer reliable. That has direct consequences for how payments get authorised.

## How the attack actually runs

The pattern is consistent across the cases we have seen and the ones publicly reported.

**Source material is trivially available.** A conference talk, a podcast appearance, a webinar recording, a video on the company website, a voice note in a WhatsApp group. Executives are public figures within their industry; their voices are on the internet.

**Reconnaissance comes first.** The attacker learns the reporting structure, who authorises payments, current projects, and — critically — when the executive is travelling or otherwise hard to reach for verification. LinkedIn provides most of this.

**The call is urgent and confidential.** A time-sensitive acquisition, a regulatory matter, a payment that must be made before end of day. Confidentiality is stressed, which conveniently prevents the victim from consulting colleagues.

**Authority plus urgency plus secrecy.** The three levers together are the actual attack. The synthetic voice just makes the pretext credible.

**Escalation to video.** In the more sophisticated cases, a video call follows, sometimes with several synthetic participants. Reported incidents include finance staff joining calls where every other participant was generated.

## Why detection technology is the wrong answer

There is a growing market for deepfake detection tools. They are not a control you can rely on for this problem, for three reasons:

**Generation improves faster than detection.** Detection tools train on the artefacts of current generation methods. Those artefacts disappear with each model generation.

**The decision point is human and immediate.** A finance manager on a call at 16:45 does not have a detection tool in the loop. By the time an analysis could run, the decision has been made.

**Call quality masks artefacts.** Compression, poor connections and background noise — the normal conditions of a phone call — hide precisely the imperfections detection relies on.

Detection tooling has a role in retrospective analysis and in high-volume contexts like customer onboarding. It is not the control that protects your payment process.

## The control that actually works

**Verification through a separate, pre-established channel, mandatory for defined actions, with no exceptions for seniority or urgency.**

Concretely:

- Any payment above a threshold, and any change to bank details, requires callback verification to a number held in your records — never a number provided during the request
- Verification is performed by someone other than the person who received the request
- The requester's seniority does not waive the requirement
- Urgency does not waive the requirement
- The person performing verification cannot be overruled by the person being verified

The last two points are the entire control. Attackers manufacture urgency and invoke authority precisely because those pressures cause people to skip steps. A control that bends under those pressures provides no protection at exactly the moment it is needed.

Make it an organisational rule, not an individual judgement. A finance clerk must be able to say "our policy requires me to call you back on your recorded number" to a person who appears to be the managing director, and face no consequence for it.

## Supporting controls

**Challenge phrases.** A pre-agreed word or question, established in person, known to a small group. Simple, effective, and free. Rotate periodically.

**Dual authorisation.** Payments above a threshold require two named approvers using separate systems. A deepfake can deceive one person on one channel; deceiving two people through two systems is materially harder.

**Payment delays.** A mandatory holding period for new payees or changed bank details. Twenty-four hours removes the urgency the attack depends on, and costs almost nothing operationally.

**Channel discipline.** Payment instructions arrive only through defined systems. Not WhatsApp, not a phone call, not an email. If a request arrives on an unapproved channel, the answer is "please submit this through the system," regardless of who is asking.

**Reduce your executive attack surface.** You cannot remove executives from public life, but you can limit unnecessary long-form audio and video, and be aware that every public appearance is training data.

## Train for the scenario, not the technology

Traditional security awareness training focuses on spotting fake things — bad grammar, wrong domain, suspicious links. That framing fails here, because there is nothing to spot. The voice is correct. The face is correct. The context is correct.

Effective training for this threat teaches:

- **The process is the control.** You are not expected to detect a deepfake. You are expected to follow the verification procedure
- **Urgency is the signal.** Legitimate business almost never requires bypassing a control. Pressure to skip verification is itself the red flag
- **Confidentiality requests are a red flag.** "Do not discuss this with anyone" is far more often fraud than legitimate business
- **You will be supported.** Staff must know, concretely, that following the procedure with a senior executive will not damage their standing

Run the scenario in a tabletop with your finance team. Present it as a call from the CEO, with everything correct, and see where the process breaks. The gaps found in that exercise are the ones an attacker will find.

## If it happens

1. **Contact the bank immediately** and request a recall. Speed is the primary determinant of recovery
2. **Report to the National Cyber Crime Reporting Portal** and your local cybercrime cell
3. **Preserve everything** — call logs, recordings if any, the email or message chain, the account details provided
4. **Check for a wider compromise.** These attacks are often preceded by mailbox access used for reconnaissance. Assume email compromise until you have ruled it out
5. **Notify your insurer**, within the policy window
6. **Review the process gap**, not the individual. If the process allowed a single person under pressure to move money, the process was the failure

## The broader point

Deepfakes do not introduce a new class of attack. They remove one of the verification methods we relied on without ever formalising it — recognising a familiar voice.

The organisations that handle this well are the ones whose payment controls never depended on recognition in the first place. If your process requires a human to correctly identify who is speaking, it was always fragile. It is now simply broken.

Our [security consulting practice](/services/compliance-consulting) runs finance-focused fraud resilience reviews and tabletop exercises covering exactly this scenario. [Get in touch](/contact) if you want to know where your payment process would break.
