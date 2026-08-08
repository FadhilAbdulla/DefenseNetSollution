import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { differentiators } from "@/lib/site";

export function WhyUs() {
  return (
    <Section className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          eyebrow="Why DefenseNet"
          title="Automation where it helps. People where it counts."
          lede="Plenty of vendors sell AI. Fewer will tell you where it stops. Here is exactly what the machines do, what our analysts do, and what you get either way."
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="bg-base p-6 lg:p-7">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-elevated text-cyan-signal">
                <ServiceIcon name={item.icon} size={16} />
              </span>
              <h3 className="mt-4 font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
