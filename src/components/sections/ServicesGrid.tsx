import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { accentClasses } from "@/lib/accent";
import { services } from "@/lib/site";

export function ServicesGrid({
  eyebrow = "Services",
  title = "Everything a modern security programme needs.",
  lede = "Six practice areas, one accountable team. Engage them individually or as a managed programme with a single point of contact.",
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  return (
    <Section className="border-t border-line">
      <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />

      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, i) => {
          const accent = accentClasses[service.accent];
          return (
            <Reveal key={service.slug} delay={(i % 3) * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="card card-hover group flex h-full flex-col p-7 focus-ring"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
                  >
                    <ServiceIcon name={service.icon} size={19} />
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="mt-1 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-signal"
                    aria-hidden
                  />
                </div>

                <p
                  className={`mt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] ${accent.text}`}
                >
                  {service.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.summary}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {service.stack.slice(0, 3).map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
