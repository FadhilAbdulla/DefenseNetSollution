/**
 * Decorative page backdrop: hairline grid, radial glows and a horizon fade.
 * Purely presentational — always aria-hidden and pointer-events-none.
 */
export function GridBackdrop({
  className = "",
  fade = true,
}: {
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid-backdrop opacity-[0.55] ${className}`}
      style={
        fade
          ? {
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 78%)",
            }
          : undefined
      }
    />
  );
}

export function Glow({
  className = "",
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "violet" | "emerald";
}) {
  const tint = {
    cyan: "bg-cyan-signal/[0.10]",
    violet: "bg-violet-signal/[0.10]",
    emerald: "bg-emerald-signal/[0.09]",
  }[color];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[120px] ${tint} ${className}`}
    />
  );
}
