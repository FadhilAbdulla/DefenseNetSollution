import { Reveal } from "./Reveal";
import { accentClasses, type Accent } from "@/lib/accent";

export type Phase = { name: string; duration: string; body: string };

/**
 * Engagement lifecycle diagram. Renders as a connected horizontal track on
 * wide screens and a vertical rail on narrow ones — the connector is drawn
 * with borders rather than SVG so it reflows with the grid automatically.
 */
export function PhaseFlow({ phases, accent = "cyan" }: { phases: Phase[]; accent?: Accent }) {
  const tone = accentClasses[accent];

  return (
    <div className="relative">
      {/* Horizontal rail (lg+) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[1.35rem] hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block"
        aria-hidden
      />

      <ol className="relative grid gap-8 lg:gap-5" style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}>
        {phases.map((phase, i) => (
          <Reveal
            as="li"
            key={phase.name}
            delay={i * 90}
            className="relative col-span-full flex gap-5 lg:col-span-1 lg:block"
          >
            {/* Vertical rail (mobile) */}
            <div className="flex flex-col items-center lg:hidden" aria-hidden>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${tone.border} ${tone.bg} font-mono text-xs font-semibold ${tone.text}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < phases.length - 1 ? <span className="w-px flex-1 bg-line" /> : null}
            </div>

            {/* Node (desktop) */}
            <span
              className={`hidden h-11 w-11 place-items-center rounded-full border ${tone.border} ${tone.bg} font-mono text-xs font-semibold ${tone.text} lg:grid`}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="pb-8 lg:pb-0 lg:pt-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {phase.name}
                </h3>
                <span
                  className={`font-mono text-[0.6rem] uppercase tracking-[0.14em] ${tone.text}`}
                >
                  {phase.duration}
                </span>
              </div>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-muted">{phase.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
