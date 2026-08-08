import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Cpu, Eye, Lock, Workflow } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { platformPillars } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The DefenseNet Platform — AI-Assisted Detection & Response",
  description:
    "How DefenseNet Solutions uses machine learning for alert triage, behavioural analytics and automated containment — with certified analysts owning every decision.",
  path: "/platform/",
});

const aiVsHuman = [
  {
    stage: "Collection & normalisation",
    machine: "Full",
    human: "Design only",
    note: "Log parsing, schema mapping and enrichment run entirely automatically.",
  },
  {
    stage: "Alert triage & scoring",
    machine: "Full",
    human: "Spot-check",
    note: "Models rank alerts by asset criticality, identity risk and behavioural deviation.",
  },
  {
    stage: "Incident correlation",
    machine: "Assisted",
    human: "Review",
    note: "Related alerts are clustered into one narrative; an analyst confirms the story.",
  },
  {
    stage: "Investigation & scoping",
    machine: "Assisted",
    human: "Owns",
    note: "Analysts pivot through evidence; AI surfaces context and suggests next queries.",
  },
  {
    stage: "Containment decision",
    machine: "None",
    human: "Owns",
    note: "No production system is isolated without a human decision under an agreed playbook.",
  },
  {
    stage: "Client communication",
    machine: "None",
    human: "Owns",
    note: "A named analyst writes and delivers every escalation.",
  },
];

const guardrails = [
  {
    icon: Eye,
    title: "Explainable by default",
    body: "Every AI-generated score comes with the features that drove it. If an analyst cannot explain why an alert was ranked critical, the model does not ship.",
  },
  {
    icon: Lock,
    title: "Your data stays yours",
    body: "Client telemetry is never used to train shared models. Detection logic is portable, tenant data is not.",
  },
  {
    icon: CircleAlert,
    title: "Fail-safe, not fail-open",
    body: "If the scoring pipeline degrades, alerts fall back to deterministic rules and full manual triage. Coverage never silently drops.",
  },
  {
    icon: Workflow,
    title: "Reversible automation",
    body: "Every automated action — host isolation, session revocation, egress block — is logged, attributable and reversible in one step.",
  },
];

