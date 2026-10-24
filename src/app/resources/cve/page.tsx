import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { CveCard } from "@/components/resources/ResourceBits";
import { getCves, resourceKinds } from "@/lib/resources";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CVE Advisories — Detection & Mitigation Guides",
  description:
    "Plain-English CVE advisories from DefenseNet Solutions: Log4Shell, MOVEit, Citrix Bleed, FortiOS, PAN-OS, Ivanti, ToolShell and more — affected versions, exploitation status, detection and mitigation steps.",
  path: "/resources/cve/",
});

export default function CveIndexPage() {
  const cves = getCves();
  const kevCount = cves.filter((c) => c.kev).length;
  const criticalCount = cves.filter((c) => c.severity === "Critical").length;

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/resources/cve/#collection"),
            name: "CVE advisories",
            description: resourceKinds.cve.description,
            url: absoluteUrl("/resources/cve/"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: cves.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(c.path),
                name: c.alias ? `${c.cve} (${c.alias})` : c.cve,
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/" },
            { name: "CVE advisories", path: "/resources/cve/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="CVE advisories"
        title="The vulnerabilities that mattered — and what to do about them."
        lede={resourceKinds.cve.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "CVE advisories", path: "/resources/cve/" },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          <li className="chip">{cves.length} advisories</li>
          <li className="chip border-rose-signal/35 bg-rose-signal/10 text-rose-signal">
            {criticalCount} critical
          </li>
          <li className="chip border-rose-signal/35 bg-rose-signal/10 text-rose-signal">
            {kevCount} known exploited (CISA KEV)
          </li>
        </ul>
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cves.map((cve, i) => (
            <Reveal key={cve.slug} delay={(i % 3) * 70}>
              <CveCard cve={cve} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between lg:p-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                Not sure which of these affect you?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                Our vulnerability management service checks your estate against actively exploited
                CVEs continuously, and tells you what to fix first.
              </p>
            </div>
            <Link href="/services/vulnerability-management" className="btn btn-primary shrink-0">
              Vulnerability management
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Exposed to a critical CVE right now?"
        lede="We can confirm exposure, hunt for signs of exploitation and patch or mitigate with you — starting today."
      />
    </>
  );
}
