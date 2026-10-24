"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { ArrowRight, ChevronDown, Menu, X, Phone } from "lucide-react";
import { primaryNav, site, type NavItem, type NavLink } from "@/lib/site";

const allLinks = (item: NavItem): NavLink[] =>
  item.groups ? item.groups.flatMap((g) => g.items) : (item.children ?? []);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerNav = useRef<HTMLElement>(null);

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

  // Move focus into the drawer so keyboard and screen-reader users land in it.
  useEffect(() => {
    if (mobileOpen) drawerNav.current?.querySelector("a")?.focus();
  }, [mobileOpen]);

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

  const matches = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isActive = (item: NavItem) =>
    matches(item.href) || (item.match ?? []).some((prefix) => matches(prefix));

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  // Keep a dropdown open while keyboard focus is anywhere inside it.
  const onMenuBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
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

          {/* Desktop nav — `relative` so mega menus can centre on the whole bar */}
          <nav className="relative hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active = isActive(item);
              const links = allLinks(item);

              if (!links.length) {
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
              const mega = Boolean(item.groups);
              return (
                <div
                  key={item.href}
                  className={mega ? "" : "relative"}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                  onFocus={() => setOpenMenu(item.label)}
                  onBlur={onMenuBlur}
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
                    inert={!open}
                    className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                      mega ? "w-[min(54rem,calc(100vw-2rem))]" : "w-[22rem]"
                    } ${
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="glass overflow-hidden rounded-xl p-2 shadow-2xl shadow-black/60">
                      {item.groups ? (
                        <>
                          <div className="grid grid-cols-4 gap-x-1 p-2">
                            {item.groups.map((group) => (
                              <div key={group.label}>
                                <p className="px-3 pb-1.5 pt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cyan-signal">
                                  {group.label}
                                </p>
                                {group.items.map((child) => (
                                  <DropdownLink key={child.href} link={child} compact />
                                ))}
                              </div>
                            ))}
                          </div>
                          <Link
                            href={item.href}
                            className="group mt-1 flex items-center justify-between rounded-lg border-t border-line px-5 py-3 text-sm font-medium text-cyan-signal transition-colors hover:bg-elevated focus-ring"
                          >
                            View all {links.length} services
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-1"
                              aria-hidden
                            />
                          </Link>
                        </>
                      ) : (
                        links.map((child) => <DropdownLink key={child.href} link={child} />)
                      )}
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
            {/* Phones lose the header CTA, so keep the incident line one tap away. */}
            <a
              href={`tel:${site.contact.phoneHref}`}
              aria-label={`Call ${site.contact.phone}`}
              className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-signal/30 bg-cyan-signal/10 text-cyan-signal transition-colors hover:border-cyan-signal/60 sm:hidden focus-ring"
            >
              <Phone size={17} aria-hidden />
            </a>

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
        inert={!mobileOpen}
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
          {/* The fixed header (and its close button) sits over this strip. */}
          <div className="h-[var(--nav-h)] shrink-0 border-b border-line" aria-hidden />

          <nav ref={drawerNav} className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => {
                const links = allLinks(item);
                const expanded = mobileSection === item.label;
                const panelId = `mobile-${item.label.toLowerCase()}`;
                return (
                  <li key={item.href}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`block flex-1 rounded-lg px-3 py-3 font-display text-base font-medium transition-colors ${
                          isActive(item) ? "text-cyan-signal" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {links.length ? (
                        <button
                          type="button"
                          onClick={() => setMobileSection(expanded ? null : item.label)}
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          aria-label={`${expanded ? "Hide" : "Show"} ${item.label} links`}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:text-ink focus-ring"
                        >
                          <ChevronDown
                            size={17}
                            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                      ) : null}
                    </div>

                    {links.length && expanded ? (
                      <div id={panelId} className="mb-2 ml-3 border-l border-line pl-3">
                        {(item.groups ?? [{ label: "", items: links }]).map((group) => (
                          <div key={group.label || item.label} className="py-1">
                            {group.label ? (
                              <p className="px-2 pb-1 pt-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cyan-signal">
                                {group.label}
                              </p>
                            ) : null}
                            <ul className="flex flex-col">
                              {group.items.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block rounded-md px-2 py-2.5 text-sm text-ink-muted transition-colors hover:text-cyan-signal"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              })}
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

function DropdownLink({ link, compact = false }: { link: NavLink; compact?: boolean }) {
  return (
    <Link
      href={link.href}
      title={compact ? link.description : undefined}
      className={`group block rounded-lg px-3 transition-colors hover:bg-elevated focus-ring ${
        compact ? "py-1.5" : "py-2.5"
      }`}
    >
      <span className="block text-sm font-medium text-ink group-hover:text-cyan-signal">
        {link.label}
      </span>
      {link.description && !compact ? (
        <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
          {link.description}
        </span>
      ) : null}
    </Link>
  );
}
