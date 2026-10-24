/**
 * Single source of truth for site-wide content: identity, contact details,
 * navigation, services, products, industries and social proof.
 * Pages and SEO helpers all read from here so nothing drifts out of sync.
 */

export const site = {
  name: "DefenseNet Solutions",
  shortName: "DefenseNet",
  legalName: "DefenseNet Solutions",
  // Apex is the canonical host — Vercel 301s www → apex, so canonicals,
  // sitemap entries and JSON-LD @ids must resolve here without a redirect.
  url: "https://defensenetsolutions.com",
  tagline: "AI-Based Security",
  description:
    "DefenseNet Solutions is an AI-based cybersecurity company in Kerala, India. 24/7 managed SOC, security analysts, VAPT, database, cloud and identity security, incident response and compliance for businesses across India, the UAE and the GCC.",
  founded: "2021",
  locale: "en_IN",

  contact: {
    email: "nizam@defensenetsolutions.com",
    phone: "+91 86603 71224",
    phoneHref: "+918660371224",
    whatsapp: "918660371224",
    whatsappMessage:
      "Hi DefenseNet Solutions, I'd like to talk about cybersecurity for my business.",
    address: {
      line1: "Phase 2, 2nd Floor, HiLITE Business Park",
      line2: "Poovangal, Pantheeramkavu, Kozhikode",
      region: "Kerala",
      postalCode: "673014",
      country: "India",
      countryCode: "IN",
      locality: "Kozhikode",
    },
    hours: [
      { label: "SOC monitoring", value: "24/7 — every day of the year" },
      { label: "Consultations (Mon–Fri)", value: "9:00 AM – 7:00 PM IST" },
      { label: "Consultations (Saturday)", value: "9:00 AM – 2:00 PM IST" },
    ],
    geo: { lat: 11.2350, lng: 75.8380 },
  },

  social: {
    linkedin: "https://www.linkedin.com/company/defensenet-solutions",
    x: "https://x.com/defensenetsol",
  },

  verification: {
    google: "MS6Wv7Yswzqxl8TMAAzntx5m65SxQ82eBjt6oqq6v6M",
    facebookDomain: "7spmlg9we5m4o1t2e36a2d3tp2kfh9",
  },
} as const;

export const fullAddress = [
  site.contact.address.line1,
  site.contact.address.line2,
  `${site.contact.address.region} — ${site.contact.address.postalCode}`,
  site.contact.address.country,
].join(", ");

export const whatsappLink = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;

/* ------------------------------------------------------------------ */
/* Metrics                                                             */
/* ------------------------------------------------------------------ */

