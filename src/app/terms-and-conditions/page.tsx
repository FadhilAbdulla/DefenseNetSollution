import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { site, fullAddress } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

const UPDATED = "August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of the DefenseNet Solutions website and our cybersecurity services, including WhatsApp Business communications.",
  path: "/terms-and-conditions/",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms & Conditions", path: "/terms-and-conditions/" },
          ]),
        ]}
      />

      <LegalLayout
        title="Terms & Conditions"
        updated={UPDATED}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms-and-conditions/" },
        ]}
        intro={
          <>
            These terms govern your use of the DefenseNet Solutions website and any services we
            provide. By accessing the site or engaging our services, you agree to be bound by them.
          </>
        }
      >
        <LegalSection title="1. About us">
          <p>
            <strong>DefenseNet Solutions</strong> is a cybersecurity company operating in Kerala,
            India, providing services including managed security operations, penetration testing,
            incident response, cloud security, SIEM engineering and compliance consulting.
          </p>
          <p>
            {fullAddress}
            <br />
            Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <br />
            Phone: {site.contact.phone}
          </p>
        </LegalSection>

        <LegalSection title="2. Use of the website">
          <p>By using this website, you agree that you will:</p>
          <ul>
            <li>Use it only for lawful purposes and in a way that does not infringe others&rsquo; rights</li>
            <li>
              Not attempt to gain unauthorised access to any part of the website, its servers or
              connected systems
            </li>
            <li>Not use the website to distribute malware, spam or harmful content</li>
            <li>
              Not reproduce, duplicate, copy or resell any portion of the website without our
              express written permission
            </li>
            <li>Provide accurate information when completing any form on the website</li>
          </ul>
          <p>
            We reserve the right to terminate access for any user who violates these terms. Security
            testing of this website is permitted only with our prior written authorisation.
          </p>
        </LegalSection>

        <LegalSection title="3. Services">
          <p>
            All services are subject to a separate written agreement or engagement letter between
            DefenseNet Solutions and the client. Nothing on this website constitutes a binding offer
            or a guarantee of service availability, pricing or timelines.
          </p>
          <p>
            Security testing services are performed only under a signed authorisation defining
            scope, rules of engagement and testing windows. We do not perform testing against
            systems the client does not own or is not authorised to permit testing on.
          </p>
          <p>
            We reserve the right to modify, suspend or discontinue any service at any time without
            prior notice.
          </p>
        </LegalSection>

        <LegalSection title="4. WhatsApp Business communications">
          <p>
            DefenseNet Solutions uses WhatsApp Business to communicate with clients and prospects. By
            providing your phone number and consenting on our forms, you agree to:
          </p>
          <ul>
            <li>Receive WhatsApp messages relating to your enquiry or our services</li>
            <li>
              The collection and processing of your phone number and message content as described in
              our <Link href="/privacy-policy">privacy policy</Link>
            </li>
          </ul>
          <p>
            You may opt out at any time by replying <strong>STOP</strong> or emailing{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Opting out will not
            affect any ongoing service engagement. Our use of WhatsApp Business is subject to
            Meta&rsquo;s WhatsApp Business Policy.
          </p>
        </LegalSection>

        <LegalSection title="5. Products">
          <p>
            Products operated by DefenseNet Solutions, including{" "}
            <Link href="/products/tenreply">Tenreply</Link>, are governed by their own terms of
            service available on the respective product website. Nothing in these terms overrides
            the terms applicable to a product you subscribe to.
          </p>
        </LegalSection>

        <LegalSection title="6. Quote requests and contact forms">
          <p>
            Submitting a quote request or contact form does not create a contractual obligation on
            either party. It is an expression of interest, and we will follow up to discuss your
            requirements. Formal engagements require a signed agreement.
          </p>
        </LegalSection>

        <LegalSection title="7. Intellectual property">
          <p>
            All content on this website — including text, graphics, logos, images, code, detection
            content and methodologies — is the intellectual property of DefenseNet Solutions or its
            licensors, protected under applicable intellectual property laws.
          </p>
          <p>
            You may not copy, reproduce, republish, transmit or distribute content from this website
            without our prior written consent, except for personal, non-commercial use with
            appropriate attribution.
          </p>
        </LegalSection>

        <LegalSection title="8. Disclaimer of warranties">
          <p>
            This website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis without warranties of any kind, express or implied. We do not
            warrant that:
          </p>
          <ul>
            <li>The website will be uninterrupted, error-free or free from harmful components</li>
            <li>The information on the website is complete, accurate or current</li>
            <li>Any specific security outcome will be achieved by using our services</li>
          </ul>
          <p>
            Content published on this website, including articles in our insights section, is
            provided for general information and does not constitute professional advice for your
            specific environment.
          </p>
        </LegalSection>

        <LegalSection title="9. Limitation of liability">
          <p>
            To the maximum extent permitted by law, DefenseNet Solutions shall not be liable for any
            indirect, incidental, special, consequential or punitive damages arising from your use
            of this website or our services. Our total liability for any claim arising out of or
            related to these terms shall not exceed the amount paid by you for the relevant service.
          </p>
          <p>
            Liability arising from a signed service engagement is governed by the terms of that
            agreement.
          </p>
        </LegalSection>

        <LegalSection title="10. Third-party links">
          <p>
            Our website may contain links to third-party websites, provided for convenience only. We
            have no control over their content and accept no responsibility for them or for any loss
            arising from your use of them.
          </p>
        </LegalSection>

        <LegalSection title="11. Privacy">
          <p>
            Your use of this website is also governed by our{" "}
            <Link href="/privacy-policy">privacy policy</Link>, which is incorporated into these
            terms by reference.
          </p>
        </LegalSection>

        <LegalSection title="12. Confidentiality">
          <p>
            Information exchanged during a service engagement is subject to the confidentiality
            provisions of the applicable service agreement. Information submitted through website
            forms is handled in accordance with our privacy policy.
          </p>
        </LegalSection>

        <LegalSection title="13. Governing law and jurisdiction">
          <p>
            These terms are governed by and construed in accordance with the laws of India. Any
            dispute arising from these terms or your use of this website shall be subject to the
            exclusive jurisdiction of the courts in Kozhikode, Kerala, India.
          </p>
        </LegalSection>

        <LegalSection title="14. Changes to these terms">
          <p>
            We may revise these terms at any time by updating this page. Continued use of the
            website after changes constitutes acceptance of the updated terms.
          </p>
        </LegalSection>

        <LegalSection title="15. Contact us">
          <p>
            Questions about these terms:
            <br />
            <strong>DefenseNet Solutions</strong>
            <br />
            {fullAddress}
            <br />
            Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <br />
            Phone: {site.contact.phone}
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
