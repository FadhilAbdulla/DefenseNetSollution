/**
 * Single source of truth for site-wide content: identity, contact details,
 * navigation, services, products, industries and social proof.
 * Pages and SEO helpers all read from here so nothing drifts out of sync.
 */

export const site = {
  name: "DefenseNet Solutions",
  shortName: "DefenseNet",
  legalName: "DefenseNet Solutions",
  url: "https://www.defensenetsolutions.com",
  tagline: "AI-Driven Cyber Defence",
  description:
    "DefenseNet Solutions is an AI-driven cybersecurity company in Kerala, India. Autonomous 24/7 SOC, VAPT, incident response, cloud security and SIEM engineering for businesses across India and the Gulf.",
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
      line1: "Baithul Salama, Behind Kadimul School",
      line2: "Thalassery PO, Kannur",
      region: "Kerala",
      postalCode: "670101",
      country: "India",
      countryCode: "IN",
    },
    hours: [
      { label: "SOC monitoring", value: "24/7 — every day of the year" },
      { label: "Consultations (Mon–Fri)", value: "9:00 AM – 7:00 PM IST" },
      { label: "Consultations (Saturday)", value: "9:00 AM – 2:00 PM IST" },
    ],
    geo: { lat: 11.7480, lng: 75.4929 },
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
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Managed SOC",
        href: "/services/managed-soc",
        description: "AI-triaged detection & response, 24/7",
      },
      {
        label: "VAPT & Red Teaming",
        href: "/services/vapt-penetration-testing",
        description: "Adversary-grade offensive testing",
      },
      {
        label: "Incident Response",
        href: "/services/incident-response",
        description: "Containment, forensics, recovery",
      },
      {
        label: "Cloud Security",
        href: "/services/cloud-security",
        description: "CSPM, IAM and workload hardening",
      },
      {
        label: "SIEM Engineering",
        href: "/services/siem-engineering",
        description: "Detection pipelines that actually fire",
      },
      {
        label: "Compliance & vCISO",
        href: "/services/compliance-consulting",
        description: "ISO 27001, SOC 2, PCI-DSS, DPDPA",
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Tenreply",
        href: "/products/tenreply",
        description: "WhatsApp Business API platform",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
];

/* ------------------------------------------------------------------ */
/* Metrics                                                             */
/* ------------------------------------------------------------------ */

