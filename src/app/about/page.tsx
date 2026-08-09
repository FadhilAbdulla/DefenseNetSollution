import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { coreValues, timeline, metrics, certifications, site, fullAddress } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Cybersecurity Company in Kozhikode, Kerala",
  description:
    "DefenseNet Solutions is a cybersecurity firm headquartered at HiLITE Business Park, Kozhikode, Kerala. Meet the team, mission and engineering principles behind our AI-assisted SOC.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        nodes={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About us"
        title="Enterprise-grade defence, built for businesses that were never offered it."
        lede="DefenseNet Solutions was founded in Kerala on a straightforward premise: the organisations most likely to be ruined by a breach are the ones least likely to be sold real security. We set out to change that."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Talk to the team
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/platform" className="btn btn-ghost">
            How we work
          </Link>
        </div>
      </PageHero>

      {/* Story + metrics */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              Who we are
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.8vw,2.5rem)] font-semibold leading-tight tracking-tight text-balance">
              A security team, not a reseller.
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-ink-muted">
              <p>
                We are a cybersecurity services firm headquartered in Kozhikode (Calicut), Kerala,
                serving clients across India and the Gulf. Our team spans security operations,
                offensive testing, incident response, cloud security and governance — the full
                lifecycle, under one roof.
              </p>
              <p>
                What we sell is judgement. Tooling is commodity; the difference between a security
                programme that works and one that generates paperwork is whether someone competent
                is looking at the output and acting on it. That is the part we are accountable for.
              </p>
              <p>
                We invest heavily in automation because analyst attention is the scarcest resource
                in this industry. Machine learning handles enrichment, correlation and triage at
                volume so our people spend their hours on the work that genuinely needs a human:
                investigation, containment decisions, and telling you the truth about what happened.
              </p>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
                Team certifications
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <li key={cert} className="chip px-3 py-1.5 text-[0.72rem] normal-case tracking-normal">
                    <ShieldCheck size={12} className="text-cyan-signal" aria-hidden />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-base p-7">
                  <p className="font-display text-3xl font-semibold tracking-tight text-gradient-signal">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">{metric.label}</p>
                  <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="card mt-5 p-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-signal">
                Headquarters
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">{fullAddress}</p>
              <div className="mt-5 flex flex-col gap-2 text-sm">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-cyan-signal hover:underline focus-ring"
                >
                  {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="font-mono text-ink-muted hover:text-ink focus-ring"
                >
                  {site.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section className="border-t border-line">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              label: "Mission",
              title: "Make real security reachable.",
              body: "To give businesses across India and the Gulf the kind of proactive, continuously-monitored defence that has historically been priced out of reach — so a breach is not the event that ends the company.",
            },
            {
              label: "Vision",
              title: "The default answer in South India.",
              body: "To be the cybersecurity partner that boards in Kerala, wider India and the Gulf name first — trusted for technical depth, ethical practice and an unwillingness to tell clients what they want to hear.",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <article className="card h-full p-8 lg:p-10">
                <span className="eyebrow">
                  <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
                  {item.label}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Values" title="Four things we do not trade away." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {coreValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 70} className="bg-base p-7">
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Trajectory" title="How we got here." />
        <ol className="mt-14 md:mt-16">
          {timeline.map((entry, i) => (
            <Reveal key={entry.year} delay={i * 60} as="li" className="group relative flex gap-6 md:gap-10">
              <div className="flex flex-col items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan-signal/30 bg-cyan-signal/[0.08] font-mono text-[0.68rem] font-semibold text-cyan-signal">
                  {entry.year.slice(2)}
                </span>
                {i < timeline.length - 1 ? (
                  <span className="w-px flex-1 bg-line" aria-hidden />
                ) : null}
              </div>
              <div className="pb-10">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
                  {entry.year}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
                  {entry.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Work with a team that will tell you when you do not need us."
        lede="Start with a conversation. If the honest answer is that your budget is better spent elsewhere first, that is what you will hear."
        primaryLabel="Get in touch"
      />
    </>
  );
}
