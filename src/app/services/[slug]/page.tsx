import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { PhaseFlow } from "@/components/ui/PhaseFlow";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { accentClasses } from "@/lib/accent";
import { services, getService, site } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, faqSchema, absoluteUrl } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: `${service.name} in India & the Gulf`,
    description: service.summary,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const accent = accentClasses[service.accent];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${service.slug}/#service`),
            name: service.name,
            serviceType: service.eyebrow,
            description: service.summary,
            url: absoluteUrl(`/services/${service.slug}/`),
            provider: { "@id": `${site.url}/#organization` },
            areaServed: ["India", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman", "Bahrain"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${service.name} capabilities`,
              itemListElement: service.capabilities.map((c, i) => ({
                "@type": "Offer",
                position: i + 1,
                itemOffered: { "@type": "Service", name: c.title, description: c.body },
              })),
            },
          },
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: service.short, path: `/services/${service.slug}/` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.name}
        lede={service.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
          { name: service.short, path: `/services/${service.slug}/` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Scope this engagement
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/services" className="btn btn-ghost">
            All services
          </Link>
        </div>
      </PageHero>

      {/* Outcomes */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text}`}
            >
              <ServiceIcon name={service.icon} size={24} />
            </span>
            <h2 className="mt-7 font-display text-2xl font-semibold leading-snug tracking-tight text-ink">
              What changes for you
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
              Outcomes we commit to in writing at the start of the engagement — measured, reported
              and reviewed with you.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {service.outcomes.map((outcome, i) => (
              <Reveal key={outcome} delay={i * 80} className="bg-base p-7">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{outcome}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Engagement lifecycle — visual */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="How it runs"
          title="The engagement, phase by phase"
          lede="No open-ended discovery. Each phase has a defined output and a date, agreed before we start."
        />
        <div className="mt-14 md:mt-16">
          <PhaseFlow phases={service.phases} accent={service.accent} />
        </div>
      </Section>

      {/* Capabilities */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Capabilities" title="What the engagement covers" />
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
          {service.capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 2) * 80}>
              <article className="card h-full p-7 lg:p-8">
                <div className="flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden />
                  <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                    {cap.title}
                  </h3>
                </div>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">{cap.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Deliverables + stack */}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              Deliverables
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              What lands in your inbox
            </h2>
            <ul className="mt-7 flex flex-col gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[0.9375rem] text-ink-muted">
                  <Check size={15} className="mt-1 shrink-0 text-cyan-signal" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              Tooling
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
              Platforms we work across
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
              We are vendor-agnostic. Where you already own a platform, we operate inside it; where
              you do not, we recommend based on fit and total cost, not partner margin.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {service.stack.map((tool) => (
                <li key={tool} className="chip px-3 py-1.5 text-[0.72rem] normal-case tracking-normal">
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQs */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Questions" title="Frequently asked" />
        <div className="mt-12 divide-y divide-line overflow-hidden rounded-xl border border-line md:mt-14">
          {service.faqs.map((faq, i) => (
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
                <p className="px-7 pb-6 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Other services */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Related" title="Other practice areas" />
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
          {others.map((other, i) => {
            const otherAccent = accentClasses[other.accent];
            return (
              <Reveal key={other.slug} delay={i * 80}>
                <Link
                  href={`/services/${other.slug}`}
                  className="card card-hover group flex h-full flex-col p-7 focus-ring"
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg border ${otherAccent.border} ${otherAccent.bg} ${otherAccent.text}`}
                  >
                    <ServiceIcon name={other.icon} size={17} />
                  </span>
                  <h3 className="mt-5 font-display text-[0.9375rem] font-semibold tracking-tight text-ink group-hover:text-cyan-signal">
                    {other.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-ink-muted line-clamp-3">
                    {other.summary}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand
        title={`Talk to someone who has delivered ${service.short} before.`}
        lede="A 30-minute scoping call gives you a realistic timeline, a firm price and an honest view of whether this is the right thing to spend on first."
      />
    </>
  );
}
