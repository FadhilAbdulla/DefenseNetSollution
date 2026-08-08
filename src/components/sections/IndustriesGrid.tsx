import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/lib/site";

export function IndustriesGrid({ limit }: { limit?: number }) {
  const list = limit ? industries.slice(0, limit) : industries;

  return (
    <Section className="border-t border-line">
      <SectionHeading
        eyebrow="Industries"
        title="Threat models differ. So should the defence."
        lede="A hospital, a bank and a factory floor face entirely different adversaries, regulators and tolerances for downtime. We build the programme around yours."
      />

      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
        {list.map((industry, i) => (
          <Reveal key={industry.slug} delay={(i % 4) * 70}>
            <article className="card card-hover flex h-full flex-col p-6">
              <h3 className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
                {industry.name}
              </h3>
              <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-ink-muted">
                {industry.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
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
  );
}
