import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/JsonLd";
import { ResourceDetail } from "@/components/resources/ResourceDetail";
import {
  getIncidents,
  getResourceWithBody,
  getRelatedResources,
  findCveAdvisory,
  type IncidentStudy,
} from "@/lib/resources";
import { pageMetadata, breadcrumbSchema, resourceArticleSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getIncidents().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const incident = getIncidents().find((i) => i.slug === slug);
  if (!incident) return {};

  return pageMetadata({
    title: incident.title,
    description: incident.description,
    path: incident.path,
    type: "article",
    publishedTime: incident.date,
    modifiedTime: incident.updated ?? incident.date,
    tags: incident.tags,
  });
}

export default async function IncidentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loaded = await getResourceWithBody("incidents", slug);
  if (!loaded) notFound();

  const incident = loaded.resource as IncidentStudy;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources/" },
    { name: "Incident case studies", path: "/resources/incidents/" },
    { name: incident.name, path: incident.path },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          resourceArticleSchema({
            title: incident.title,
            description: incident.description,
            path: incident.path,
            date: incident.date,
            updated: incident.updated,
            tags: incident.tags,
            section: "Incident case studies",
            about: {
              "@type": "Event",
              name: incident.name,
              startDate: incident.occurred,
              description: incident.impact,
              location: { "@type": "Place", name: incident.region },
            },
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <ResourceDetail
        resource={incident}
        html={loaded.html}
        eyebrow={`Incident case study · ${new Date(incident.occurred).getFullYear()}`}
        crumbs={crumbs}
        related={getRelatedResources(incident)}
        badges={
          <span className="chip border-amber-signal/30 bg-amber-signal/[0.08] text-amber-signal">
            {incident.attackType}
          </span>
        }
        facts={[
          { k: "Organisation", v: incident.organisation },
          { k: "When", v: incident.period },
          { k: "Sector", v: incident.sector },
          { k: "Region", v: incident.region },
          { k: "Attack type", v: incident.attackType },
          ...(incident.actor ? [{ k: "Threat actor", v: incident.actor }] : []),
          { k: "Impact", v: incident.impact },
          ...(incident.cves?.length
            ? [
                {
                  k: "Vulnerabilities",
                  v: (
                    <span className="flex flex-col gap-1">
                      {incident.cves.map((id) => {
                        const advisory = findCveAdvisory(id);
                        return advisory ? (
                          <Link
                            key={id}
                            href={advisory.path}
                            className="font-mono text-cyan-signal hover:underline"
                          >
                            {id}
                          </Link>
                        ) : (
                          <a
                            key={id}
                            href={`https://nvd.nist.gov/vuln/detail/${id}`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="font-mono text-cyan-signal hover:underline"
                          >
                            {id}
                          </a>
                        );
                      })}
                    </span>
                  ),
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
