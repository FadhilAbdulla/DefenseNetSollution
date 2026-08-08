import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import type { Crumb } from "@/components/ui/PageHero";

export function LegalLayout({
  title,
  updated,
  intro,
  crumbs,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={`Last updated: ${updated}`} title={title} lede={intro} crumbs={crumbs} />
      <Section>
        <div className="prose-dn max-w-3xl [&>h2:first-child]:mt-0">{children}</div>
      </Section>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <>
      <h2 id={id}>{title}</h2>
      {children}
    </>
  );
}
