"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { primaryNav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "border-b border-line bg-void/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          {/* The logo artwork already carries the wordmark, so no text beside it. */}
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image
              src="/img/MainLogo.png"
              alt={site.name}
              width={1300}
              height={350}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active = isActive(item.href);

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-ring ${
                      active ? "text-cyan-signal" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const open = openMenu === item.label;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    aria-expanded={open}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-ring ${
                      active ? "text-cyan-signal" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </Link>

                  <div
                    className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3 transition-all duration-200 ${
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="glass overflow-hidden rounded-xl p-2 shadow-2xl shadow-black/60">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-elevated focus-ring"
                        >
                          <span className="block text-sm font-medium text-ink group-hover:text-cyan-signal">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-cyan-signal/40 hover:text-ink xl:flex focus-ring"
            >
              <Phone size={13} aria-hidden />
              {site.contact.phone}
            </a>
            <Link href="/contact" className="btn btn-primary hidden text-[0.8125rem] sm:inline-flex">
              Book an assessment
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-cyan-signal/40 lg:hidden focus-ring"
            >
              {mobileOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-void/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-base transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[var(--nav-h)] shrink-0 items-center justify-between border-b border-line px-5">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-muted">
              Navigation
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink focus-ring"
            >
              <X size={17} aria-hidden />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 font-display text-base font-medium transition-colors ${
                      isActive(item.href) ? "text-cyan-signal" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-2 py-2 text-sm text-ink-muted transition-colors hover:text-cyan-signal"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 space-y-3 border-t border-line px-5 py-5">
            <Link href="/contact" className="btn btn-primary w-full">
              Book an assessment
            </Link>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="btn btn-ghost w-full font-mono text-xs"
            >
              <Phone size={14} aria-hidden />
              {site.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