export const metrics = [
  { value: "100+", label: "Clients protected", detail: "India & the Gulf" },
  { value: "500+", label: "Incidents resolved", detail: "Since 2021" },
  { value: "< 2 min", label: "Median triage time", detail: "AI-assisted SOC" },
  { value: "24/7/365", label: "SOC coverage", detail: "Guaranteed SLAs" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

/** Practice areas — groups the service catalogue in navigation and on /services. */
export const serviceGroups = [
  {
    id: "detect-respond",
    label: "Detect & Respond",
    description: "24/7 monitoring, endpoint defence, analysts and incident response.",
  },
  {
    id: "offensive-exposure",
    label: "Offensive & Exposure",
    description: "Find and fix what an attacker would use first.",
  },
  {
    id: "infrastructure-data",
    label: "Infrastructure & Data",
    description: "Cloud, databases, networks, identity and industrial systems.",
  },
  {
    id: "governance-people",
    label: "Governance & People",
    description: "Compliance, risk, leadership and human-layer defence.",
  },
] as const;

export type ServiceGroupId = (typeof serviceGroups)[number]["id"];

export type Service = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  summary: string;
  icon: string;
  accent: "cyan" | "violet" | "emerald" | "amber" | "rose";
  group: ServiceGroupId;
  /** One line for menus — what the service is, in a few words. */
  tagline: string;
  outcomes: string[];
  /** Engagement lifecycle, rendered as the visual phase diagram. */
  phases: { name: string; duration: string; body: string }[];
  capabilities: { title: string; body: string }[];
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "managed-soc",
    name: "Managed SOC & Detection Response",
    short: "Managed SOC",
    eyebrow: "SOC-as-a-Service",
    icon: "radar",
    accent: "cyan",
    group: "detect-respond",
    tagline: "AI-triaged detection & response, 24/7",
    summary:
      "A 24/7 security operations centre where machine learning does the first pass on every alert and certified analysts do the thinking. You get investigated incidents, not raw noise.",
    outcomes: [
      "Median triage under 2 minutes, around the clock",
      "Up to 90% of low-value alerts closed automatically before a human sees them",
      "One accountable team for detection, investigation and containment",
    ],
    phases: [
      {
        name: "Scope",
        duration: "Week 1",
        body: "Telemetry inventory, asset criticality tiers, escalation contacts and containment authority agreed in writing.",
      },
      {
        name: "Onboard",
        duration: "Week 1–2",
        body: "Log sources connected and normalised. Baseline detections deployed. Your estate starts streaming to the SOC.",
      },
      {
        name: "Tune",
        duration: "Week 3–4",
        body: "False positives eliminated, behavioural baselines established, playbooks rehearsed against your change process.",
      },
      {
        name: "Operate",
        duration: "Ongoing",
        body: "24/7 monitoring with named analysts, monthly detection engineering and quarterly ATT&CK coverage review.",
      },
    ],
    capabilities: [
      {
        title: "AI-assisted alert triage",
        body: "Every alert is enriched with asset criticality, identity context, threat intelligence and historical behaviour, then scored. Analysts start at the conclusion, not at the log line.",
      },
      {
        title: "Behavioural analytics (UEBA)",
        body: "We baseline how each user, service account and host normally behaves, then surface the deviations that signature-based tooling never catches — impossible travel, first-time admin usage, unusual data egress.",
      },
      {
        title: "Threat hunting sprints",
        body: "Scheduled hypothesis-driven hunts against your telemetry, mapped to MITRE ATT&CK, looking for the techniques your detections do not yet cover.",
      },
      {
        title: "Guided containment",
        body: "Isolate a host, disable a token, block an egress path — executed by us under a pre-agreed playbook, or handed to your team with exact steps.",
      },
    ],
    deliverables: [
      "Named analyst team and escalation matrix",
      "Detection coverage map against MITRE ATT&CK",
      "Monthly detection engineering review",
      "Executive and technical reporting packs",
    ],
    stack: ["Microsoft Sentinel", "Splunk", "Wazuh", "Elastic", "CrowdStrike", "Defender XDR"],
    faqs: [
      {
        q: "Do we need to replace our existing tooling?",
        a: "No. We operate on the telemetry you already have — EDR, firewall, identity provider, cloud audit logs. Where a gap materially hurts detection coverage, we tell you what it costs to close it and let you decide.",
      },
      {
        q: "How fast can onboarding happen?",
        a: "A typical mid-sized environment is streaming telemetry within 5–10 working days, with tuned detections and agreed playbooks by the end of week four.",
      },
      {
        q: "What happens at 3 AM?",
        a: "The same thing that happens at 3 PM. Our SOC is staffed continuously, and severity-1 incidents follow a documented call-out path to your named contacts.",
      },
    ],
  },
  {
    slug: "vapt-penetration-testing",
    name: "VAPT & Red Team Operations",
    short: "VAPT & Red Teaming",
    eyebrow: "Offensive Security",
    icon: "crosshair",
    accent: "rose",
    group: "offensive-exposure",
    tagline: "Adversary-grade offensive testing",
    summary:
      "Adversary-grade testing of your networks, applications, APIs and cloud estate — manual exploitation backed by automated coverage, and reports your engineers can actually act on.",
    outcomes: [
      "Validated, exploitable findings — not a scanner dump",
      "Proof-of-concept evidence for every critical and high",
      "Free retest of remediated findings within the engagement window",
    ],
    phases: [
      {
        name: "Scope",
        duration: "Week 0",
        body: "Targets, rules of engagement, testing windows and stop conditions agreed and authorised in writing.",
      },
      {
        name: "Recon",
        duration: "Day 1–2",
        body: "Attack surface mapping, technology fingerprinting and identification of the paths worth spending manual effort on.",
      },
      {
        name: "Exploit",
        duration: "Day 3–10",
        body: "Manual exploitation and chaining. Business logic abuse, privilege escalation and lateral movement to prove real impact.",
      },
      {
        name: "Report",
        duration: "Week 3",
        body: "Executive summary, evidenced findings, prioritised remediation plan — walked through with your engineers.",
      },
      {
        name: "Retest",
        duration: "Post-fix",
        body: "Remediated findings re-tested and an attestation letter issued for auditors and customers.",
      },
    ],
    capabilities: [
      {
        title: "Web, mobile & API testing",
        body: "OWASP Top 10 and ASVS-aligned testing, plus business-logic abuse that automated tools structurally cannot find — privilege confusion, broken object-level authorisation, workflow bypass.",
      },
      {
        title: "Network & infrastructure",
        body: "External perimeter and internal segmentation testing: exposed services, credential reuse, lateral movement paths, Active Directory attack chains.",
      },
      {
        title: "Cloud configuration review",
        body: "Attacker's-eye assessment of AWS, Azure and GCP — over-permissive roles, public storage, metadata service abuse, CI/CD supply-chain footholds.",
      },
      {
        title: "Red team & assumed breach",
        body: "Goal-oriented, stealth-aware operations that test detection and response, not just prevention. Purple team debriefs turn every finding into a new detection rule.",
      },
    ],
    deliverables: [
      "Executive summary with business-risk framing",
      "Technical findings with CVSS, evidence and reproduction steps",
      "Prioritised remediation plan with effort estimates",
      "Retest report and attestation letter",
    ],
    stack: ["Burp Suite Pro", "Nuclei", "BloodHound", "Metasploit", "Cobalt Strike", "Custom tooling"],
    faqs: [
      {
        q: "Black box, grey box or white box?",
        a: "Grey box gives the best coverage per rupee for most clients — we get credentials and architecture context so testing time goes into depth instead of reconnaissance. We scope black box where the goal is specifically to test the perimeter.",
      },
      {
        q: "Will testing disrupt production?",
        a: "We agree rules of engagement, testing windows and a stop condition before we start. Destructive and denial-of-service techniques are excluded unless you explicitly request them in a non-production environment.",
      },
      {
        q: "Do you provide a certificate for compliance?",
        a: "Yes. After remediation and retest we issue an attestation letter suitable for ISO 27001, PCI-DSS, SOC 2 and customer security questionnaires.",
      },
    ],
  },
  {
    slug: "incident-response",
    name: "Incident Response & Digital Forensics",
    short: "Incident Response",
    eyebrow: "DFIR",
    icon: "shield-alert",
    accent: "amber",
    group: "detect-respond",
    tagline: "Containment, forensics, recovery",
    summary:
      "When something is already inside, minutes decide the cost. We mobilise immediately to contain the threat, preserve evidence, find the root cause and get you operating again.",
    outcomes: [
      "Containment actions underway within the first hour of engagement",
      "Forensically sound evidence handling for legal and insurance needs",
      "Root-cause report that closes the door permanently, not temporarily",
    ],
    phases: [
      {
        name: "Mobilise",
        duration: "Hour 0–1",
        body: "Bridge opened, evidence preservation instructions issued, isolation begun without destroying forensic artefacts.",
      },
      {
        name: "Contain",
        duration: "Hour 1–6",
        body: "Attacker access cut off in a sequenced order, credentials rotated, persistence removed, egress blocked.",
      },
      {
        name: "Investigate",
        duration: "Day 1–5",
        body: "Memory and disk forensics, timeline reconstruction, initial access vector and data-impact assessment.",
      },
      {
        name: "Recover",
        duration: "Day 3–14",
        body: "Staged restoration onto clean infrastructure, identity layer rebuilt first, monitoring in place before reconnection.",
      },
      {
        name: "Harden",
        duration: "Week 3+",
        body: "Root-cause report, control gaps closed with named owners, and new detections deployed for every technique observed.",
      },
    ],
    capabilities: [
      {
        title: "Emergency containment",
        body: "Host isolation, credential revocation, egress blocking and persistence removal — sequenced so the attacker does not detect the response and burn what is left.",
      },
      {
        title: "Ransomware response",
        body: "Encryption scope assessment, backup viability testing, exfiltration verification, negotiation risk advice and staged recovery. We tell you honestly what data actually left.",
      },
      {
        title: "Digital forensics",
        body: "Disk and memory imaging, timeline reconstruction, malware triage and log correlation to establish initial access, dwell time and blast radius.",
      },
      {
        title: "Post-incident hardening",
        body: "Every engagement ends with the specific control and detection changes that would have stopped it — implemented, not just recommended.",
      },
    ],
    deliverables: [
      "Hour-by-hour incident timeline",
      "Root cause and initial access vector analysis",
      "Data-impact assessment for regulatory notification",
      "Hardening roadmap with owners and deadlines",
    ],
    stack: ["Velociraptor", "KAPE", "Volatility", "Autopsy", "YARA", "Timesketch"],
    faqs: [
      {
        q: "We think we are being attacked right now. What do we do?",
        a: "Call +91 86603 71224. Do not wipe or rebuild machines — that destroys the evidence needed to understand scope. Keep systems powered on and isolate them from the network if you safely can.",
      },
      {
        q: "Do you work with our cyber insurer?",
        a: "Yes. We document to a standard that insurers and legal counsel accept, and we can coordinate directly with your broker's panel process.",
      },
      {
        q: "Can you help with regulatory notification?",
        a: "We provide the technical facts you need for CERT-In reporting timelines and DPDPA obligations. Your legal counsel owns the filing; we make sure it is based on accurate findings.",
      },
    ],
  },
  {
    slug: "cloud-security",
    name: "Cloud Security & Posture Management",
    short: "Cloud Security",
    eyebrow: "CSPM / CNAPP",
    icon: "cloud",
    accent: "violet",
    group: "infrastructure-data",
    tagline: "CSPM, IAM and workload hardening",
    summary:
      "Continuous assessment and hardening of AWS, Azure and GCP — identity, configuration, workloads and data — with drift caught in minutes instead of at audit time.",
    outcomes: [
      "Every public exposure and over-permissive role inventoried and ranked",
      "Guardrails that block misconfiguration at deploy time, not after",
      "Audit-ready compliance evidence generated continuously",
    ],
    phases: [
      {
        name: "Discover",
        duration: "Week 1",
        body: "Read-only access across every account and subscription. Full inventory of resources, identities and data stores.",
      },
      {
        name: "Assess",
        duration: "Week 2",
        body: "Configuration reviewed against CIS Benchmarks, effective IAM permissions analysed, exploitable paths identified.",
      },
      {
        name: "Prioritise",
        duration: "Week 3",
        body: "Findings ranked by reachability and blast radius, not raw severity, and assigned to named owners with SLAs.",
      },
      {
        name: "Guardrail",
        duration: "Week 4+",
        body: "Policy-as-code in CI so the same misconfiguration cannot return, plus continuous drift monitoring.",
      },
    ],
    capabilities: [
      {
        title: "Posture assessment & CSPM",
        body: "Full configuration review against CIS Benchmarks and provider best practice, then continuous monitoring so new drift is flagged as it happens.",
      },
      {
        title: "Identity and entitlement review",
        body: "Cloud breaches are identity breaches. We map effective permissions, find privilege escalation paths, and right-size roles without breaking your deployments.",
      },
      {
        title: "Workload & container security",
        body: "Image scanning, runtime policy, Kubernetes RBAC review and network policy design for EKS, AKS, GKE and self-managed clusters.",
      },
      {
        title: "Infrastructure-as-code guardrails",
        body: "Policy-as-code in your CI pipeline so insecure Terraform never reaches an account. Security shifts to the pull request, where fixes are cheap.",
      },
    ],
    deliverables: [
      "Prioritised cloud risk register",
      "Remediation runbooks per finding",
      "IaC policy pack integrated into CI",
      "Continuous compliance dashboard",
    ],
    stack: ["AWS Security Hub", "Azure Defender for Cloud", "GCP SCC", "Prowler", "Trivy", "OPA / Checkov"],
    faqs: [
      {
        q: "Multi-cloud or single provider?",
        a: "Both. Findings are normalised into one risk register so you are not reading three different vendor consoles and guessing which issue matters more.",
      },
      {
        q: "Will you break our deployments while tightening IAM?",
        a: "We derive least-privilege policies from actual access logs and stage them in audit mode first, so you see exactly what would have been denied before anything is enforced.",
      },
      {
        q: "Do you support Kubernetes?",
        a: "Yes — RBAC review, admission control policy, network policy, secrets handling and runtime detection integrated into the managed SOC.",
      },
    ],
  },
  {
    slug: "siem-engineering",
    name: "SIEM & Detection Engineering",
    short: "SIEM Engineering",
    eyebrow: "Detection Engineering",
    icon: "activity",
    accent: "emerald",
    group: "detect-respond",
    tagline: "Detection pipelines that actually fire",
    summary:
      "Log pipelines that are complete, affordable and actually tuned. We design, deploy and continuously improve detection content so your SIEM produces signal rather than storage bills.",
    outcomes: [
      "Detection coverage measured against MITRE ATT&CK, not guessed at",
      "Ingest cost reduced by routing low-value telemetry to cheap tiers",
      "False positive rate driven down every single month",
    ],
    phases: [
      {
        name: "Audit",
        duration: "Week 1",
        body: "Measure what is ingested, what detections actually reference, and what analysts genuinely search. Cost mapped per source.",
      },
      {
        name: "Design",
        duration: "Week 2",
        body: "Normalised schema, tiered storage plan and an ATT&CK coverage target agreed against your real threat profile.",
      },
      {
        name: "Build",
        duration: "Week 3–6",
        body: "Detection content written as version-controlled code, peer reviewed and validated with atomic tests before release.",
      },
      {
        name: "Improve",
        duration: "Ongoing",
        body: "Monthly tuning cycles, quarterly coverage validation, and continuous reduction of ingest cost without losing signal.",
      },
    ],
    capabilities: [
      {
        title: "Log source onboarding",
        body: "Identity, endpoint, network, SaaS and cloud audit logs normalised into a consistent schema — so a detection written once works everywhere.",
      },
      {
        title: "Detection content development",
        body: "Custom rules, correlation logic and ML-based anomaly models written for your environment, version-controlled and tested like software.",
      },
      {
        title: "Tuning & noise reduction",
        body: "Systematic false-positive elimination with documented suppression logic, so nobody quietly mutes an alert that mattered.",
      },
      {
        title: "SOAR automation",
        body: "Enrichment, containment and ticketing automated end-to-end. Repeatable analyst work becomes a playbook that runs in seconds.",
      },
    ],
    deliverables: [
      "Log source inventory and gap analysis",
      "Version-controlled detection rule repository",
      "ATT&CK coverage heat map",
      "Automation playbooks and runbooks",
    ],
    stack: ["Microsoft Sentinel", "Splunk ES", "Elastic Security", "Wazuh", "Sigma", "Cribl"],
    faqs: [
      {
        q: "Our SIEM cost is out of control. Can you help?",
        a: "Usually, yes. Most estates ingest large volumes of telemetry that never appear in a detection or an investigation. We measure what is actually used and re-route the rest to lower-cost tiers, typically cutting spend meaningfully without losing coverage.",
      },
      {
        q: "Can we keep our own SIEM licence?",
        a: "Absolutely. We are vendor-agnostic and happy to work inside your existing tenancy and contract.",
      },
      {
        q: "How do you prove detection coverage improved?",
        a: "Through an ATT&CK coverage map maintained per technique, plus atomic tests executed against your environment to confirm detections fire as designed.",
      },
    ],
  },
  {
    slug: "compliance-consulting",
    name: "Compliance, Risk & vCISO",
    short: "Compliance & vCISO",
    eyebrow: "Governance",
    icon: "scale",
    accent: "cyan",
    group: "governance-people",
    tagline: "ISO 27001, SOC 2, PCI-DSS, DPDPA",
    summary:
      "Framework adoption, risk assessment and audit readiness — ISO 27001, SOC 2, PCI-DSS, NIST CSF and India's DPDPA 2023 — led by practitioners who also run the controls.",
    outcomes: [
      "A single control set mapped to every framework you must satisfy",
      "Audit evidence collected continuously instead of in a panic",
      "Security decisions owned by an accountable, senior voice",
    ],
    phases: [
      {
        name: "Gap",
        duration: "Month 1",
        body: "Where you are against every framework that applies, quantified per control with realistic effort estimates.",
      },
      {
        name: "Risk",
        duration: "Month 2",
        body: "Asset and process inventory, documented risk methodology, treatment decisions and a Statement of Applicability.",
      },
      {
        name: "Implement",
        duration: "Month 2–5",
        body: "Policies written for how you actually operate, plus the technical controls your gap assessment identified.",
      },
      {
        name: "Evidence",
        duration: "Month 5–6",
        body: "Controls operating with records collected continuously, so audit preparation is an export rather than a scramble.",
      },
      {
        name: "Audit",
        duration: "Month 6–7",
        body: "Internal audit, management review, then Stage 1 and Stage 2 with us alongside you in the room.",
      },
    ],
    capabilities: [
      {
        title: "Gap assessment",
        body: "Where you are versus where the standard requires you to be, quantified, with a realistic remediation plan and effort estimates per control.",
      },
      {
        title: "Policy & documentation",
        body: "Policies, standards and procedures written for how your organisation actually operates — not templates that fail on the first evidence request.",
      },
      {
        title: "DPDPA 2023 readiness",
        body: "Data mapping, consent architecture, retention schedules, breach notification workflow and Data Principal rights handling under India's data protection law.",
      },
      {
        title: "Virtual CISO",
        body: "A fractional security leader for board reporting, vendor risk, security architecture decisions and customer security questionnaires.",
      },
    ],
    deliverables: [
      "Unified control matrix across frameworks",
      "Complete policy and procedure set",
      "Risk register with treatment plans",
      "Internal audit and management review packs",
    ],
    stack: ["ISO 27001:2022", "SOC 2 Type II", "PCI-DSS 4.0", "NIST CSF 2.0", "DPDPA 2023", "CERT-In directions"],
    faqs: [
      {
        q: "How long does ISO 27001 certification take?",
        a: "For a first-time certification, plan on four to seven months from kickoff to Stage 2 audit, depending on how much documentation and control evidence already exists.",
      },
      {
        q: "Can one control set cover several frameworks?",
        a: "Yes, and it should. We build a single mapped control matrix so one piece of evidence satisfies ISO, SOC 2 and PCI-DSS requirements simultaneously.",
      },
      {
        q: "What does a vCISO engagement look like?",
        a: "Typically a fixed number of days per month covering strategy, board and customer reporting, architecture review and vendor risk — scaling up during audits or incidents.",
      },
    ],
  },

  /* ---------------- Detect & Respond ---------------- */

  {
    slug: "managed-edr-xdr",
    name: "Managed EDR & XDR",
    short: "Managed EDR/XDR",
    eyebrow: "Endpoint Defence",
    icon: "laptop",
    accent: "rose",
    group: "detect-respond",
    tagline: "Endpoint detection, isolation and response",
    summary:
      "We deploy, tune and run endpoint detection and response across laptops, servers and cloud workloads, then act on what it finds — isolating hosts and stopping malicious processes in minutes, day or night.",
    outcomes: [
      "Every endpoint enrolled, healthy and reporting, with coverage gaps tracked to zero",
      "Malicious activity contained at the endpoint in minutes, around the clock",
      "Prevention policies tuned to your software, so protection stays switched on",
    ],
    phases: [
      {
        name: "Deploy",
        duration: "Week 1–2",
        body: "Staged sensor rollout, reconciled against your asset inventory so unmanaged machines surface immediately.",
      },
      {
        name: "Tune",
        duration: "Week 2–4",
        body: "Exclusions reviewed one by one and prevention policies moved from audit to block in controlled stages.",
      },
      {
        name: "Operate",
        duration: "Ongoing",
        body: "24/7 alert response, host isolation under pre-agreed playbooks, threat hunting and sensor health monitoring.",
      },
      {
        name: "Review",
        duration: "Monthly",
        body: "Coverage, detections, containment times and policy drift reviewed with your team, with changes agreed in writing.",
      },
    ],
    capabilities: [
      {
        title: "Rollout and coverage management",
        body: "Sensors deployed across Windows, macOS and Linux, with daily reconciliation against your asset inventory. A machine without a healthy sensor is treated as an open finding, not a footnote.",
      },
      {
        title: "24/7 response and isolation",
        body: "When the EDR fires at 3 AM, an analyst investigates and acts — network-isolating the host, killing the process tree, quarantining the file — then hands you a written account of what happened.",
      },
      {
        title: "Ransomware prevention",
        body: "Behavioural blocking, tamper protection and credential-theft controls configured and tested, so the techniques ransomware operators rely on are stopped before encryption starts.",
      },
      {
        title: "XDR correlation",
        body: "Endpoint telemetry joined with identity, email and cloud signals, so a phishing click, a suspicious sign-in and an unusual process are investigated as one incident rather than three tickets.",
      },
    ],
    deliverables: [
      "Coverage report reconciled against your asset inventory",
      "Policy baseline and documented exclusion register",
      "Incident report for every containment action",
      "Monthly threat and response summary",
    ],
    stack: [
      "CrowdStrike Falcon",
      "Microsoft Defender for Endpoint",
      "SentinelOne",
      "Sophos Intercept X",
      "Trend Vision One",
      "Wazuh",
    ],
    faqs: [
      {
        q: "Which EDR product should we buy?",
        a: "We are vendor-agnostic and recommend on fit and total cost. If you already hold Microsoft 365 E5 or Defender licences, you may own a capable EDR today and only need it configured and operated properly.",
      },
      {
        q: "Will you isolate machines without asking us?",
        a: "Only within a playbook you approve in advance. Typically user laptops can be isolated immediately on high-confidence detections, while business-critical servers require a call to your named contact first.",
      },
      {
        q: "Do you cover Linux servers and Macs?",
        a: "Yes. Coverage includes Windows, macOS and the major Linux distributions, plus cloud workloads where the EDR platform supports them.",
      },
    ],
  },

  {
    slug: "security-analyst-services",
    name: "Security Analyst as a Service",
    short: "Security Analysts",
    eyebrow: "Staff Augmentation",
    icon: "user-search",
    accent: "cyan",
    group: "detect-respond",
    tagline: "Certified analysts embedded in your team",
    summary:
      "Certified SOC analysts, threat hunters and incident handlers who work inside your tools and processes — dedicated or shared, on-site or remote — so you get experienced security people without a long hiring cycle.",
    outcomes: [
      "Analysts working in your environment within weeks, not hiring quarters",
      "L1 to L3 coverage matched to the shifts and skills you actually need",
      "Continuity covered — leave, attrition and upskilling are our responsibility",
    ],
    phases: [
      {
        name: "Define",
        duration: "Week 1",
        body: "Roles, seniority, shift pattern, tooling and escalation boundaries agreed and written down.",
      },
      {
        name: "Match",
        duration: "Week 1–2",
        body: "Analysts selected against your stack and sector. Your team can interview them before they start.",
      },
      {
        name: "Onboard",
        duration: "Week 2–3",
        body: "Access provisioned, runbooks reviewed, and supervised shadowing on your live alert queues.",
      },
      {
        name: "Deliver",
        duration: "Ongoing",
        body: "Monthly performance review covering queue handling, escalation quality and detection improvements.",
      },
    ],
    capabilities: [
      {
        title: "L1–L3 SOC analysts",
        body: "Triage, investigation and escalation inside your SIEM and ticketing system, following your runbooks — and improving them as gaps show up.",
      },
      {
        title: "Threat hunters and detection engineers",
        body: "Senior specialists who hunt for what your detections miss and turn every finding into a new, tested rule.",
      },
      {
        title: "Incident handlers on call",
        body: "Experienced responders available to step in during a live incident, backed by our full incident response team if it escalates.",
      },
      {
        title: "Embedded security engineers",
        body: "EDR and SIEM administration, vulnerability triage and security tooling work — the hands-on engineering that internal teams rarely have time for.",
      },
    ],
    deliverables: [
      "Named analysts with documented certifications",
      "Shift roster and coverage plan",
      "Monthly KPI and quality report",
      "Runbook updates and knowledge transfer",
    ],
    stack: ["Microsoft Sentinel", "Splunk", "CrowdStrike Falcon", "Defender XDR", "ServiceNow", "Jira"],
    faqs: [
      {
        q: "Are the analysts your employees?",
        a: "Yes. Every analyst is employed by DefenseNet, background-checked and bound by confidentiality terms. Training, supervision and replacement are our responsibility, not yours.",
      },
      {
        q: "Can we hire an analyst permanently later?",
        a: "Yes. Conversion terms are agreed at the start of the engagement, so there are no surprises if an analyst becomes a natural fit for a permanent role.",
      },
      {
        q: "Is there a minimum engagement length?",
        a: "We usually recommend at least three months so the onboarding effort pays off. Short-term surge cover is available for incidents, audits and migrations.",
      },
    ],
  },

  {
    slug: "soc-build-modernisation",
    name: "SOC Build & Modernisation",
    short: "SOC Build",
    eyebrow: "SOC Consulting",
    icon: "server-cog",
    accent: "emerald",
    group: "detect-respond",
    tagline: "Design or upgrade your own SOC",
    summary:
      "Design, build or modernise your own security operations centre — operating model, tooling, detections, playbooks and people — with a hybrid option where we cover nights and weekends while your team runs days.",
    outcomes: [
      "A documented SOC operating model with roles, processes and metrics that your team owns",
      "Tooling selected for fit and total cost of ownership, not vendor margin",
      "Maturity measured against SOC-CMM before and after, so progress is provable",
    ],
    phases: [
      {
        name: "Assess",
        duration: "Week 1–3",
        body: "SOC-CMM maturity assessment of people, process, technology and services, plus interviews with analysts and stakeholders.",
      },
      {
        name: "Design",
        duration: "Week 3–6",
        body: "Target operating model, tiering, shift pattern, tooling architecture and the metrics the SOC will be judged on.",
      },
      {
        name: "Build",
        duration: "Month 2–4",
        body: "Platform deployment, use-case library, playbooks, SOAR automation and case management.",
      },
      {
        name: "Transition",
        duration: "Month 4–6",
        body: "Team training, tabletop exercises and a staged handover — optionally with us running overflow and out-of-hours shifts.",
      },
      {
        name: "Optimise",
        duration: "Quarterly",
        body: "Maturity re-assessed, coverage gaps closed and the roadmap adjusted against what the SOC is actually seeing.",
      },
    ],
    capabilities: [
      {
        title: "SOC maturity assessment",
        body: "An evidence-based view of where your SOC stands today, scored with SOC-CMM across business, people, process, technology and services domains.",
      },
      {
        title: "Operating model and staffing design",
        body: "Tiers, shift patterns, escalation paths and hiring profiles. Staffing a single seat around the clock takes roughly five people once leave, training and attrition are counted — we plan for that honestly.",
      },
      {
        title: "Use-case and playbook library",
        body: "Detection use cases mapped to MITRE ATT&CK and your threat profile, each paired with a response playbook your analysts can follow at 3 AM.",
      },
      {
        title: "Hybrid and co-managed SOC",
        body: "Your team runs business hours; we run nights, weekends and overflow on the same platform, with a clean handover at every shift change.",
      },
    ],
    deliverables: [
      "SOC-CMM maturity report with scored domains",
      "Target operating model and RACI",
      "Use-case library mapped to MITRE ATT&CK",
      "Playbooks, runbooks and training materials",
    ],
    stack: ["SOC-CMM", "MITRE ATT&CK", "Microsoft Sentinel", "Splunk", "TheHive", "Shuffle / Tines"],
    faqs: [
      {
        q: "Should we build our own SOC or outsource it?",
        a: "It depends on scale, regulation and budget, and we will tell you honestly. Many organisations land on a hybrid: an internal team that knows the business, with an external partner covering out-of-hours and specialist depth.",
      },
      {
        q: "Can you work with the SIEM we already have?",
        a: "Yes. Most modernisation projects start by getting more out of the existing platform. We only recommend a migration when the numbers clearly justify it.",
      },
      {
        q: "How long does a SOC build take?",
        a: "A typical build from assessment to an operating team takes four to six months. A focused modernisation of an existing SOC is often shorter.",
      },
    ],
  },

  {
    slug: "threat-intelligence",
    name: "Threat Intelligence & Dark Web Monitoring",
    short: "Threat Intelligence",
    eyebrow: "Cyber Threat Intelligence",
    icon: "telescope",
    accent: "amber",
    group: "detect-respond",
    tagline: "Leaked credentials, brand abuse, exploited CVEs",
    summary:
      "Intelligence about the threats aimed at your organisation specifically — leaked credentials, impersonating domains, dark web chatter and actively exploited vulnerabilities — delivered as actions, not reading material.",
    outcomes: [
      "Leaked credentials and exposed data found and acted on before they are used",
      "Lookalike domains and brand impersonation reported for takedown quickly",
      "Patching priorities driven by what attackers are actually exploiting",
    ],
    phases: [
      {
        name: "Profile",
        duration: "Week 1",
        body: "Intelligence requirements agreed: domains, brands, executives, key suppliers and the threats specific to your sector.",
      },
      {
        name: "Collect",
        duration: "Week 2",
        body: "Monitoring switched on across dark web markets, paste sites, code repositories, certificate transparency logs and threat feeds.",
      },
      {
        name: "Analyse",
        duration: "Ongoing",
        body: "Every hit validated by an analyst for relevance and accuracy before it reaches you. No raw feed dumps.",
      },
      {
        name: "Act",
        duration: "Ongoing",
        body: "Credential resets, indicator blocks pushed to your controls, takedown requests and written advisories.",
      },
    ],
    capabilities: [
      {
        title: "Dark web and credential monitoring",
        body: "Employee and customer credentials, session cookies from infostealer logs and leaked documents surfaced from criminal markets and breach dumps — with a reset or containment action attached.",
      },
      {
        title: "Brand and domain protection",
        body: "Lookalike domains, fake social profiles and phishing kits impersonating you are detected early and reported to registrars, hosts and platforms for takedown.",
      },
      {
        title: "Vulnerability intelligence",
        body: "We track exploitation in the wild — CISA's Known Exploited Vulnerabilities catalogue, public exploit releases and attacker chatter — and tell you which of your exposed systems are affected.",
      },
      {
        title: "Threat actor and sector briefings",
        body: "Plain-English briefings on the groups targeting your sector and region, what they use, and which of your controls would or would not stop them.",
      },
    ],
    deliverables: [
      "Intelligence requirements document",
      "Validated alerts with a recommended action",
      "Monthly threat landscape briefing",
      "Takedown and remediation log",
    ],
    stack: ["MISP", "OpenCTI", "CISA KEV", "Certificate Transparency", "VirusTotal", "STIX / TAXII"],
    faqs: [
      {
        q: "Is this just a threat feed?",
        a: "No. Feeds are an input. What you receive is analyst-validated intelligence about your organisation, each item with a specific recommended action and an owner.",
      },
      {
        q: "Can you take down phishing sites impersonating us?",
        a: "We prepare the evidence and file takedown requests with registrars, hosting providers and platforms. Most malicious sites are removed within days, though timelines depend on the provider and we never promise a fixed outcome.",
      },
      {
        q: "How does this connect to our SOC?",
        a: "Validated indicators are pushed into your SIEM, EDR and firewalls automatically, and intelligence context is attached to related alerts so analysts see it during triage.",
      },
    ],
  },

  /* ---------------- Offensive & Exposure ---------------- */

  {
    slug: "vulnerability-management",
    name: "Vulnerability Management as a Service",
    short: "Vulnerability Management",
    eyebrow: "Exposure Management",
    icon: "scan-search",
    accent: "cyan",
    group: "offensive-exposure",
    tagline: "Continuous scanning, risk-ranked patching",
    summary:
      "Continuous scanning, risk-based prioritisation and remediation tracking across servers, endpoints, cloud and applications — so the CVEs that are actually exploitable get fixed first, and you can prove it.",
    outcomes: [
      "Complete asset coverage, reconciled against your inventory every cycle",
      "Fix lists ranked by real-world exploitation and exposure, not CVSS alone",
      "Remediation SLAs tracked to closure, with owners and verification evidence",
    ],
    phases: [
      {
        name: "Inventory",
        duration: "Week 1",
        body: "Assets discovered and reconciled across on-premises, cloud and remote endpoints, with business criticality assigned.",
      },
      {
        name: "Scan",
        duration: "Week 1–2",
        body: "Authenticated scanning of internal, external, cloud and container estates on an agreed schedule.",
      },
      {
        name: "Prioritise",
        duration: "Week 2",
        body: "Findings ranked using CISA KEV, EPSS, exploit availability, internet exposure and asset criticality.",
      },
      {
        name: "Remediate",
        duration: "Ongoing",
        body: "Tickets raised with owners and deadlines, fixes verified by rescan, and exceptions documented with compensating controls.",
      },
    ],
    capabilities: [
      {
        title: "Authenticated scanning",
        body: "Credentialed scans see missing patches and insecure configuration that unauthenticated scans structurally miss — across servers, workstations, network devices, cloud and containers.",
      },
      {
        title: "Risk-based prioritisation",
        body: "A CVSS 9.8 on an isolated test box matters less than a 7.5 on an internet-facing VPN that is being exploited today. We rank by exploitation evidence, exposure and asset value.",
      },
      {
        title: "Remediation orchestration",
        body: "Findings routed to the right team in Jira, ServiceNow or Azure DevOps, grouped into patchable units, with SLA tracking and verification scans — or applied by us under your change process.",
      },
      {
        title: "Emergency zero-day response",
        body: "When a Log4Shell-class vulnerability lands, we identify every affected asset within hours and publish mitigation guidance — see our CVE advisories in Resources.",
      },
    ],
    deliverables: [
      "Asset coverage and scan health report",
      "Prioritised remediation queue with owners",
      "SLA compliance dashboard",
      "Monthly executive risk summary",
    ],
    stack: ["Tenable", "Qualys", "Rapid7 InsightVM", "OpenVAS", "Defender Vulnerability Management", "EPSS / CISA KEV"],
    faqs: [
      {
        q: "How is this different from VAPT?",
        a: "VAPT is a point-in-time, manual deep dive that proves exploitability. Vulnerability management is continuous breadth — every asset, every cycle. Mature programmes run both: continuous scanning for coverage, periodic testing for depth.",
      },
      {
        q: "We already have thousands of findings. Where do we start?",
        a: "With anything on CISA's Known Exploited Vulnerabilities list that is reachable from the internet, then exploited issues on critical internal systems. That short list is usually a tiny fraction of the total and carries most of the real risk.",
      },
      {
        q: "Will you patch systems for us?",
        a: "We can. Some clients want us to apply patches under their change process; others want prioritised lists for their own teams. Both models include verification scans.",
      },
    ],
  },

  {
    slug: "application-security",
    name: "Application Security & DevSecOps",
    short: "AppSec & DevSecOps",
    eyebrow: "Secure SDLC",
    icon: "code",
    accent: "emerald",
    group: "offensive-exposure",
    tagline: "Secure code review and pipeline security",
    summary:
      "Security built into how you ship software — threat modelling, secure code review and automated SAST, DAST, dependency and secrets scanning in CI — so vulnerabilities are caught in the pull request, not in production.",
    outcomes: [
      "Security checks in every pipeline, tuned so developers trust the results",
      "Critical code and dependency issues blocked before they merge",
      "A secure development lifecycle that customers and auditors can verify",
    ],
    phases: [
      {
        name: "Assess",
        duration: "Week 1–2",
        body: "SDLC and pipeline review, with an OWASP SAMM maturity baseline and a ranked list of high-risk applications.",
      },
      {
        name: "Integrate",
        duration: "Week 2–5",
        body: "SAST, dependency, secrets, IaC and DAST scanning added to CI — tuned before any check is allowed to block a build.",
      },
      {
        name: "Review",
        duration: "Ongoing",
        body: "Manual secure code review and threat modelling for authentication, payments and other high-risk features.",
      },
      {
        name: "Enable",
        duration: "Ongoing",
        body: "Developer training built from your own findings, and a security champions network inside each team.",
      },
    ],
    capabilities: [
      {
        title: "Secure code review",
        body: "Manual review of the code paths that matter most — authentication, authorisation, payments, file handling — where automated tools produce the most noise and miss the most logic flaws.",
      },
      {
        title: "Threat modelling",
        body: "Structured design reviews for new features and architectures, so security decisions are made on the whiteboard rather than discovered in a penetration test.",
      },
      {
        title: "Pipeline security tooling",
        body: "SAST, software composition analysis, secrets detection, IaC scanning and DAST integrated into GitHub, GitLab or Azure DevOps, with policy-as-code deciding what blocks a merge.",
      },
      {
        title: "Software supply chain security",
        body: "SBOM generation, dependency pinning, build provenance and artefact signing — the controls that limit the damage from incidents like the XZ Utils backdoor.",
      },
    ],
    deliverables: [
      "OWASP SAMM maturity baseline and roadmap",
      "CI security pipeline and policy-as-code",
      "Threat models for critical features",
      "Developer training and champions programme",
    ],
    stack: ["Semgrep", "SonarQube", "Snyk", "OWASP ZAP", "Gitleaks", "Trivy / Syft"],
    faqs: [
      {
        q: "Will security checks slow our releases down?",
        a: "Not if they are tuned. We start in report-only mode, remove noisy rules, and only block merges on high-confidence, high-impact findings. Fast feedback in the pull request is cheaper than a late-stage security review.",
      },
      {
        q: "Do you test mobile applications too?",
        a: "Yes. Mobile code review and pipeline checks are covered here; hands-on mobile application penetration testing is delivered through our VAPT practice.",
      },
      {
        q: "Which languages and platforms do you support?",
        a: "All the mainstream ones — Java, C#/.NET, JavaScript and TypeScript, Python, Go, PHP, Kotlin and Swift — on GitHub, GitLab, Bitbucket and Azure DevOps.",
      },
    ],
  },

  /* ---------------- Infrastructure & Data ---------------- */

  {
    slug: "database-security",
    name: "Database Security & Management",
    short: "Database Security",
    eyebrow: "Data Protection & DBA",
    icon: "database",
    accent: "violet",
    group: "infrastructure-data",
    tagline: "Hardening, monitoring and managed DBA",
    summary:
      "Hardening, monitoring and day-to-day management of the databases that hold your most valuable data — Oracle, SQL Server, PostgreSQL, MySQL, MongoDB and cloud-managed engines — so access is governed, changes are audited and recovery is proven.",
    outcomes: [
      "Every privileged database account inventoried, justified and monitored",
      "Patching, backups and restore tests run on schedule — with evidence",
      "Sensitive data discovered, classified and encrypted at rest and in transit",
    ],
    phases: [
      {
        name: "Discover",
        duration: "Week 1",
        body: "Inventory of instances, versions, network exposure, accounts and sensitive tables — including shadow databases outside IT's view.",
      },
      {
        name: "Harden",
        duration: "Week 2–3",
        body: "CIS Benchmark configuration, default accounts removed, least-privilege roles, exposure closed and TLS enforced.",
      },
      {
        name: "Monitor",
        duration: "Week 3–4",
        body: "Database activity monitoring connected to the SOC: privileged queries, bulk exports and schema changes alert in real time.",
      },
      {
        name: "Operate",
        duration: "Ongoing",
        body: "Managed patching, backup verification, performance reviews and quarterly access recertification.",
      },
    ],
    capabilities: [
      {
        title: "Database activity monitoring",
        body: "Privileged sessions, bulk reads, after-hours access and schema changes captured and analysed in the SOC — so a compromised DBA account or an insider exporting a customer table is caught while it is happening.",
      },
      {
        title: "Access governance",
        body: "Shared and default accounts eliminated, application accounts scoped to exactly what they need, and privileged access brokered and recorded rather than handed out permanently.",
      },
      {
        title: "Encryption, masking and data discovery",
        body: "Personal and payment data located and classified, encrypted at rest and in transit, and masked in development and test copies so production data stops leaking into non-production.",
      },
      {
        title: "Managed DBA operations",
        body: "Patching, backup and restore testing, high availability and disaster recovery, performance tuning, and upgrades away from unsupported versions — operated by people who treat security as part of the job.",
      },
    ],
    deliverables: [
      "Database inventory and risk register",
      "Hardening baseline per engine with deviation report",
      "Access recertification evidence pack",
      "Backup and restore test records",
    ],
    stack: ["Oracle", "Microsoft SQL Server", "PostgreSQL", "MySQL / MariaDB", "MongoDB", "Amazon RDS / Azure SQL"],
    faqs: [
      {
        q: "Do you manage databases day to day, or only secure them?",
        a: "Both. We run managed DBA operations — patching, backups, restore testing, performance and upgrades — with security built into how we operate, rather than as a separate audit that happens once a year.",
      },
      {
        q: "Will activity monitoring slow our production databases?",
        a: "We choose the monitoring method per engine, using native auditing where it is efficient, and measure performance before and after in a staging environment. The overhead is agreed with you before anything touches production.",
      },
      {
        q: "Can you help with DPDPA and PCI-DSS requirements for databases?",
        a: "Yes. We locate personal and cardholder data, apply encryption and masking, and retain the access logs auditors ask for — producing the evidence that satisfies DPDPA 2023 and PCI-DSS 4.0 controls.",
      },
    ],
  },

  {
    slug: "network-security",
    name: "Network Security & Firewall Management",
    short: "Network Security",
    eyebrow: "Perimeter & Segmentation",
    icon: "network",
    accent: "amber",
    group: "infrastructure-data",
    tagline: "Managed firewalls, VPNs and segmentation",
    summary:
      "Managed firewalls, VPNs and network segmentation that are configured correctly, patched quickly and reviewed regularly — because exposed edge devices have become one of the most common ways attackers get in.",
    outcomes: [
      "Rule bases cleaned of shadowed, unused and over-permissive rules",
      "Edge devices patched against exploited CVEs within agreed SLAs",
      "Segmentation that stops one compromised host from reaching everything",
    ],
    phases: [
      {
        name: "Review",
        duration: "Week 1–2",
        body: "Rule base and configuration audit, management-plane exposure check and firmware review for every edge device.",
      },
      {
        name: "Remediate",
        duration: "Week 2–4",
        body: "Rule clean-up, hardening, management interfaces removed from the internet and logging forwarded to the SOC.",
      },
      {
        name: "Segment",
        duration: "Month 2–3",
        body: "Zone design and east-west controls that contain lateral movement, rolled out in monitored stages.",
      },
      {
        name: "Manage",
        duration: "Ongoing",
        body: "Change management, emergency patching for exploited vulnerabilities and quarterly rule reviews.",
      },
    ],
    capabilities: [
      {
        title: "Firewall audit and rule-base optimisation",
        body: "Every rule traced to a business owner and a reason. Shadowed, duplicate, unused and any-any rules removed, so the policy you think you have is the policy you actually enforce.",
      },
      {
        title: "Managed firewall and VPN operations",
        body: "Day-to-day administration of firewalls and remote access, with changes peer-reviewed, logged and reversible.",
      },
      {
        title: "Segmentation and Zero Trust access",
        body: "Network zones and ZTNA that replace flat networks and broad VPN access with per-application access tied to identity and device health.",
      },
      {
        title: "Edge device patching",
        body: "VPN gateways and firewalls are prime targets — FortiOS, PAN-OS, Citrix NetScaler and Cisco IOS XE flaws have all been mass-exploited. We track and patch them against emergency SLAs.",
      },
    ],
    deliverables: [
      "Rule-base audit report with clean-up plan",
      "Hardening baseline per device",
      "Segmentation architecture and rollout plan",
      "Change and patch log",
    ],
    stack: ["Fortinet FortiGate", "Palo Alto Networks", "Cisco", "Check Point", "Sophos", "OPNsense / pfSense"],
    faqs: [
      {
        q: "Do we need to replace our firewalls?",
        a: "Almost never as a first step. Most risk comes from configuration, exposure and patch level rather than the brand of the box. We fix those first and only recommend replacement for end-of-life hardware.",
      },
      {
        q: "How quickly do you patch edge devices?",
        a: "Vulnerabilities that are being actively exploited on internet-facing devices are handled as emergencies, with mitigations applied the same day where a patch is not yet available. Exact SLAs are agreed in the contract.",
      },
      {
        q: "Do you support SD-WAN and multi-site networks?",
        a: "Yes, including branch networks, SD-WAN overlays and hybrid connectivity into AWS, Azure and GCP.",
      },
    ],
  },

  {
    slug: "identity-access-management",
    name: "Identity & Access Security",
    short: "Identity & Access",
    eyebrow: "IAM / PAM",
    icon: "fingerprint",
    accent: "violet",
    group: "infrastructure-data",
    tagline: "MFA, privileged access and AD hardening",
    summary:
      "Most breaches now start with a stolen login. We harden Active Directory and Entra ID, roll out phishing-resistant MFA, lock down privileged accounts and automate joiner-mover-leaver processes so access always matches the job.",
    outcomes: [
      "Phishing-resistant MFA on every privileged and remote-access account",
      "Standing admin rights replaced with just-in-time, audited elevation",
      "Leavers lose access on their last day — automatically",
    ],
    phases: [
      {
        name: "Assess",
        duration: "Week 1–2",
        body: "Active Directory and Entra ID attack-path review, MFA coverage, privileged and stale account inventory.",
      },
      {
        name: "Harden",
        duration: "Week 2–5",
        body: "Admin tiering, conditional access, legacy authentication disabled and phishing-resistant MFA rolled out.",
      },
      {
        name: "Govern",
        duration: "Month 2–3",
        body: "Privileged access management, just-in-time elevation, access reviews and joiner-mover-leaver automation.",
      },
      {
        name: "Monitor",
        duration: "Ongoing",
        body: "Identity threat detection in the SOC: risky sign-ins, privilege changes, token theft and MFA abuse.",
      },
    ],
    capabilities: [
      {
        title: "Active Directory and Entra ID hardening",
        body: "Attack paths mapped with BloodHound and removed, admin tiering enforced, Kerberos weaknesses closed and hybrid identity sync secured.",
      },
      {
        title: "MFA and conditional access",
        body: "FIDO2 keys, passkeys and number-matching push replace SMS codes for privileged and remote access, with conditional access policies tested in report-only mode before enforcement.",
      },
      {
        title: "Privileged access management",
        body: "Admin credentials vaulted and rotated, sessions brokered and recorded, and elevation granted just-in-time — using a dedicated PAM platform or our own Red-Vault where that fits better.",
      },
      {
        title: "Identity governance",
        body: "Joiner-mover-leaver automation from HR to every connected system, plus periodic access reviews that produce audit evidence instead of spreadsheets.",
      },
    ],
    deliverables: [
      "Identity attack-path report",
      "Conditional access and MFA policy set",
      "PAM design and rollout plan",
      "Access review evidence for audits",
    ],
    stack: ["Microsoft Entra ID", "Active Directory", "Okta", "CyberArk", "BloodHound", "Red-Vault"],
    faqs: [
      {
        q: "We already have MFA. Is that enough?",
        a: "Not if it is SMS codes or simple push approvals, which are routinely bypassed through MFA fatigue, SIM swaps and adversary-in-the-middle phishing kits. Privileged and remote access should use phishing-resistant methods such as FIDO2 security keys or passkeys.",
      },
      {
        q: "Do we need a dedicated PAM product?",
        a: "Larger and regulated environments usually do. Smaller organisations can often get most of the benefit from tiered admin accounts, just-in-time elevation in Entra ID and a properly governed password vault. We size the solution to the risk.",
      },
      {
        q: "Can you help with on-premises Active Directory only?",
        a: "Yes. Many of our engagements are on-premises or hybrid AD, which remains the most common target in ransomware intrusions.",
      },
    ],
  },

  {
    slug: "ot-ics-security",
    name: "OT & ICS Security",
    short: "OT/ICS Security",
    eyebrow: "Industrial Security",
    icon: "factory",
    accent: "amber",
    group: "infrastructure-data",
    tagline: "Safe visibility for plants and SCADA",
    summary:
      "Visibility, segmentation and monitoring for operational technology — PLCs, SCADA, DCS and building management systems — designed with your engineers so safety and uptime always come first.",
    outcomes: [
      "A complete OT asset inventory, built passively without touching the process",
      "IT/OT boundaries segmented along the Purdue model with controlled remote access",
      "OT-aware monitoring that alerts on unsafe changes and unauthorised commands",
    ],
    phases: [
      {
        name: "Discover",
        duration: "Week 1–3",
        body: "Passive traffic capture at key switches to build an asset inventory and communication map without active scanning.",
      },
      {
        name: "Assess",
        duration: "Week 3–5",
        body: "IEC 62443-based risk assessment of zones, conduits, remote access paths and vendor connections.",
      },
      {
        name: "Segment",
        duration: "Month 2–4",
        body: "Industrial DMZ, zone firewalls and secure remote access, implemented within planned maintenance windows.",
      },
      {
        name: "Monitor",
        duration: "Ongoing",
        body: "OT-aware detection feeding the SOC, with response playbooks agreed with operations and safety teams.",
      },
    ],
    capabilities: [
      {
        title: "Passive asset discovery",
        body: "PLCs, HMIs, engineering workstations and their firmware identified from network traffic alone — no probes, no risk to the process.",
      },
      {
        title: "IEC 62443 risk assessment",
        body: "Zones and conduits defined, security levels targeted and gaps prioritised by safety and production impact rather than IT severity scores.",
      },
      {
        title: "Segmentation and secure remote access",
        body: "An industrial DMZ between IT and OT, plus brokered, recorded and time-limited remote access for vendors and integrators.",
      },
      {
        title: "OT threat monitoring and response",
        body: "Detection of new devices, unauthorised logic downloads and unusual industrial protocol commands — with response playbooks that never put safety at risk.",
      },
    ],
    deliverables: [
      "OT asset inventory and communication map",
      "IEC 62443 gap assessment",
      "Segmentation architecture",
      "OT incident response playbook",
    ],
    stack: ["IEC 62443", "Purdue model", "Nozomi Networks", "Claroty", "Dragos", "Zeek"],
    faqs: [
      {
        q: "Will your assessment disrupt our PLCs or production?",
        a: "No. Discovery is passive — we listen to network traffic rather than scanning devices. Any change to the OT network is planned with your engineers and made inside an approved maintenance window.",
      },
      {
        q: "How do you handle remote access for equipment vendors?",
        a: "Vendors connect through a brokered, multi-factor, recorded session that is enabled only for an approved time window, instead of a permanent VPN or remote desktop tool left running on the plant floor.",
      },
      {
        q: "Do you work with our control engineers?",
        a: "Always. Plant engineers own the process and know what is safe. Every recommendation is reviewed with them before it is implemented.",
      },
    ],
  },

  /* ---------------- Governance & People ---------------- */

  {
    slug: "email-security-awareness",
    name: "Email Security & Security Awareness",
    short: "Email & Awareness",
    eyebrow: "Human Risk",
    icon: "mail",
    accent: "cyan",
    group: "governance-people",
    tagline: "Phishing defence, DMARC and training",
    summary:
      "Stop phishing and business email compromise at the gateway, then train people to catch what gets through — with realistic simulations, short role-based training and a one-click way to report.",
    outcomes: [
      "SPF, DKIM and DMARC enforced, so nobody can spoof your domain",
      "Phishing report rates rising and click rates falling, measured monthly",
      "Finance and executive teams drilled on BEC and payment fraud",
    ],
    phases: [
      {
        name: "Assess",
        duration: "Week 1",
        body: "Email authentication review, gateway configuration audit and a baseline phishing simulation.",
      },
      {
        name: "Harden",
        duration: "Week 2–4",
        body: "DMARC moved to enforcement in monitored stages, gateway policies tuned and external-sender warnings enabled.",
      },
      {
        name: "Train",
        duration: "Ongoing",
        body: "Monthly simulations with short, immediate training for anyone who clicks — never public shaming.",
      },
      {
        name: "Measure",
        duration: "Quarterly",
        body: "Click, report and repeat-offender rates by department, presented with the next quarter's focus areas.",
      },
    ],
    capabilities: [
      {
        title: "Email authentication",
        body: "SPF, DKIM and DMARC configured and moved to enforcement without breaking legitimate senders such as your CRM, billing and marketing platforms.",
      },
      {
        title: "Secure email gateway tuning",
        body: "Microsoft 365, Google Workspace and third-party gateways configured against impersonation, malicious attachments and credential-phishing links.",
      },
      {
        title: "Phishing simulations",
        body: "Realistic campaigns built from the lures actually hitting your sector, measured by how many people report — not just how many click.",
      },
      {
        title: "Role-based awareness training",
        body: "Short modules for finance, HR, executives and IT, covering business email compromise, invoice fraud, deepfake voice calls and safe handling of personal data.",
      },
    ],
    deliverables: [
      "Email security posture report",
      "DMARC rollout plan and aggregate reports",
      "Simulation results by department",
      "Training completion evidence for audits",
    ],
    stack: ["Defender for Office 365", "Google Workspace", "Proofpoint", "Mimecast", "GoPhish", "DMARC reporting"],
    faqs: [
      {
        q: "Won't phishing simulations annoy our staff?",
        a: "Not when they are run well. We keep simulations realistic but fair, deliver training privately and immediately, and celebrate reporting. The goal is a workforce that reports suspicious email quickly, not one that feels tricked.",
      },
      {
        q: "Does this satisfy ISO 27001 and PCI-DSS awareness requirements?",
        a: "Yes. Completion records, simulation results and training content are exported as evidence for ISO 27001, PCI-DSS 4.0, SOC 2 and regulator audits.",
      },
      {
        q: "Can you help after an employee falls for a phishing email?",
        a: "Yes. Our SOC and incident response teams handle credential resets, mailbox rule clean-up and session revocation — the steps that matter in the first hour after a successful phish.",
      },
    ],
  },
];

