import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GridBackdrop, Glow } from "@/components/ui/BackgroundFX";
import { site, whatsappLink } from "@/lib/site";

export function CtaBand({
  title = "Find out what an attacker would find first.",
  lede = "Book a no-obligation posture review. We map your external exposure, review your detection coverage, and give you a prioritised plan — whether or not you work with us.",
  primaryLabel = "Book an assessment",
  primaryHref = "/contact",
}: {
  title?: string;
  lede?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="band relative overflow-hidden border-t border-line">
      <GridBackdrop fade={false} className="opacity-[0.28]" />
      <Glow className="-bottom-24 left-1/2 h-[24rem] w-[44rem] -translate-x-1/2" color="violet" />
      <Glow className="-top-24 left-1/4 h-[20rem] w-[30rem]" color="cyan" />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
            Next step
          </span>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted text-pretty">
            {lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href={primaryHref} className="btn btn-primary">
              {primaryLabel}
              <ArrowRight size={15} aria-hidden />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
            >
              <MessageCircle size={15} aria-hidden />
              Chat on WhatsApp
            </a>
            <a href={`tel:${site.contact.phoneHref}`} className="btn btn-ghost font-mono text-xs">
              <Phone size={14} aria-hidden />
              {site.contact.phone}
            </a>
          </div>

          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-muted">
            Response within 24 hours · Incident line answered 24/7
          </p>
        </Reveal>
      </div>
    </section>
  );
}
