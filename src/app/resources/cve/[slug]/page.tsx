import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/JsonLd";
import { ResourceDetail } from "@/components/resources/ResourceDetail";
import { SeverityBadge, KevBadge } from "@/components/resources/ResourceBits";
import { getCves, getResourceWithBody, getRelatedResources, type CveAdvisory } from "@/lib/resources";
import { pageMetadata, breadcrumbSchema, resourceArticleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/markdown";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCves().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cve = getCves().find((c) => c.slug === slug);
  if (!cve) return {};

  return pageMetadata({
    title: cve.alias ? `${cve.cve} (${cve.alias}): Detection & Mitigation` : `${cve.cve}: Detection & Mitigation`,
    description: cve.description,
    path: cve.path,
    type: "article",
    publishedTime: cve.date,
    modifiedTime: cve.updated ?? cve.date,
    tags: [cve.cve, ...cve.tags],
  });
}

export default async function CvePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loaded = await getResourceWithBody("cve", slug);
  if (!loaded) notFound();

  const cve = loaded.resource as CveAdvisory;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources/" },
    { name: "CVE advisories", path: "/resources/cve/" },
    { name: cve.cve, path: cve.path },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          resourceArticleSchema({
            title: cve.title,
            description: cve.description,
            path: cve.path,
            date: cve.date,
            updated: cve.updated,
            tags: cve.tags,
            section: "CVE advisories",
            about: {
              "@type": "DefinedTerm",
              name: cve.alias ? `${cve.cve} (${cve.alias})` : cve.cve,
              termCode: cve.cve,
              inDefinedTermSet: "https://www.cve.org/",
              url: `https://nvd.nist.gov/vuln/detail/${cve.cve}`,
            },
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <ResourceDetail
        resource={cve}
        html={loaded.html}
        eyebrow={`CVE advisory · ${cve.cve}`}
        crumbs={crumbs}
        related={getRelatedResources(cve)}
        badges={
          <>
            <SeverityBadge severity={cve.severity} cvss={cve.cvss} />
            {cve.kev ? <KevBadge /> : null}
          </>
        }
        facts={[
          { k: "CVE ID", v: <span className="font-mono">{cve.cve}</span> },
          ...(cve.alias ? [{ k: "Also known as", v: cve.alias }] : []),
          { k: "Severity", v: `${cve.severity} — CVSS ${cve.cvss.toFixed(1)}` },
          { k: "Vendor", v: cve.vendor },
          { k: "Product", v: cve.product },
          { k: "Affected", v: cve.affected },
          { k: "Fixed in", v: cve.fixed },
          { k: "Disclosed", v: formatDate(cve.disclosed) },
          {
            k: "Exploited in the wild",
            v: cve.exploited ? "Yes" : "No confirmed exploitation",
          },
          { k: "CISA KEV", v: cve.kev ? "Listed" : "Not listed" },
          ...(cve.cwe ? [{ k: "Weakness", v: cve.cwe }] : []),
        ]}
      />
    </>
  );
}