export const servicesByGroup = serviceGroups.map((group) => ({
  ...group,
  services: services.filter((s) => s.group === group.id),
}));

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Platform capabilities (the "AI" layer)                              */
/* ------------------------------------------------------------------ */

export const platformPillars = [
  {
    name: "Ingest",
    title: "Unified telemetry fabric",
    body: "Endpoint, identity, network, cloud and SaaS logs normalised into one schema. Detection written once applies everywhere, and nothing hides in a tool nobody reads.",
    points: ["200+ log source integrations", "Schema normalisation", "Cost-aware tiering"],
  },
  {
    name: "Reason",
    title: "AI triage & correlation",
    body: "Models score every alert against asset criticality, identity risk, threat intelligence and behavioural baselines — then stitch related alerts into a single incident narrative.",
    points: ["Behavioural baselining (UEBA)", "Alert-to-incident clustering", "Risk-scored prioritisation"],
  },
  {
    name: "Decide",
    title: "Analyst-in-the-loop",
    body: "Certified analysts validate every escalation. AI removes the repetitive 90%; humans own the judgement calls, the containment decisions and the phone call to you.",
    points: ["Named analyst team", "Documented escalation paths", "Zero auto-escalation without review"],
  },
  {
    name: "Act",
    title: "Automated containment",
    body: "Pre-approved playbooks isolate hosts, revoke sessions and block egress in seconds — with a full audit trail of what was done, by whom, and why.",
    points: ["SOAR playbooks", "Reversible actions", "Full action audit log"],
  },
];

