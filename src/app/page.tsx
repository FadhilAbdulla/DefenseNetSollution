import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PlatformFlow } from "@/components/sections/PlatformFlow";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ProductsTeaser } from "@/components/sections/ProductsTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestInsights } from "@/components/sections/LatestInsights";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, serviceCatalogSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI-Driven Cybersecurity Company in Kerala, India",
  description:
    "DefenseNet Solutions delivers AI-triaged 24/7 managed SOC, VAPT, incident response, cloud security, SIEM engineering and compliance consulting to businesses across India and the Gulf.",
  path: "/",
});

const homeFaqs = [
  {
    q: "What does DefenseNet Solutions do?",
    a: "DefenseNet Solutions is a cybersecurity company headquartered in Thalassery, Kannur, Kerala. We provide AI-assisted 24/7 managed SOC services, vulnerability assessment and penetration testing (VAPT), incident response and digital forensics, cloud security, SIEM and detection engineering, and compliance consulting for ISO 27001, SOC 2, PCI-DSS and India's DPDPA 2023.",
  },
  {
    q: "How is AI used in your security operations?",
    a: "AI handles the repetitive stages of detection work: enriching every alert with asset, identity and threat-intelligence context, baselining normal behaviour to surface anomalies, and clustering related alerts into a single incident narrative. Certified analysts validate every escalation — no incident reaches a client without human review.",
  },
  {
    q: "Which regions do you serve?",
    a: "We serve clients across India — with a concentration in Kerala, Karnataka, Tamil Nadu and Maharashtra — and across the Gulf Cooperation Council countries. Engagements are delivered remotely, on-site, or as a hybrid model.",
  },
  {
    q: "How much does a managed SOC cost for an Indian SME?",
    a: "Pricing depends on the number of endpoints, log volume and the response model you need. We build packages specifically for Indian SME budgets, using monthly retainers, project-based fees and subscription models rather than large fixed commitments. A scoping call gives you a firm number.",
  },
  {
    q: "How quickly can you respond to a live security incident?",
    a: "Our incident line is answered 24/7 on +91 86603 71224. For retained clients, containment actions begin within the first hour of engagement. For new clients we can typically mobilise the same day.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd nodes={[serviceCatalogSchema(), faqSchema(homeFaqs)]} />
      <Hero />
      <PlatformFlow />
      <ServicesGrid />
      <WhyUs />
      <IndustriesGrid limit={8} />
      <ProductsTeaser />
      <Testimonials />
      <LatestInsights />
      <CtaBand />
    </>
  );
}