export const metrics = [
  { value: "100+", label: "Clients protected", detail: "India & the Gulf" },
  { value: "500+", label: "Incidents resolved", detail: "Since 2021" },
  { value: "< 15 min", label: "Median triage time", detail: "AI-assisted SOC" },
  { value: "24/7/365", label: "SOC coverage", detail: "Guaranteed SLAs" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  summary: string;
  icon: string;
  accent: "cyan" | "violet" | "emerald" | "amber" | "rose";
  outcomes: string[];
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
    summary:
      "A 24/7 security operations centre where machine learning does the first pass on every alert and certified analysts do the thinking. You get investigated incidents, not raw noise.",
    outcomes: [
      "Median triage under 15 minutes, around the clock",
      "Up to 90% of low-value alerts closed automatically before a human sees them",
      "One accountable team for detection, investigation and containment",
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
    summary:
      "Adversary-grade testing of your networks, applications, APIs and cloud estate — manual exploitation backed by automated coverage, and reports your engineers can actually act on.",
    outcomes: [
      "Validated, exploitable findings — not a scanner dump",
      "Proof-of-concept evidence for every critical and high",
      "Free retest of remediated findings within the engagement window",
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
    summary:
      "When something is already inside, minutes decide the cost. We mobilise immediately to contain the threat, preserve evidence, find the root cause and get you operating again.",
    outcomes: [
      "Containment actions underway within the first hour of engagement",
      "Forensically sound evidence handling for legal and insurance needs",
      "Root-cause report that closes the door permanently, not temporarily",
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
    summary:
      "Continuous assessment and hardening of AWS, Azure and GCP — identity, configuration, workloads and data — with drift caught in minutes instead of at audit time.",
    outcomes: [
      "Every public exposure and over-permissive role inventoried and ranked",
      "Guardrails that block misconfiguration at deploy time, not after",
      "Audit-ready compliance evidence generated continuously",
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
    summary:
      "Log pipelines that are complete, affordable and actually tuned. We design, deploy and continuously improve detection content so your SIEM produces signal rather than storage bills.",
    outcomes: [
      "Detection coverage measured against MITRE ATT&CK, not guessed at",
      "Ingest cost reduced by routing low-value telemetry to cheap tiers",
      "False positive rate driven down every single month",
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
    summary:
      "Framework adoption, risk assessment and audit readiness — ISO 27001, SOC 2, PCI-DSS, NIST CSF and India's DPDPA 2023 — led by practitioners who also run the controls.",
    outcomes: [
      "A single control set mapped to every framework you must satisfy",
      "Audit evidence collected continuously instead of in a panic",
      "Security decisions owned by an accountable, senior voice",
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
];

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
    body: "RBI cybersecurity framework alignment, PCI-DSS 4.0 readiness, transaction fraud analytics and third-party risk for regulated financial institutions.",
    highlights: ["RBI framework", "PCI-DSS 4.0", "Fraud analytics"],
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    body: "Patient data protection, ABDM and HIPAA-aligned controls, medical device network segmentation and ransomware resilience for hospitals and diagnostics chains.",
    highlights: ["Patient data", "Device segmentation", "Ransomware resilience"],
  },
  {
    name: "Government & Public Sector",
    slug: "government",
    body: "Critical infrastructure protection, data sovereignty, CERT-In compliance and continuous monitoring for citizen-facing digital services.",
    highlights: ["CERT-In directions", "Data sovereignty", "Critical infrastructure"],
  },
  {
    name: "IT & SaaS",
    slug: "it-technology",
    body: "DevSecOps pipeline integration, API and multi-tenant security, cloud hardening and the security evidence your enterprise customers demand.",
    highlights: ["DevSecOps", "API security", "SOC 2 evidence"],
  },
  {
    name: "Manufacturing & OT",
    slug: "manufacturing",
    body: "IT/OT convergence risk, ICS and SCADA network visibility, Purdue-model segmentation and production-safe monitoring that never interrupts the line.",
    highlights: ["OT/ICS visibility", "Segmentation", "Safe monitoring"],
  },
  {
    name: "Education",
    slug: "education",
    body: "Student data protection, campus network security, phishing resilience for staff and students, and safe research computing environments.",
    highlights: ["Student data", "Campus network", "Phishing defence"],
  },
  {
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    body: "Payment security, bot and account-takeover defence, digital skimming detection and peak-season readiness for high-traffic storefronts.",
    highlights: ["Payment security", "Bot defence", "Skimming detection"],
  },
  {
    name: "Logistics & Shipping",
    slug: "logistics",
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
  accent: "cyan" | "violet" | "emerald";
};

export const products: Product[] = [
  {
    slug: "tenreply",
    name: "Tenreply",
    category: "WhatsApp Business API Platform",
    status: "live",
    tagline: "Business messaging on WhatsApp, at scale.",
    summary:
      "An official Meta WhatsApp Business API platform for automated notifications, OTPs, broadcasts and two-way support conversations — with a unified team inbox and REST/webhook integration.",
    url: "https://tenreply.com",
    accent: "emerald",
  },
];

export const tenreply = {
  ...products[0],
  features: [
    {
      title: "Official WhatsApp Business API",
      body: "Built directly on Meta's WhatsApp Business Platform — enterprise throughput, verified sender identity and full policy compliance.",
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
      body: "Reach thousands of opted-in customers with personalised, template-approved campaigns — transactional, promotional or informational.",
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
      body: "Sign up on tenreply.com and complete your WhatsApp Business profile — display name, logo, category and description.",
    },
    {
      title: "Connect your number",
      body: "Link a business phone number to the WhatsApp Business API through our guided Meta verification flow.",
    },
    {
      title: "Create message templates",
      body: "Design and submit templates for Meta approval — transactional alerts, OTPs, service updates and marketing messages.",
    },
    {
      title: "Start messaging",
      body: "Send from the dashboard or via API, handle replies in the shared inbox, and track delivery and read receipts live.",
    },
  ],
  stats: [
    { value: "Meta", label: "Official API partner platform" },
    { value: "99.9%", label: "Platform uptime target" },
    { value: "24/7", label: "Support from DefenseNet" },
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
};

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
    title: "Founded in Thalassery, Kerala",
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