/* ------------------------------------------------------------------ */
/* Differentiators                                                     */
/* ------------------------------------------------------------------ */

export const differentiators = [
  {
    title: "AI that removes toil, not accountability",
    body: "Machine learning handles enrichment, correlation and triage at machine speed. A named, certified analyst still owns every decision that reaches you.",
    icon: "brain",
  },
  {
    title: "Certified practitioners",
    body: "OSCP, CISSP, CEH, CompTIA Security+ and cloud security specialists — the people who write your report are the people who did the work.",
    icon: "badge",
  },
  {
    title: "Reports leaders can act on",
    body: "Business-risk framing for the board, reproduction steps for engineers, and a remediation plan with owners and effort estimates.",
    icon: "file",
  },
  {
    title: "Priced for Indian businesses",
    body: "Enterprise-grade capability on retainers, project fees and subscriptions built for SME budgets — no seven-figure minimum commitment.",
    icon: "coins",
  },
  {
    title: "An extension of your team",
    body: "Shared channels, agreed SLAs, proactive communication. We adapt to your environment and your change process instead of imposing ours.",
    icon: "users",
  },
  {
    title: "India & Gulf coverage",
    body: "Headquartered in Kerala, serving clients across India and the GCC, with remote and on-site engagement models and IST/GST-aligned support.",
    icon: "globe",
  },
];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export const industries = [
  {
    name: "Banking & Finance",
    slug: "banking-finance",
    icon: "landmark",
    body: "RBI cybersecurity framework alignment, PCI-DSS 4.0 readiness, transaction fraud analytics and third-party risk for regulated financial institutions.",
    highlights: ["RBI framework", "PCI-DSS 4.0", "Fraud analytics"],
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: "heart-pulse",
    body: "Patient data protection, ABDM and HIPAA-aligned controls, medical device network segmentation and ransomware resilience for hospitals and diagnostics chains.",
    highlights: ["Patient data", "Device segmentation", "Ransomware resilience"],
  },
  {
    name: "Government & Public Sector",
    slug: "government",
    icon: "building",
    body: "Critical infrastructure protection, data sovereignty, CERT-In compliance and continuous monitoring for citizen-facing digital services.",
    highlights: ["CERT-In directions", "Data sovereignty", "Critical infrastructure"],
  },
  {
    name: "IT & SaaS",
    slug: "it-technology",
    icon: "code",
    body: "DevSecOps pipeline integration, API and multi-tenant security, cloud hardening and the security evidence your enterprise customers demand.",
    highlights: ["DevSecOps", "API security", "SOC 2 evidence"],
  },
  {
    name: "Manufacturing & OT",
    slug: "manufacturing",
    icon: "factory",
    body: "IT/OT convergence risk, ICS and SCADA network visibility, Purdue-model segmentation and production-safe monitoring that never interrupts the line.",
    highlights: ["OT/ICS visibility", "Segmentation", "Safe monitoring"],
  },
  {
    name: "Education",
    slug: "education",
    icon: "graduation-cap",
    body: "Student data protection, campus network security, phishing resilience for staff and students, and safe research computing environments.",
    highlights: ["Student data", "Campus network", "Phishing defence"],
  },
  {
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    icon: "shopping-cart",
    body: "Payment security, bot and account-takeover defence, digital skimming detection and peak-season readiness for high-traffic storefronts.",
    highlights: ["Payment security", "Bot defence", "Skimming detection"],
  },
  {
    name: "Logistics & Shipping",
    slug: "logistics",
    icon: "truck",
    body: "Supply chain and partner-network risk, ERP and TMS hardening, and continuity planning for operations that cannot afford downtime.",
    highlights: ["Supply chain risk", "ERP hardening", "Continuity planning"],
  },
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type Product = {
  slug: string;
  name: string;
  category: string;
  status: "live" | "coming-soon";
  tagline: string;
  summary: string;
  url?: string;
  accent: "cyan" | "violet" | "emerald" | "amber" | "rose";
  icon: string;
  /** Paragraphs for the "what is it" section on the product page. */
  intro: string[];
  /** Key/value rows — also used to satisfy platform identity verification. */
  identity: { k: string; v: string }[];
  stats: { value: string; label: string }[];
  features: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  audiences: string[];
  faqs: { q: string; a: string }[];
};

export const products: Product[] = [
  {
    slug: "tenreply",
    name: "Tenreply",
    category: "WhatsApp Business API Platform",
    status: "live",
    tagline: "Business messaging on WhatsApp, at scale.",
    summary:
      "An official Meta WhatsApp Business API platform for automated notifications, OTPs, broadcasts and two-way support conversations \u2014 with a unified team inbox and REST/webhook integration.",
    url: "https://tenreply.com",
    accent: "emerald",
    icon: "message",
    intro: [
      "Tenreply is a WhatsApp Business API platform developed and operated by DefenseNet Solutions, a cybersecurity company headquartered in Kozhikode, Kerala, India. The product is available at tenreply.com.",
      "Businesses use Tenreply to reach customers on WhatsApp at scale \u2014 order updates, appointment reminders, OTPs and promotional broadcasts \u2014 and to manage the conversations that come back through a single shared inbox.",
      "It is built on Meta's official WhatsApp Business Platform, with the same engineering and security standards we apply to every client environment we defend.",
    ],
    identity: [
      { k: "Business name", v: "Tenreply" },
      { k: "Parent company", v: "DefenseNet Solutions" },
      { k: "Product website", v: "tenreply.com" },
      { k: "Category", v: "WhatsApp Business API platform" },
      { k: "Registered address", v: "HiLITE Business Park, Kozhikode, Kerala 673014, India" },
    ],
    stats: [
      { value: "Meta", label: "Official API partner platform" },
      { value: "99.9%", label: "Platform uptime target" },
      { value: "24/7", label: "Support from DefenseNet" },
    ],
    features: [
      {
        title: "Official WhatsApp Business API",
        body: "Built directly on Meta's WhatsApp Business Platform \u2014 enterprise throughput, verified sender identity and full policy compliance.",
      },
      {
        title: "Automated message flows",
        body: "Trigger order confirmations, OTPs, appointment reminders and delivery updates from your own business events, with no manual sending.",
      },
      {
        title: "Unified team inbox",
        body: "Route inbound replies to the right agent, assign conversations, add internal notes and resolve support threads from one dashboard.",
      },
      {
        title: "Bulk broadcasts",
        body: "Reach thousands of opted-in customers with personalised, template-approved campaigns \u2014 transactional, promotional or informational.",
      },
      {
        title: "REST API & webhooks",
        body: "Integrate with your CRM, ERP or e-commerce stack in hours. Send programmatically, receive delivery and read events in real time.",
      },
      {
        title: "Secure by construction",
        body: "Built by a cybersecurity company: encrypted transport and storage, scoped API credentials, role-based access and full audit logging.",
      },
    ],
    steps: [
      {
        title: "Register your business",
        body: "Sign up on tenreply.com and complete your WhatsApp Business profile \u2014 display name, logo, category and description.",
      },
      {
        title: "Connect your number",
        body: "Link a business phone number to the WhatsApp Business API through our guided Meta verification flow.",
      },
      {
        title: "Create message templates",
        body: "Design and submit templates for Meta approval \u2014 transactional alerts, OTPs, service updates and marketing messages.",
      },
      {
        title: "Start messaging",
        body: "Send from the dashboard or via API, handle replies in the shared inbox, and track delivery and read receipts live.",
      },
    ],
    audiences: [
      "E-commerce",
      "Healthcare",
      "Banking & Finance",
      "Education",
      "Hospitality",
      "Logistics",
      "Manufacturing",
      "Professional services",
    ],
    faqs: [
      {
        q: "Who operates Tenreply?",
        a: "Tenreply is developed and operated by DefenseNet Solutions, a cybersecurity company headquartered at Phase 2, 2nd Floor, HiLITE Business Park, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014, India. The product is available at tenreply.com.",
      },
      {
        q: "Is Tenreply an official WhatsApp Business API provider?",
        a: "Yes. Tenreply is built on Meta's official WhatsApp Business Platform, which means verified sender identity, enterprise message throughput and full compliance with the WhatsApp Business Policy.",
      },
      {
        q: "What can businesses send through Tenreply?",
        a: "Transactional messages such as order confirmations, delivery updates, appointment reminders and OTPs, plus template-approved marketing broadcasts to customers who have opted in \u2014 and two-way support conversations through a shared team inbox.",
      },
      {
        q: "Can Tenreply integrate with our existing systems?",
        a: "Yes. Tenreply exposes a REST API and webhooks, so it integrates with CRMs, ERPs and e-commerce platforms. Messages can be triggered directly from your own business events with no manual sending.",
      },
    ],
  },

  {
    slug: "guardian",
    name: "Guardian",
    category: "Continuous Automated Penetration Testing",
    status: "live",
    tagline: "Red team tradecraft, running on a schedule.",
    summary:
      "Guardian tests your applications the way an attacker would \u2014 authenticated crawling, exploitation chains and business-logic abuse \u2014 on a schedule you set. Every finding is validated before it reaches you, so what lands in your backlog is real.",
    accent: "rose",
    icon: "crosshair",
    intro: [
      "Guardian is a scheduled offensive-testing platform built by DefenseNet Solutions. It runs against applications your organisation owns, repeatedly, applying the same techniques our red team uses by hand.",
      "Annual penetration tests leave you blind for the other fifty-one weeks, and your applications ship changes every one of them. Guardian closes that window: it re-tests continuously, so a vulnerability introduced on Tuesday is found on Tuesday rather than at next year's audit.",
      "It runs only against targets you have explicitly scoped and authorised in writing. Ownership verification is a setup requirement, not an optional step \u2014 Guardian will not test infrastructure you have not proven you control.",
    ],
    identity: [
      { k: "Product name", v: "Guardian" },
      { k: "Parent company", v: "DefenseNet Solutions" },
      { k: "Category", v: "Continuous automated penetration testing" },
      { k: "Deployment", v: "SaaS, or self-hosted appliance in your network" },
      { k: "Authorisation", v: "Written scope and ownership verification required" },
    ],
    stats: [
      { value: "Weekly", label: "Default scan cadence" },
      { value: "Validated", label: "Every finding proven exploitable" },
      { value: "OWASP", label: "ASVS and Top 10 aligned" },
    ],
    features: [
      {
        title: "Scheduled red team runs",
        body: "Daily, weekly or per-release. Guardian re-tests on your cadence and reports only what changed since the last run, so you are reading a diff rather than a fresh 200-page report.",
      },
      {
        title: "Authenticated testing",
        body: "Most real risk sits behind the login. Guardian holds credentials for each role you define and tests the application as each of them \u2014 including what one role can reach that it should not.",
      },
      {
        title: "Exploit validation",
        body: "Nothing is reported on version numbers alone. Guardian attempts safe, non-destructive exploitation and attaches the request, response and reproduction steps. If it cannot prove it, it does not raise it.",
      },
      {
        title: "Business logic abuse",
        body: "Broken object-level authorisation, workflow bypass, parameter tampering and race conditions \u2014 the failure classes scanners structurally cannot find, modelled from your own role and workflow definitions.",
      },
      {
        title: "Attack path chaining",
        body: "Individual findings are ranked, then combined. Guardian shows where three medium issues compose into full account takeover, which is how an attacker would actually use them.",
      },
      {
        title: "CI/CD and ticketing integration",
        body: "Trigger a run from your pipeline, fail a build on a new critical, and open tickets in Jira or Azure DevOps automatically with owner and severity already set.",
      },
    ],
    steps: [
      {
        title: "Scope and authorise",
        body: "Define target domains and applications, verify ownership, and sign the rules of engagement. Guardian will not run against an unverified target.",
      },
      {
        title: "Provide test credentials",
        body: "Add a login per user role. Guardian maps the authenticated surface and learns which role should be able to reach what.",
      },
      {
        title: "Set the schedule",
        body: "Choose cadence and testing windows, exclude any endpoint that must never be touched, and set the destructive-action boundary.",
      },
      {
        title: "Triage validated findings",
        body: "Receive only proven, ranked findings with evidence and remediation steps. Re-test automatically on the next run to confirm fixes held.",
      },
    ],
    audiences: [
      "SaaS platforms",
      "Fintech & lending",
      "E-commerce",
      "Healthcare portals",
      "Banking & Finance",
      "Government services",
      "Logistics platforms",
      "Any team shipping weekly",
    ],
    faqs: [
      {
        q: "How is this different from a vulnerability scanner?",
        a: "A scanner reports that a component looks vulnerable. Guardian attempts to exploit it and reports only what it could actually prove, with evidence attached. It also tests authenticated business logic \u2014 broken authorisation, workflow bypass, race conditions \u2014 which signature-based scanners cannot reach at all.",
      },
      {
        q: "Does it replace a manual penetration test?",
        a: "No, and we will not sell it as one. Guardian covers the repeatable majority continuously, which frees a manual engagement to go deep on architecture, chained logic flaws and areas requiring human creativity. Most regulators and enterprise customers still expect an annual human-led test; Guardian is what keeps the other fifty-one weeks honest.",
      },
      {
        q: "Is it safe to run against production?",
        a: "Destructive and denial-of-service techniques are excluded by default. You set testing windows, rate limits and an endpoint exclusion list before the first run, and there is a stop control that halts an in-flight run immediately. Many clients still prefer to point it at staging first, and we recommend that for the initial baseline.",
      },
      {
        q: "What stops it being pointed at someone else's systems?",
        a: "Ownership verification is mandatory at setup \u2014 DNS record, file upload or an equivalent proof per target \u2014 and every run is tied to a signed authorisation naming the scope. Unverified targets cannot be scheduled.",
      },
      {
        q: "Can we self-host it?",
        a: "Yes. Guardian runs as a SaaS platform or as an appliance inside your own network, which is the usual choice for internal applications and for organisations with data residency requirements.",
      },
    ],
  },

  {
    slug: "red-vault",
    name: "Red-Vault",
    category: "Enterprise Password & Secrets Manager",
    status: "live",
    tagline: "Corporate credentials, shared without the spreadsheet.",
    summary:
      "An end-to-end encrypted password manager for teams. Store corporate credentials, share them with exactly the right people, revoke access in one click, and keep a complete audit trail of who used what.",
    accent: "violet",
    icon: "vault",
    intro: [
      "Red-Vault is a corporate password and secrets manager built by DefenseNet Solutions. It exists because of what we keep finding during assessments: shared spreadsheets of passwords, credentials pasted into WhatsApp groups, and admin logins that four people know and nobody rotated after the last resignation.",
      "It gives teams a single encrypted place to keep credentials, a safe way to share them, and an instant way to take that access back. Every secret is encrypted on your device before it is stored, so the ciphertext is all that ever reaches the server.",
      "That design is deliberate and it constrains us as much as it protects you: DefenseNet cannot read your vault, and could not produce its contents even if compelled to.",
    ],
    identity: [
      { k: "Product name", v: "Red-Vault" },
      { k: "Parent company", v: "DefenseNet Solutions" },
      { k: "Category", v: "Enterprise password and secrets manager" },
      { k: "Encryption", v: "AES-256-GCM, zero-knowledge architecture" },
      { k: "Deployment", v: "SaaS, or self-hosted for data residency" },
    ],
    stats: [
      { value: "AES-256", label: "Client-side encryption" },
      { value: "Zero-knowledge", label: "We cannot read your vault" },
      { value: "Instant", label: "Access revocation" },
    ],
    features: [
      {
        title: "Zero-knowledge encryption",
        body: "Secrets are encrypted and decrypted on your device with keys derived from your master password. The server stores ciphertext only \u2014 we hold no key that could open your vault.",
      },
      {
        title: "Team vaults and granular sharing",
        body: "Organise credentials by team, project or client, and grant access at the vault or individual item level. People see exactly what their role requires and nothing else.",
      },
      {
        title: "Time-bound and revocable shares",
        body: "Share a credential with a contractor for the length of an engagement. Access expires automatically, and revocation takes effect immediately rather than waiting for a password change.",
      },
      {
        title: "Complete audit trail",
        body: "Every view, edit, share and export is logged with user, timestamp and device. When someone leaves, you know precisely which secrets they touched and what needs rotating.",
      },
      {
        title: "Weak and breached credential detection",
        body: "Continuous checks for reused, weak and publicly breached passwords across the organisation, surfaced as a prioritised remediation list rather than a wall of warnings.",
      },
      {
        title: "SSO, SCIM and break-glass",
        body: "Provision and deprovision through your identity provider so offboarding is automatic, with a documented emergency access path for when the identity provider itself is unavailable.",
      },
    ],
    steps: [
      {
        title: "Create your organisation",
        body: "Set up the org vault, define teams, and configure your password policy and sharing rules before anyone is invited in.",
      },
      {
        title: "Import existing credentials",
        body: "Bring in what is already scattered across spreadsheets, browsers and other managers. Red-Vault flags duplicates, weak entries and anything already in a public breach set.",
      },
      {
        title: "Connect identity and invite the team",
        body: "Wire up SSO and SCIM so joiners and leavers are handled automatically, then invite your teams into the vaults they need.",
      },
      {
        title: "Share, monitor and rotate",
        body: "Share safely with expiry, watch the audit trail, and act on the rotation queue when a credential is exposed or someone leaves.",
      },
    ],
    audiences: [
      "IT & DevOps teams",
      "Managed service providers",
      "Banking & Finance",
      "Healthcare",
      "Legal & professional services",
      "Agencies with client credentials",
      "Startups scaling their team",
      "Any team sharing a password today",
    ],
    faqs: [
      {
        q: "Can DefenseNet read our passwords?",
        a: "No. Red-Vault uses a zero-knowledge architecture \u2014 encryption and decryption happen on your device, and the keys are derived from your master password, which never leaves it. We store ciphertext. We could not produce your credentials if we were asked to, which is the point.",
      },
      {
        q: "What happens when an employee leaves?",
        a: "Deprovisioning through SCIM removes their access immediately. The audit trail then shows exactly which secrets that person accessed, and Red-Vault builds a rotation queue from it \u2014 because revoking access is not the same as the credential being safe.",
      },
      {
        q: "What if someone forgets their master password?",
        a: "Zero-knowledge means we cannot reset it for them. Recovery works through organisation-controlled mechanisms you configure in advance: administrator-assisted recovery keys and a documented break-glass process. This must be set up before it is needed, and onboarding walks you through it.",
      },
      {
        q: "Does it store more than passwords?",
        a: "Yes \u2014 API keys, certificates, SSH keys, database connection strings, secure notes and documents. Machine secrets can be retrieved programmatically through scoped service credentials rather than being pasted into environment files.",
      },
      {
        q: "Can we host it ourselves?",
        a: "Yes. Red-Vault is available as SaaS or self-hosted, which is the usual choice for organisations with data residency obligations under DPDPA or sector regulation.",
      },
    ],
  },

  {
    slug: "exposure-monitor",
    name: "Exposure Monitor",
    category: "External Attack Surface Management",
    status: "coming-soon",
    tagline: "See your internet edge the way attackers do.",
    summary:
      "Always-on discovery of your external attack surface — new subdomains, forgotten services, expiring certificates and leaked credentials — checked daily and fed straight into Guardian for testing.",
    accent: "amber",
    icon: "radar",
    intro: [
      "Exposure Monitor is an external attack surface management product in development at DefenseNet Solutions. It grows out of the reconnaissance our red team runs at the start of every engagement — and the uncomfortable number of times that reconnaissance finds a system the client did not know they had.",
      "It is designed to discover what you expose to the internet without being told where to look: subdomains from certificate transparency logs and DNS, cloud assets, open services, login portals and the software versions behind them. Each discovery is checked against known exploited vulnerabilities, so an exposed edge device with a critical CVE is flagged the day it appears.",
      "Exposure Monitor is currently in early access. Pilot clients help shape the roadmap and receive it before general release.",
    ],
    identity: [
      { k: "Product name", v: "Exposure Monitor" },
      { k: "Parent company", v: "DefenseNet Solutions" },
      { k: "Category", v: "External attack surface management (EASM)" },
      { k: "Status", v: "In development — early access" },
      { k: "Integrates with", v: "Guardian, DefenseNet Managed SOC" },
    ],
    stats: [
      { value: "Daily", label: "Planned discovery cadence" },
      { value: "KEV", label: "Checked against exploited CVEs" },
      { value: "Early access", label: "Pilot clients onboarding" },
    ],
    features: [
      {
        title: "Continuous asset discovery",
        body: "Subdomains, IP ranges, cloud resources and login portals discovered from certificate transparency, DNS and internet-wide scan data — including the ones nobody remembered to put in the asset register.",
      },
      {
        title: "Exploited-vulnerability matching",
        body: "Every exposed service fingerprinted and matched against CISA's Known Exploited Vulnerabilities catalogue, so a vulnerable VPN gateway or file-transfer server is flagged as a priority, not a footnote.",
      },
      {
        title: "Change alerts",
        body: "A new open port, a new subdomain or an expiring certificate triggers an alert with an owner attached, rather than surfacing months later in an annual assessment.",
      },
      {
        title: "Credential leak detection",
        body: "Corporate credentials appearing in breach dumps and infostealer logs surfaced with the affected account and a recommended reset.",
      },
      {
        title: "Guardian hand-off",
        body: "Newly discovered web applications are queued for authenticated, validated testing in Guardian once ownership is confirmed — discovery and testing in one loop.",
      },
      {
        title: "SOC integration",
        body: "Exposure changes are visible to DefenseNet's SOC analysts, so a suspicious new service is investigated as a possible intrusion, not just an inventory change.",
      },
    ],
    steps: [
      {
        title: "Register seed domains",
        body: "Provide your primary domains and known IP ranges, and verify ownership. Discovery expands outward from those seeds.",
      },
      {
        title: "Review the first inventory",
        body: "Confirm which discovered assets are yours, assign owners and mark anything that should not exist for decommissioning.",
      },
      {
        title: "Set alert routing",
        body: "Decide who hears about new exposures, exploited CVEs and certificate expiries, and through which channel.",
      },
      {
        title: "Close the loop",
        body: "Fix, decommission or accept each exposure — and send new applications to Guardian for testing.",
      },
    ],
    audiences: [
      "Organisations with many domains",
      "Banking & Finance",
      "Healthcare",
      "SaaS platforms",
      "Groups after acquisitions",
      "Government services",
      "E-commerce",
      "Any team with a shadow IT problem",
    ],
    faqs: [
      {
        q: "Is Exposure Monitor available today?",
        a: "It is in development and onboarding a limited number of early-access clients. If external exposure is an urgent concern now, our VAPT and threat intelligence services cover it manually in the meantime.",
      },
      {
        q: "Does it scan systems it has not been authorised to test?",
        a: "Discovery relies on public data sources and non-intrusive service fingerprinting. Any active testing happens only in Guardian, and only against targets whose ownership has been verified and authorised in writing.",
      },
      {
        q: "How is this different from a vulnerability scanner?",
        a: "A scanner tests the assets you point it at. Exposure Monitor is designed to find the assets you did not know to point it at, and to tell you when that list changes.",
      },
    ],
  },

  {
    slug: "detection-content-manager",
    name: "Detection Content Manager",
    category: "Detection-as-Code Platform",
    status: "coming-soon",
    tagline: "Detection rules managed like software.",
    summary:
      "Version-controlled detection rules with MITRE ATT&CK mapping, automated testing and one-click deployment across Microsoft Sentinel, Splunk and Elastic — the tooling our own detection engineers use, productised.",
    accent: "emerald",
    icon: "git-branch",
    intro: [
      "Detection Content Manager is a detection-as-code platform in development at DefenseNet Solutions. It is the internal tooling our detection engineers use to write, test and ship rules across client SIEMs, being turned into a product other security teams can run.",
      "Most SOCs manage detection rules by hand inside the SIEM console: no history, no peer review, no tests, and no clear picture of which attacker techniques are actually covered. This product is designed to change that by treating every rule as code, with a pull request, a test and a coverage map.",
      "Detection Content Manager is currently in early access. Pilot teams help shape the roadmap and receive it before general release.",
    ],
    identity: [
      { k: "Product name", v: "Detection Content Manager" },
      { k: "Parent company", v: "DefenseNet Solutions" },
      { k: "Category", v: "Detection-as-code platform" },
      { k: "Status", v: "In development — early access" },
      { k: "Targets", v: "Microsoft Sentinel, Splunk, Elastic" },
    ],
    stats: [
      { value: "Git", label: "Version-controlled rules" },
      { value: "ATT&CK", label: "Coverage mapped per technique" },
      { value: "3 SIEMs", label: "Sentinel, Splunk, Elastic" },
    ],
    features: [
      {
        title: "Rules as code",
        body: "Every detection lives in Git with history, review and rollback. Sigma is supported as a vendor-neutral source format alongside native KQL, SPL and EQL.",
      },
      {
        title: "ATT&CK coverage mapping",
        body: "Each rule is tagged to the techniques it detects, producing a live coverage heat map that shows exactly where your blind spots are.",
      },
      {
        title: "Automated testing",
        body: "Rules are validated for syntax and run against recorded attack telemetry before release, so a broken query is caught in review rather than discovered during an incident.",
      },
      {
        title: "Multi-SIEM deployment",
        body: "Promote a reviewed rule to one SIEM or several, across tenants, with a full audit trail of who deployed what and when.",
      },
      {
        title: "Tuning history",
        body: "Suppressions and exclusions are recorded with a reason and an owner, so nobody quietly mutes an alert that mattered.",
      },
      {
        title: "Built from our SOC",
        body: "Ships with an optional library of detection content maintained by DefenseNet's detection engineers and informed by live investigations.",
      },
    ],
    steps: [
      {
        title: "Connect your SIEM",
        body: "Link Sentinel, Splunk or Elastic with scoped credentials and import the rules you already run.",
      },
      {
        title: "Baseline coverage",
        body: "Imported rules are mapped to ATT&CK so you can see current coverage before writing anything new.",
      },
      {
        title: "Adopt the workflow",
        body: "New and changed rules go through a pull request with automated tests and peer review.",
      },
      {
        title: "Deploy and measure",
        body: "Release rules with one click and track coverage and false-positive trends over time.",
      },
    ],
    audiences: [
      "In-house SOC teams",
      "MSSPs and MDR providers",
      "Detection engineers",
      "Banking & Finance",
      "Large enterprises",
      "Multi-SIEM environments",
      "Teams migrating SIEMs",
      "Any SOC with rule sprawl",
    ],
    faqs: [
      {
        q: "Is Detection Content Manager available today?",
        a: "It is in development and onboarding a limited number of early-access teams. Our SIEM and detection engineering service delivers the same detection-as-code workflow as a managed engagement in the meantime.",
      },
      {
        q: "Do we have to rewrite our existing rules?",
        a: "No. Existing rules are imported in their native query language. Converting to Sigma is optional and only worthwhile if you run more than one SIEM.",
      },
      {
        q: "Does it replace our SIEM?",
        a: "No. It manages the detection content that runs inside your SIEM. Your data, licences and investigations stay where they are.",
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  /** Extra path prefixes that should also mark this item as active. */
  match?: string[];
  children?: NavLink[];
  /** Grouped children render as a multi-column mega menu on desktop. */
  groups?: { label: string; items: NavLink[] }[];
};

const productNavDescriptions: Record<string, string> = {
  guardian: "Scheduled automated pentesting",
  "red-vault": "Corporate password & secrets manager",
  tenreply: "WhatsApp Business API platform",
  "exposure-monitor": "Attack surface monitoring — early access",
  "detection-content-manager": "Detection-as-code — early access",
};

export const primaryNav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Services",
    href: "/services",
    groups: servicesByGroup.map((group) => ({
      label: group.label,
      items: group.services.map((s) => ({
        label: s.short,
        href: `/services/${s.slug}`,
        description: s.tagline,
      })),
    })),
  },
  {
    label: "Products",
    href: "/products",
    children: products.map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
      description: productNavDescriptions[p.slug] ?? p.category,
    })),
  },
  { label: "Industries", href: "/industries" },
  {
    label: "Resources",
    href: "/resources",
    match: ["/blog"],
    children: [
      {
        label: "CVE advisories",
        href: "/resources/cve",
        description: "Impact, detection and mitigation for major CVEs",
      },
      {
        label: "Incident case studies",
        href: "/resources/incidents",
        description: "What went wrong in landmark breaches",
      },
      {
        label: "Insights blog",
        href: "/blog",
        description: "Guides, briefings and explainers",
      },
    ],
  },
  { label: "About", href: "/about" },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "DefenseNet's SOC detected and blocked a ransomware intrusion attempt on our servers within minutes. Their 24/7 monitoring completely transformed our security posture — we sleep easier knowing they are watching.",
    name: "Mohammed Rizwan",
    role: "IT Director",
    org: "Gulf Logistics Group",
  },
  {
    quote:
      "The VAPT audit uncovered 23 critical vulnerabilities we were completely unaware of. The remediation report and follow-up support helped us patch every single issue. A genuinely professional team.",
    name: "Priya Nair",
    role: "CISO",
    org: "Sunshine Multi-Speciality Hospital",
  },
  {
    quote:
      "They guided us through PCI-DSS compliance end to end. Knowledgeable, communicative and genuinely committed to our security. I would recommend them without hesitation to any financial institution.",
    name: "Thomas Varghese",
    role: "Managing Director",
    org: "Southern Finance Corp",
  },
];

