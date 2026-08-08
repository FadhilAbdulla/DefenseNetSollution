import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { platformPillars } from "@/lib/site";

export function PlatformFlow() {
  return (
    <Section className="border-t border-line">
      <SectionHeading
        eyebrow="The DefenseNet platform"
        title={
          <>
            Four stages between an event
            <br className="hidden md:block" /> and a decision you can trust.
          </>
        }
        lede="Most security teams drown in alerts because every stage is manual. We automate the three stages machines are good at, and keep humans exactly where judgement is required."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 md:grid-cols-2 xl:grid-cols-4">
        {platformPillars.map((pillar, i) => (
          <Reveal key={pillar.name} delay={i * 90} className="group relative bg-base p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-signal/30 bg-cyan-signal/10 font-mono text-[0.7rem] font-semibold text-cyan-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan-signal">
                {pillar.name}
              </span>
            </div>

            <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.body}</p>

            <ul className="mt-5 flex flex-col gap-2">
              {pillar.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[0.8125rem] text-ink-muted">
                  <Check size={13} className="mt-1 shrink-0 text-cyan-signal" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-cyan-signal to-transparent transition-transform duration-500 group-hover:scale-x-100"
              aria-hidden
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <Link
          href="/platform"
          className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-signal focus-ring"
        >
          Explore the full architecture
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </Reveal>
    </Section>
  );
}
