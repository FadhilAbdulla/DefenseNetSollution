import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <Section className="border-t border-line">
      <SectionHeading
        eyebrow="Client outcomes"
        title="Judged on what happens after the contract is signed."
        align="center"
      />

      <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 90}>
            <figure className="card flex h-full flex-col p-7">
              <Quote size={20} className="text-cyan-signal/50" aria-hidden />
              <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-signal/25 bg-cyan-signal/10 font-display text-sm font-semibold text-cyan-signal"
                  aria-hidden
                >
                  {t.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{t.name}</span>
                  <span className="block truncate font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-muted">
                    {t.role} · {t.org}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
