import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { industries } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Secure — Banking, Healthcare, Government & More",
  description:
    "Sector-specific cybersecurity for banking and finance, healthcare, government, IT and SaaS, manufacturing and OT, education, retail and logistics across India and the Gulf.",
  path: "/industries/",
});

const regulators = [
  { name: "RBI Cyber Security Framework", sector: "Banking & NBFCs" },
  { name: "CERT-In Directions (2022)", sector: "All Indian entities" },
  { name: "DPDPA 2023", sector: "Personal data processors" },
  { name: "SEBI CSCRF", sector: "Regulated market entities" },
  { name: "IRDAI Guidelines", sector: "Insurance" },
  { name: "ABDM Security Policy", sector: "Digital health" },
  { name: "PCI-DSS 4.0", sector: "Card data environments" },
  { name: "ISO/IEC 27001:2022", sector: "Cross-sector" },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Industries"
        title="Every sector has its own attackers, regulators and breaking points."
        lede="A ransomware crew targeting a hospital behaves nothing like a fraud ring targeting a bank. We build the detection set, the response plan and the compliance evidence around your sector — not a generic template."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries/" },
        ]}
      >
        <Link href="/contact" className="btn btn-primary">
          Discuss your sector
          <ArrowRight size={15} aria-hidden />
        </Link>
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 2) * 70}>
              <article className="card h-full p-8">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {industry.name}
                  </h2>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {industry.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {industry.highlights.map((h) => (
                    <li key={h} className="chip">
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Regulatory context"
          title="The frameworks Indian businesses are actually measured against."
          lede="We map one control set to every standard that applies to you, so a single piece of evidence satisfies several auditors at once."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {regulators.map((reg, i) => (
            <Reveal key={reg.name} delay={(i % 4) * 60} className="bg-base p-6">
              <h3 className="font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-ink">
                {reg.name}
              </h3>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                {reg.sector}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            href="/services/compliance-consulting"
            className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-signal focus-ring"
          >
            Compliance &amp; vCISO services
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </Section>

      <CtaBand
        title="Tell us your sector. We will tell you what usually goes wrong in it."
        lede="A short call with someone who has defended organisations like yours — including the attack paths that show up again and again in your industry."
      />
    </>
  );
}
