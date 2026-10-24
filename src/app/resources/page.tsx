import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { ResourceRow } from "@/components/resources/ResourceBits";
import { getCves, getIncidents, resourceKinds } from "@/lib/resources";
import { getAllPosts, getFeaturedPosts } from "@/lib/blog";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cybersecurity Resources — CVE Advisories & Incident Case Studies",
  description:
    "Free cybersecurity resources from DefenseNet Solutions: CVE advisories with detection and mitigation steps, case studies of major security incidents, and practical guides from our SOC and red team.",
  path: "/resources/",
});

export default function ResourcesPage() {
  const cves = getCves();
  const incidents = getIncidents();
  const posts = getAllPosts();

  const hubs = [
    {
      title: resourceKinds.cve.label,
      href: "/resources/cve/",
      count: `${cves.length} advisories`,
      icon: "bug",
      body: resourceKinds.cve.description,
    },
    {
      title: resourceKinds.incidents.label,
      href: "/resources/incidents/",
      count: `${incidents.length} case studies`,
      icon: "flame",
      body: resourceKinds.incidents.description,
    },
    {
      title: "Insights blog",
      href: "/blog/",
      count: `${posts.length} articles`,
      icon: "book-open",
      body: "Detection engineering walkthroughs, response playbooks, compliance explainers and AI security analysis from our analysts and testers.",
    },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/resources/#collection"),
            name: "Cybersecurity resources",
            url: absoluteUrl("/resources/"),
            description:
              "CVE advisories, incident case studies and practical security guides from DefenseNet Solutions.",
            hasPart: hubs.map((h) => ({
              "@type": "CollectionPage",
              name: h.title,
              url: absoluteUrl(h.href),
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Resources"
        title="Security knowledge you can act on today."
        lede="What our analysts and testers know about the vulnerabilities attackers exploit, the breaches that changed the industry, and how to defend against both — published openly."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
        ]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {hubs.map((hub, i) => (
            <Reveal key={hub.href} delay={i * 80}>
              <Link
                href={hub.href}
                className="card card-hover group flex h-full flex-col p-7 focus-ring lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-signal/30 bg-cyan-signal/10 text-cyan-signal">
                    <ServiceIcon name={hub.icon} size={19} />
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-ink-muted transition-colors group-hover:text-cyan-signal"
                    aria-hidden
                  />
                </div>
                <h2 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-cyan-signal">
                  {hub.title}
                </h2>
                <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-cyan-signal">
                  {hub.count}
                </p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {hub.body}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="CVE advisories"
              title="Vulnerabilities attackers actually used"
            />
            <Reveal className="mt-10">
              <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-base">
                {cves.slice(0, 7).map((cve) => (
                  <ResourceRow key={cve.slug} resource={cve} />
                ))}
              </div>
              <Link
                href="/resources/cve/"
                className="group mt-6 inline-flex items-center gap-2 py-2 text-sm font-medium text-cyan-signal focus-ring"
              >
                All {cves.length} CVE advisories
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div className="min-w-0">
            <SectionHeading eyebrow="Incident case studies" title="Breaches that changed the industry" />
            <Reveal className="mt-10">
              <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-base">
                {incidents.slice(0, 7).map((incident) => (
                  <ResourceRow key={incident.slug} resource={incident} />
                ))}
              </div>
              <Link
                href="/resources/incidents/"
                className="group mt-6 inline-flex items-center gap-2 py-2 text-sm font-medium text-cyan-signal focus-ring"
              >
                All {incidents.length} case studies
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Latest from the blog" />
          <Link href="/blog/" className="btn btn-ghost">
            All articles
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {getFeaturedPosts(3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Reading about a threat you think applies to you?"
        lede="We will tell you whether it does. A short call with an analyst beats another week of research."
      />
    </>
  );
}
