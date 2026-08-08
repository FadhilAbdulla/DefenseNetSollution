import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`band relative ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={`flex flex-col gap-4 ${centered ? "items-center text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <span className="eyebrow">
          <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-[clamp(1.85rem,4.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink text-balance">
        {title}
      </h2>
      {lede ? (
        <p className="text-[1.0625rem] leading-relaxed text-ink-muted text-pretty">{lede}</p>
      ) : null}
    </Reveal>
  );
}
