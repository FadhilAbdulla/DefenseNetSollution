import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { accentClasses } from "@/lib/accent";
import { dubaiOffice, servicesByGroup, services, site, whatsappLink } from "@/lib/site";
import { getPostsByCategory } from "@/lib/blog";
import { pageMetadata, breadcrumbSchema, dubaiBusinessSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cybersecurity Company in Dubai — SOC, VAPT, WAF & Server Security",
  description:
    "DefenseNet Solutions in Dubai: 24/7 managed SOC, penetration testing, WAF and DDoS protection, server setup and migration, cloud, database and identity security, and UAE PDPL and DESC compliance. IT Center Building, Al Souq Al Kabeer, Dubai.",
  path: "/dubai/",
});

const regulations = [
  {
    name: "UAE PDPL",
    body: "Federal Decree-Law No. 45 of 2021 on personal data protection — security measures, breach notification to the UAE Data Office and limits on transfers abroad.",
  },
  {
    name: "DESC requirements",
    body: "The Dubai Electronic Security Center's Information Security Regulation and cloud standards for Dubai Government entities and their suppliers.",
  },
  {
    name: "UAE IA Regulation",
    body: "The UAE Information Assurance Regulation for federal entities and critical information infrastructure, widely used as a baseline.",
  },
  {
    name: "DIFC & ADGM",
    body: "Free-zone data protection regimes — the DIFC Data Protection Law 2020 and ADGM Data Protection Regulations 2021.",
  },
  {
    name: "Sector rules",
    body: "Central Bank of the UAE expectations for financial institutions, and health-data rules under Federal Law No. 2 of 2019.",
  },
  {
    name: "ISO 27001 & PCI DSS",
    body: "The international certifications enterprise customers, banks and card schemes ask Dubai businesses to hold.",
  },
];

const faqs = [
  {
    q: "Where is DefenseNet Solutions' office in Dubai?",
    a: `Our Dubai office is at ${dubaiOffice.address}, phone ${dubaiOffice.phone}. We also operate from our headquarters in Kozhikode, Kerala, India, which runs our 24/7 security operations centre.`,
  },
  {
    q: "Which cybersecurity services do you provide in Dubai?",
    a: `All ${services.length} of our services are available to clients in Dubai and across the UAE, including 24/7 managed SOC, penetration testing, WAF and DDoS protection, server setup and hardening, server and cloud migration, database security, identity security, incident response and UAE compliance consulting.`,
  },
  {
    q: "Can you help us comply with the UAE PDPL and DESC requirements?",
    a: "Yes. We run gap assessments against the UAE PDPL, DESC requirements, the UAE IA Regulation, ISO 27001 and sector rules, then build a single mapped control set so one piece of evidence serves several audits.",
  },
  {
    q: "Can our data stay inside the UAE?",
    a: "Yes. We deploy and migrate workloads into UAE cloud regions — such as Microsoft Azure UAE North and AWS Middle East (UAE) — and local data centres, and document data residency for your compliance records.",
  },
  {
    q: "What should we do if we are under attack right now?",
    a: `Call our 24/7 incident line on ${site.contact.phone}. Do not wipe or rebuild affected machines — isolate them from the network if you safely can, and preserve evidence.`,
  },
];

