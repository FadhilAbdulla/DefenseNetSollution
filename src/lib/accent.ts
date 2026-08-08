/**
 * Accent → Tailwind class map. Written out in full (rather than composed at
 * runtime) so Tailwind's scanner can see every class it needs to generate.
 */
export type Accent = "cyan" | "violet" | "emerald" | "amber" | "rose";

export const accentClasses: Record<
  Accent,
  { text: string; bg: string; border: string; glow: string; dot: string }
> = {
  cyan: {
    text: "text-cyan-signal",
    bg: "bg-cyan-signal/10",
    border: "border-cyan-signal/30",
    glow: "shadow-[0_0_40px_-12px_var(--color-cyan-signal)]",
    dot: "bg-cyan-signal",
  },
  violet: {
    text: "text-violet-signal",
    bg: "bg-violet-signal/10",
    border: "border-violet-signal/30",
    glow: "shadow-[0_0_40px_-12px_var(--color-violet-signal)]",
    dot: "bg-violet-signal",
  },
  emerald: {
    text: "text-emerald-signal",
    bg: "bg-emerald-signal/10",
    border: "border-emerald-signal/30",
    glow: "shadow-[0_0_40px_-12px_var(--color-emerald-signal)]",
    dot: "bg-emerald-signal",
  },
  amber: {
    text: "text-amber-signal",
    bg: "bg-amber-signal/10",
    border: "border-amber-signal/30",
    glow: "shadow-[0_0_40px_-12px_var(--color-amber-signal)]",
    dot: "bg-amber-signal",
  },
  rose: {
    text: "text-rose-signal",
    bg: "bg-rose-signal/10",
    border: "border-rose-signal/30",
    glow: "shadow-[0_0_40px_-12px_var(--color-rose-signal)]",
    dot: "bg-rose-signal",
  },
};
