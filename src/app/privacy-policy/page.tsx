import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/LegalLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { site, fullAddress } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

const UPDATED = "August 2026";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How DefenseNet Solutions collects, uses, stores and protects personal data, including WhatsApp Business communications, in compliance with India's DPDPA 2023.",
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy/" },
          ]),
        ]}
      />

      <LegalLayout
        title="Privacy Policy"
        updated={UPDATED}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy/" },
        ]}
        intro={
          <>
            This policy explains how DefenseNet Solutions collects, uses, discloses and safeguards
            your information when you visit our website or interact with us through any channel,
            including WhatsApp Business.
          </>
        }
      >
        <p>
          DefenseNet Solutions (&ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) is
          committed to protecting your privacy. By using our website or contacting us through any
          channel, you agree to the practices described in this policy.
        </p>

        <LegalSection title="1. Who we are">
          <p>
            <strong>DefenseNet Solutions</strong>
            <br />
            {fullAddress}
            <br />
            Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <br />
            Phone: {site.contact.phone}
          </p>
          <p>
            For the purposes of India&rsquo;s Digital Personal Data Protection Act, 2023, DefenseNet
            Solutions acts as a Data Fiduciary in respect of personal data collected through this
            website and our business channels.
          </p>
        </LegalSection>

        <LegalSection title="2. Information we collect">
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>
              <strong>Contact information</strong> — name, email address, phone number, company
              name.
            </li>
            <li>
              <strong>Enquiry details</strong> — message content, service of interest, and any other
              information you include in a contact or quote request form.
            </li>
            <li>
              <strong>WhatsApp communications</strong> — where you contact us via WhatsApp Business,
              we may collect your WhatsApp display name, phone number and message content.
            </li>
            <li>
              <strong>Engagement data</strong> — information exchanged during a security engagement,
              handled under the confidentiality terms of the applicable service agreement.
            </li>
          </ul>
          <p>We also collect limited technical information automatically when you visit the site:</p>
          <ul>
            <li>IP address, browser type and device type</li>
            <li>Pages visited, referring website and time spent on the site</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. How we use your information">
          <ul>
            <li>To respond to your enquiries and provide the services you request</li>
            <li>To send quotes, proposals and service-related communications</li>
            <li>
              To communicate with you by email, phone or WhatsApp Business — only where you have
              given consent
            </li>
            <li>To send newsletters or updates — only where you have opted in</li>
            <li>To improve our website and service offerings</li>
            <li>To comply with applicable legal and regulatory obligations</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. WhatsApp Business communications">
          <p>
            We use WhatsApp Business to communicate with clients and prospects who have explicitly
            consented to receive messages via WhatsApp. By providing your phone number and giving
            consent on our contact forms, you agree to be contacted through WhatsApp Business.
          </p>
          <ul>
            <li>We only send messages relevant to your enquiry or our services</li>
            <li>
              You can opt out at any time by replying <strong>STOP</strong> or emailing{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
            <li>We do not share your WhatsApp data with third parties for marketing purposes</li>
            <li>
              WhatsApp messages are processed in accordance with Meta&rsquo;s privacy policy and the
              WhatsApp Business Policy
            </li>
          </ul>
          <p>
            Separately, DefenseNet Solutions operates{" "}
            <Link href="/products/tenreply">Tenreply</Link>, a WhatsApp Business API platform. Data
            processed through Tenreply on behalf of its business customers is governed by the
            Tenreply terms and privacy notice available at{" "}
            <a href="https://tenreply.com" target="_blank" rel="noreferrer noopener">
              tenreply.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="5. Legal basis for processing">
          <ul>
            <li>
              <strong>Consent</strong> — where you have explicitly agreed, such as through contact
              forms, WhatsApp opt-in or newsletter sign-up
            </li>
            <li>
              <strong>Legitimate uses and contractual necessity</strong> — to respond to service
              enquiries and perform engagements you have commissioned
            </li>
            <li>
              <strong>Legal obligation</strong> — where processing is required by applicable law
            </li>
          </ul>
          <p>
            We process personal data in accordance with the Digital Personal Data Protection Act,
            2023 (India), and, where applicable to visitors located in the EEA or UK, the GDPR.
          </p>
        </LegalSection>

        <LegalSection title="6. Sharing your information">
          <p>
            We do not sell, trade or rent your personal information. We may share it only in the
            following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service providers</strong> — trusted processors that help us operate our
              business, such as email and analytics platforms, bound by confidentiality and data
              protection obligations
            </li>
            <li>
              <strong>Legal compliance</strong> — where required by law, court order or a competent
              governmental authority
            </li>
            <li>
              <strong>Business transfer</strong> — in the event of a merger, acquisition or asset
              sale, subject to equivalent protection
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="7. Data retention">
          <p>
            We retain personal data only for as long as necessary to fulfil the purposes described
            in this policy, or as required by law. Enquiry and communication data is typically
            retained for up to three years. Engagement records are retained in accordance with the
            applicable service agreement and professional obligations. You may request deletion at
            any time.
          </p>
        </LegalSection>

        <LegalSection title="8. Cookies">
          <p>Our website may use cookies and similar technologies:</p>
          <ul>
            <li>
              <strong>Essential cookies</strong> — required for the website to function
            </li>
            <li>
              <strong>Analytics cookies</strong> — to understand how visitors use the site, where
              enabled
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling them may affect some
            website functionality.
          </p>
        </LegalSection>

        <LegalSection title="9. Your rights">
          <p>Subject to applicable law, you have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> — obtain a summary of the personal data we process about you
            </li>
            <li>
              <strong>Correction and completion</strong> — request correction of inaccurate or
              incomplete data
            </li>
            <li>
              <strong>Erasure</strong> — request deletion of your personal data
            </li>
            <li>
              <strong>Withdraw consent</strong> — at any time, without affecting the lawfulness of
              prior processing
            </li>
            <li>
              <strong>Nominate</strong> — nominate another individual to exercise your rights in the
              event of death or incapacity, as provided under the DPDPA 2023
            </li>
            <li>
              <strong>Grievance redressal</strong> — raise a complaint with us, and escalate to the
              Data Protection Board of India if unresolved
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We will respond within
            30 days.
          </p>
        </LegalSection>

        <LegalSection title="10. Security">
          <p>
            As a cybersecurity company, we take data security seriously. We implement appropriate
            technical and organisational measures — including encryption in transit, access control,
            logging and least-privilege administration — to protect personal data against
            unauthorised access, alteration, disclosure or destruction. No transmission over the
            internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </LegalSection>

        <LegalSection title="11. Third-party links">
          <p>
            Our website may contain links to third-party websites. We are not responsible for their
            privacy practices or content, and we encourage you to review their policies before
            providing personal information.
          </p>
        </LegalSection>

        <LegalSection title="12. Children's privacy">
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect
            personal data from children. If you believe a child has provided us with personal data,
            contact us and we will delete it promptly.
          </p>
        </LegalSection>

        <LegalSection title="13. Changes to this policy">
          <p>
            We may update this policy from time to time. The updated version will be posted on this
            page with a revised &ldquo;last updated&rdquo; date. Continued use of our website or
            services after changes constitutes acceptance of the updated policy.
          </p>
        </LegalSection>

        <LegalSection title="14. Contact us">
          <p>
            Questions or concerns about this policy or how we handle your data:
            <br />
            <strong>DefenseNet Solutions</strong>
            <br />
            {fullAddress}
            <br />
            Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <br />
            Phone: {site.contact.phone}
          </p>
          <p>
            See also our <Link href="/terms-and-conditions">terms and conditions</Link>.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