export default function DubaiPage() {
  const articles = getPostsByCategory("uae-dubai");

  return (
    <>
      <JsonLd
        nodes={[
          dubaiBusinessSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Dubai", path: "/dubai/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Dubai · United Arab Emirates"
        title="Cybersecurity services in Dubai, backed by a 24/7 SOC."
        lede="Managed SOC, penetration testing, WAF and DDoS protection, server setup and migration, cloud, database and identity security — and the UAE compliance work that goes with them — for businesses across Dubai and the wider UAE."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Dubai", path: "/dubai/" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Talk to our Dubai team
            <ArrowRight size={15} aria-hidden />
          </Link>
          <a href={`tel:${dubaiOffice.phoneHref}`} className="btn btn-ghost font-mono text-xs">
            <Phone size={14} aria-hidden />
            {dubaiOffice.phone}
          </a>
        </div>
      </PageHero>

      {/* Office */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="card p-6 sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-signal/30 bg-cyan-signal/10 text-cyan-signal">
                <MapPin size={19} aria-hidden />
              </span>
              <h2 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
                Our Dubai office
              </h2>
              <address className="mt-3 text-[0.9375rem] not-italic leading-relaxed text-ink-muted">
                {dubaiOffice.address}
              </address>
              <ul className="mt-6 flex flex-col">
                <li>
                  <a
                    href={`tel:${dubaiOffice.phoneHref}`}
                    className="flex items-center gap-2.5 py-2 text-sm text-ink-muted hover:text-cyan-signal focus-ring"
                  >
                    <Phone size={15} className="text-cyan-signal" aria-hidden />
                    {dubaiOffice.phone} — Dubai office
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="flex items-center gap-2.5 py-2 text-sm text-ink-muted hover:text-cyan-signal focus-ring"
                  >
                    <Phone size={15} className="text-cyan-signal" aria-hidden />
                    {site.contact.phone} — incident line answered 24/7
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-2.5 py-2 text-sm text-ink-muted hover:text-cyan-signal focus-ring"
                  >
                    <Mail size={15} className="text-cyan-signal" aria-hidden />
                    {site.contact.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dubaiOffice.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-ghost"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} aria-hidden />
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                  WhatsApp us
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Why DefenseNet in Dubai"
              title="Local presence, round-the-clock operations."
            />
            <ul className="mt-8 flex flex-col gap-4">
              {[
                "A Dubai office for meetings, workshops and on-site work, with our 24/7 security operations centre behind it.",
                "Coverage aligned to UAE working hours and the Saturday–Sunday weekend — when attackers prefer to strike.",
                "Experience with the frameworks UAE organisations answer to: the PDPL, DESC requirements, the UAE IA Regulation, DIFC and ADGM.",
                "Workloads deployed and migrated into UAE cloud regions when data must stay in-country.",
                "Certified practitioners (OSCP, CISSP, CEH) — the people who write your report are the people who did the work.",
              ].map((point) => (
                <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-signal" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Services */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Services in Dubai"
          title={`${services.length} security services, one accountable team.`}
          lede="Every service we offer is available to clients in Dubai and across the UAE. Each links to the full scope, process and deliverables."
        />
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          {servicesByGroup.map((group, i) => (
            <Reveal key={group.id} delay={(i % 2) * 80}>
              <div className="card h-full p-6 sm:p-7">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cyan-signal">
                  {group.label}
                </p>
                <ul className="mt-4 flex flex-col">
                  {group.services.map((service) => {
                    const accent = accentClasses[service.accent];
                    return (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-center gap-3 rounded-lg py-2.5 transition-colors focus-ring"
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${accent.border} ${accent.bg} ${accent.text}`}
                          >
                            <ServiceIcon name={service.icon} size={15} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.9375rem] font-medium text-ink group-hover:text-cyan-signal">
                              {service.name}
                            </span>
                            <span className="block text-[0.8125rem] text-ink-muted">{service.tagline}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Regulations */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="UAE compliance"
          title="The rules Dubai organisations answer to."
          lede="Our compliance work maps one set of controls to every framework that applies to you. Read the full guide for detail."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {regulations.map((reg, i) => (
            <Reveal key={reg.name} delay={(i % 3) * 70} className="bg-base p-6 sm:p-7">
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">{reg.name}</h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">{reg.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <Link
            href="/blog/uae-cybersecurity-compliance-guide/"
            className="group -my-2 inline-flex items-center gap-2 py-2 text-sm font-medium text-cyan-signal focus-ring"
          >
            Read the UAE cybersecurity compliance guide
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </Section>

      {/* Articles */}
      {articles.length ? (
        <Section className="border-t border-line">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Guides for UAE businesses"
              title="Security guidance written for Dubai."
            />
            <Link href="/blog/category/uae-dubai/" className="btn btn-ghost">
              All {articles.length} UAE articles
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
            {articles.slice(0, 9).map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 70}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Questions" title="Cybersecurity in Dubai — frequently asked" />
        <div className="mt-12 divide-y divide-line overflow-hidden rounded-xl border border-line md:mt-14">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-base">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 focus-ring sm:px-7 sm:py-6">
                <h3 className="font-display text-[0.9375rem] font-medium text-ink">{faq.q}</h3>
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-ink-muted sm:px-7">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Talk to our Dubai team."
        lede="A short scoping call gives you a realistic plan, a firm price and an honest view of what to fix first — whether or not you work with us."
      />
    </>
  );
}
