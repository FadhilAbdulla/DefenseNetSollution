import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { accentClasses } from "@/lib/accent";
import { services } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, serviceCatalogSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cybersecurity Services — SOC, VAPT, IR, Cloud & Compliance",
  description:
    "Managed SOC, VAPT and red teaming, incident response, cloud security, SIEM engineering and compliance consulting from DefenseNet Solutions, Kerala. Serving India and the Gulf.",
  path: "/services/",
});

const engagementModels = [
  {
    name: "Managed retainer",
    body: "Continuous coverage with agreed SLAs — SOC monitoring, monthly detection engineering and a named analyst team. Billed monthly.",
  },
  {
    name: "Project engagement",
    body: "Fixed-scope work with a defined deliverable: a penetration test, a cloud posture assessment, an ISO 27001 readiness programme.",
  },
  {
    name: "Emergency response",
    body: "Same-day mobilisation for live incidents, billed on a time-and-materials basis with a capped estimate before work begins.",
  },
  {
    name: "Fractional vCISO",
    body: "A set number of senior security days per month for strategy, board reporting, vendor risk and architecture decisions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        nodes={[
          serviceCatalogSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Services"
        title="Security programmes built around the risk you actually carry."
        lede="Six practice areas covering detection, offence, response, cloud, engineering and governance. Engage one, or hand us the whole programme."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Scope an engagement
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/platform" className="btn btn-ghost">
            How our platform works
          </Link>
        </div>
      </PageHero>

      <Section>
        <div className="flex flex-col gap-5">
          {services.map((service, i) => {
            const accent = accentClasses[service.accent];
            return (
              <Reveal key={service.slug} delay={(i % 3) * 60}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card card-hover group grid gap-8 p-8 focus-ring lg:grid-cols-[1.25fr_1fr] lg:p-10"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
                      >
                        <ServiceIcon name={service.icon} size={19} />
                      </span>
                      <span
                        className={`font-mono text-[0.62rem] uppercase tracking-[0.2em] ${accent.text}`}
                      >
                        {service.eyebrow}
                      </span>
                    </div>

                    <h2 className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-cyan-signal">
                      {service.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
                      {service.summary}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-signal">
                      View service detail
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>

                  <div className="rounded-xl border border-line bg-void/40 p-6">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
                      What you get
                    </p>
                    <ul className="mt-4 flex flex-col gap-3">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-muted"
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                            aria-hidden
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Engagement models"
          title="Buy security the way it fits your budget cycle."
          lede="No mandatory multi-year commitments and no seven-figure minimums. Pick the commercial model that matches how you actually plan spend."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {engagementModels.map((model, i) => (
            <Reveal key={model.name} delay={i * 70} className="bg-base p-7">
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                {model.name}
              </h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">{model.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
