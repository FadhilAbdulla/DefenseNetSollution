import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";
import { PageHero, type Crumb } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { ResourceCard } from "./ResourceBits";
import { accentClasses } from "@/lib/accent";
import { getService, site } from "@/lib/site";
import { formatDate } from "@/lib/markdown";
import type { Resource } from "@/lib/resources";

export type Fact = { k: string; v: ReactNode };

/**
 * Shared layout for CVE advisories and incident case studies: hero, key facts,
 * article body with contents, references, related resources and the services
 * that address the issue.
 */
export function ResourceDetail({
  resource,
  html,
  eyebrow,
  badges,
  facts,
  related,
  crumbs,
}: {
  resource: Resource;
  html: string;
  eyebrow: string;
  badges: ReactNode;
  facts: Fact[];
  related: Resource[];
  crumbs: Crumb[];
}) {
  const services = (resource.services ?? [])
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 3);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={resource.title} lede={resource.description} crumbs={crumbs}>
        <div className="flex flex-wrap items-center gap-2">
          {badges}
          <span className="chip">
            Reviewed <time dateTime={resource.updated ?? resource.date}>{formatDate(resource.updated ?? resource.date)}</time>
          </span>
          <span className="chip">{resource.readingTime} min read</span>
        </div>
      </PageHero>

      <Section className="!pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-16 lg:gap-y-8">
          {/* Key facts — first on phones, right-hand column on desktop */}
          <aside className="lg:col-start-2 lg:row-start-1">
            <div className="card p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cyan-signal">
                At a glance
              </p>
              <dl className="mt-4 flex flex-col divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.k} className="py-3 first:pt-0 last:pb-0">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                      {fact.k}
                    </dt>
                    <dd className="mt-1 break-words text-[0.875rem] leading-relaxed text-ink">{fact.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {resource.headings.length > 2 ? (
              <details className="card group mb-10">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted focus-ring [&::-webkit-details-marker]:hidden">
                  On this page
                  <ChevronDown
                    size={15}
                    className="transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <ul className="flex flex-col border-t border-line px-5 py-2">
                  {resource.headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${h.id}`}
                        className="block py-2.5 text-sm leading-snug text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}

            <article className="prose-dn min-w-0" dangerouslySetInnerHTML={{ __html: html }} />

            {resource.references?.length ? (
              <div className="mt-14 border-t border-line pt-8">
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                  References
                </h2>
                <ul className="mt-5 flex flex-col">
                  {resource.references.map((ref) => (
                    <li key={ref.url}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 py-2 text-[0.9375rem] text-cyan-signal hover:underline focus-ring"
                      >
                        {ref.label}
                        <ExternalLink size={13} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-10 rounded-lg border border-line bg-surface/60 p-4 text-[0.8125rem] leading-relaxed text-ink-muted">
              Compiled by the {site.name} security team from vendor advisories, government
              publications and public reporting. Details such as fixed versions can change after
              publication — always confirm against the vendor&rsquo;s current advisory before acting.
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            <div className="card p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cyan-signal">
                Need help with this?
              </p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">
                Our analysts can check whether you are exposed, hunt for signs of compromise and
                handle remediation with you.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5 w-full text-xs">
                Talk to an analyst
                <ArrowRight size={13} aria-hidden />
              </Link>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="mt-3 block py-2 text-center font-mono text-xs text-ink-muted hover:text-ink"
              >
                Incident line: {site.contact.phone}
              </a>
            </div>

            {resource.tags.length ? (
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Topics">
                {resource.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Section>

      {services.length ? (
        <Section className="border-t border-line">
          <SectionHeading eyebrow="How we help" title="Services that address this risk" />
          <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
            {services.map((service, i) => {
              const accent = accentClasses[service.accent];
              return (
                <Reveal key={service.slug} delay={i * 80}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="card card-hover group flex h-full flex-col p-7 focus-ring"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-lg border ${accent.border} ${accent.bg} ${accent.text}`}
                      >
                        <ServiceIcon name={service.icon} size={17} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-ink-muted transition-colors group-hover:text-cyan-signal"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-5 font-display text-[0.9375rem] font-semibold tracking-tight text-ink group-hover:text-cyan-signal">
                      {service.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-ink-muted line-clamp-3">
                      {service.summary}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section className="border-t border-line">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Related" title="Related advisories and case studies" />
            <Link href="/resources" className="btn btn-ghost">
              All resources
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.path} delay={i * 70}>
                <ResourceCard resource={r} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Worried this applies to you?"
        lede="Tell us what you run. We will tell you whether you are exposed, what to fix first, and whether anyone has already used it against you."
      />
    </>
  );
}
