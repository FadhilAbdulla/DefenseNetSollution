import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ResourceRow } from "@/components/resources/ResourceBits";
import { getCves, getIncidents } from "@/lib/resources";

export function ThreatAdvisories() {
  const cves = getCves().slice(0, 5);
  const incidents = getIncidents().slice(0, 5);
  if (!cves.length && !incidents.length) return null;

  const columns = [
    { title: "CVE advisories", href: "/resources/cve/", items: cves, cta: "All CVE advisories" },
    {
      title: "Incident case studies",
      href: "/resources/incidents/",
      items: incidents,
      cta: "All case studies",
    },
  ];

  return (
    <Section className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Resources"
          title="The vulnerabilities and breaches every defender should know."
          lede="Detection and mitigation guidance for the CVEs attackers actually exploit, and case studies of the incidents that changed how organisations defend themselves."
        />
        <Reveal delay={120}>
          <Link href="/resources" className="btn btn-ghost">
            All resources
            <ArrowRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-2 lg:gap-6">
        {columns.map((col, i) => (
          <Reveal key={col.href} delay={i * 90} className="min-w-0">
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-cyan-signal">
              {col.title}
            </h3>
            <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-base">
              {col.items.map((item) => (
                <ResourceRow key={item.path} resource={item} />
              ))}
            </div>
            <Link
              href={col.href}
              className="group mt-4 inline-flex items-center gap-2 py-2 text-sm font-medium text-cyan-signal focus-ring"
            >
              {col.cta}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
