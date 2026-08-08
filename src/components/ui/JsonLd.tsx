import { jsonLdGraph } from "@/lib/seo";

/** Injects a schema.org @graph document into the page. */
export function JsonLd({ nodes }: { nodes: object[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema content is generated from trusted, build-time site data.
      dangerouslySetInnerHTML={{ __html: jsonLdGraph(nodes) }}
    />
  );
}
