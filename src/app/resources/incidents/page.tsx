import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { IncidentCard } from "@/components/resources/ResourceBits";
import { getIncidents, resourceKinds } from "@/lib/resources";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Major Cyber Incident Case Studies — Lessons Learned",
  description:
    "Case studies of landmark cyber incidents — SolarWinds, Colonial Pipeline, MOVEit, WannaCry, NotPetya, Change Healthcare, AIIMS Delhi, Saudi Aramco Shamoon and more — with root causes and the controls that would have helped.",
  path: "/resources/incidents/",
});

export default function IncidentsIndexPage() {
  const incidents = getIncidents();

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/resources/incidents/#collection"),
            name: "Incident case studies",
            description: resourceKinds.incidents.description,
            url: absoluteUrl("/resources/incidents/"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: incidents.map((inc, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(inc.path),
                name: inc.name,
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/" },
            { name: "Incident case studies", path: "/resources/incidents/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Incident case studies"
        title="Landmark breaches, reconstructed for defenders."
        lede={resourceKinds.incidents.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Incident case studies", path: "/resources/incidents/" },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          <li className="chip">{incidents.length} case studies</li>
          <li className="chip">
            {new Date(incidents[incidents.length - 1]?.occurred ?? Date.now()).getFullYear()}–
            {new Date(incidents[0]?.occurred ?? Date.now()).getFullYear()}
          </li>
        </ul>
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {incidents.map((incident, i) => (
            <Reveal key={incident.slug} delay={(i % 3) * 70}>
              <IncidentCard incident={incident} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Would your organisation have caught it?"
        lede="A tabletop exercise built on one of these incidents is the fastest way to find out — and to fix what it reveals before an attacker does."
      />
    </>
  );
}