/* ------------------------------------------------------------------ */
/* Values & timeline (About page)                                      */
/* ------------------------------------------------------------------ */

export const coreValues = [
  {
    title: "Integrity",
    body: "Clients hand us their most sensitive systems and data. We treat that access as a trust to be earned continuously, and we report what we find — including when it is inconvenient.",
  },
  {
    title: "Technical excellence",
    body: "Depth over volume. Every report, detection rule and remediation plan is held to a standard we would accept if we were the ones receiving it.",
  },
  {
    title: "Applied innovation",
    body: "We adopt AI and automation where they demonstrably improve outcomes, and we are equally willing to say when a technology is not ready for production defence.",
  },
  {
    title: "Client first",
    body: "Security exists to let the business operate. Our recommendations are always weighed against operational reality, budget and the risk actually being carried.",
  },
];

export const timeline = [
  {
    year: "2021",
    title: "Founded in Kerala",
    body: "Started with a simple conviction: enterprise-grade security should not be reserved for enterprises.",
  },
  {
    year: "2022",
    title: "24/7 SOC goes live",
    body: "Round-the-clock monitoring launched with SIEM-based detection and a documented escalation model.",
  },
  {
    year: "2023",
    title: "Gulf expansion",
    body: "Extended offensive security and compliance services to clients across the GCC region.",
  },
  {
    year: "2024",
    title: "AI-assisted triage",
    body: "Behavioural analytics and ML-based alert scoring deployed across the SOC, cutting median triage time sharply.",
  },
  {
    year: "2025",
    title: "Tenreply launched",
    body: "Our first product — a secure WhatsApp Business API platform — released at tenreply.com.",
  },
  {
    year: "2026",
    title: "Autonomous defence platform",
    body: "Continued investment in automated containment and detection engineering as a product-grade capability.",
  },
];

export const certifications = ["OSCP", "CISSP", "CEH", "CompTIA Security+", "AWS Security", "Azure Security Engineer"];