const platformFaqs = [
  {
    q: "Does AI make security decisions without a human?",
    a: "No. AI closes low-value alerts and enriches everything else, but any action that affects a production system runs under a pre-agreed playbook and a human decision. Every automated action is logged and reversible.",
  },
  {
    q: "Do you train models on our data?",
    a: "No. Client telemetry stays within your tenancy and is never used to train models shared across customers. Detection logic and behavioural techniques are portable between clients; your data is not.",
  },
  {
    q: "What happens if the AI is wrong?",
    a: "False negatives are caught by deterministic detection rules that run in parallel, and by scheduled threat hunts. False positives are fed back into tuning every month. Model performance is reported to you, not hidden.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        nodes={[
          faqSchema(platformFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="The platform"
        title="AI does the reading. Analysts do the deciding."
        lede="Our detection stack processes hundreds of thousands of events a day so that a small number of well-evidenced incidents reach a human — and a much smaller number reach you."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform/" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Request a technical walkthrough
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/services/managed-soc" className="btn btn-ghost">
            Managed SOC service
          </Link>
        </div>
      </PageHero>

      {/* Pipeline */}
      <Section>
        <SectionHeading
          eyebrow="Architecture"
          title="One pipeline, four stages, zero blind handoffs."
          lede="Each stage feeds the next with structured context. Nothing is re-derived, and nothing is lost between a log line and the phone call you receive."
        />

        <div className="mt-14 flex flex-col gap-5 md:mt-16">
          {platformPillars.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 70}>
              <div className="card grid gap-8 p-8 lg:grid-cols-[auto_1fr_1fr] lg:items-start lg:gap-12 lg:p-10">
                <div className="flex items-center gap-4 lg:w-40 lg:flex-col lg:items-start">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cyan-signal/30 bg-cyan-signal/10 font-mono text-sm font-semibold text-cyan-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-signal lg:mt-3">
                    {pillar.name}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {pillar.body}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 rounded-xl border border-line bg-void/40 p-6">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.8125rem] text-ink-muted"
                    >
                      <Check size={13} className="mt-1 shrink-0 text-cyan-signal" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Responsibility split */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Division of labour"
          title="Exactly where the machine stops."
          lede="Vendors are rarely specific about this. Here is our answer, stage by stage — and it is the same answer we put in the contract."
        />

        <Reveal className="mt-12 overflow-hidden rounded-xl border border-line md:mt-14">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-elevated/50">
                  {["Stage", "Automation", "Analyst", "How it works"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aiVsHuman.map((row) => (
                  <tr key={row.stage} className="border-b border-line/70 last:border-0">
                    <td className="px-6 py-5 text-sm font-medium text-ink">{row.stage}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`chip ${
                          row.machine === "Full"
                            ? "border-cyan-signal/30 bg-cyan-signal/10 text-cyan-signal"
                            : row.machine === "Assisted"
                              ? "border-violet-signal/30 bg-violet-signal/10 text-violet-signal"
                              : ""
                        }`}
                      >
                        {row.machine}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`chip ${
                          row.human === "Owns"
                            ? "border-emerald-signal/30 bg-emerald-signal/10 text-emerald-signal"
                            : ""
                        }`}
                      >
                        {row.human}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[0.8125rem] leading-relaxed text-ink-muted">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* Guardrails */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Guardrails"
          title="Four commitments that make the automation trustworthy."
        />
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
          {guardrails.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 80}>
              <article className="card h-full p-7 lg:p-8">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-elevated text-cyan-signal">
                  <g.icon size={17} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-ink">
                  {g.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{g.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Coverage */}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              Coverage
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink text-balance">
              Detection mapped to MITRE ATT&amp;CK — and measured.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              Every detection we deploy is tagged to the techniques it covers. That gives you a
              coverage map instead of a vague claim, and it makes gaps visible before an attacker
              finds them. We validate the map with atomic tests executed against your own
              environment.
            </p>
            <Link
              href="/services/siem-engineering"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-signal focus-ring"
            >
              How we engineer detections
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-8">
              <div className="flex items-center gap-2.5">
                <Cpu size={16} className="text-cyan-signal" aria-hidden />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink">
                  Tactic coverage snapshot
                </span>
              </div>
              <ul className="mt-7 flex flex-col gap-5">
                {[
                  { tactic: "Initial access", pct: 92 },
                  { tactic: "Execution", pct: 88 },
                  { tactic: "Persistence", pct: 84 },
                  { tactic: "Credential access", pct: 90 },
                  { tactic: "Lateral movement", pct: 86 },
                  { tactic: "Exfiltration", pct: 79 },
                ].map((row) => (
                  <li key={row.tactic}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.8125rem] text-ink">{row.tactic}</span>
                      <span className="font-mono text-[0.7rem] text-cyan-signal">{row.pct}%</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-elevated">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-signal to-violet-signal"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-line pt-5 font-mono text-[0.62rem] leading-relaxed text-ink-muted">
                Illustrative baseline for a typical mid-market estate after 90 days of detection
                engineering. Your map is built from your own telemetry.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQs */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Questions" title="What people ask about the AI" />
        <div className="mt-12 divide-y divide-line overflow-hidden rounded-xl border border-line md:mt-14">
          {platformFaqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 70}>
              <details className="group bg-base">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-7 py-6 focus-ring">
                  <h3 className="font-display text-[0.9375rem] font-medium text-ink">{faq.q}</h3>
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="px-7 pb-6 text-[0.9375rem] leading-relaxed text-ink-muted">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="See the console with your own telemetry in it."
        lede="We can run a two-week proof of value against a slice of your environment — real detections, real triage, real numbers on how much noise disappears."
        primaryLabel="Request a proof of value"
      />
    </>
  );
}
