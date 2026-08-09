import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | AI-Based Cybersecurity Company in Kerala, India`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "cybersecurity company Kerala",
    "AI based security India",
    "AI cybersecurity India",
    "agentic AI cyber defence",
    "managed SOC India",
    "SOC as a service Kerala",
    "VAPT services India",
    "penetration testing Kerala",
    "incident response India",
    "cloud security services",
    "SIEM implementation",
    "ISO 27001 consultant India",
    "DPDPA compliance",
    "cybersecurity company Kozhikode",
    "cybersecurity Calicut",
    "DefenseNet Solutions",
  ],
  alternates: { canonical: site.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} | AI-Based Cybersecurity Company in Kerala, India`,
    description: site.description,
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | AI-Based Security`,
    description: site.description,
    images: ["/og/default.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/img/MainLogo.png",
  },
  verification: {
    google: site.verification.google,
    other: { "facebook-domain-verification": site.verification.facebookDomain },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#04060b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <JsonLd nodes={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
