"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, CircleAlert, Loader2 } from "lucide-react";
import { services, site } from "@/lib/site";

/**
 * The site is statically exported, so there is no server route to post to.
 * If NEXT_PUBLIC_FORM_ENDPOINT is configured (Formspree, Web3Forms, Basin,
 * a Worker — anything that accepts JSON), the form submits there. If it is
 * not configured, we fall back to composing a pre-filled email so the
 * enquiry never silently disappears.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

const urgencyOptions = [
  { value: "planning", label: "Planning / researching" },
  { value: "project", label: "Have a project to scope" },
  { value: "urgent", label: "Urgent — active security incident" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!ENDPOINT) {
      const body = [
        `Name: ${data.name}`,
        `Company: ${data.company || "—"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Service: ${data.service || "—"}`,
        `Urgency: ${data.urgency || "—"}`,
        "",
        data.message,
      ].join("\n");

      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
        data.subject || "Website enquiry",
      )}&body=${encodeURIComponent(body)}`;

      setStatus("sent");
      setMessage("Your email client should now be open with the enquiry pre-filled.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      form.reset();
      setStatus("sent");
      setMessage("Thanks — your enquiry is with us. We reply within one business day.");
    } catch {
      setStatus("error");
      setMessage(
        `Something went wrong sending the form. Please email ${site.contact.email} or call ${site.contact.phone}.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-start p-8 lg:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-signal/30 bg-emerald-signal/10 text-emerald-signal">
          <CircleCheck size={22} aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
          Message sent
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{message}</p>
        <p className="mt-6 text-sm text-ink-muted">
          For an active incident, do not wait for a reply — call{" "}
          <a
            href={`tel:${site.contact.phoneHref}`}
            className="font-medium text-cyan-signal hover:underline"
          >
            {site.contact.phone}
          </a>
          , answered 24/7.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 lg:p-10" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Company" name="company" autoComplete="organization" />
        <Field label="Email address" name="email" type="email" required autoComplete="email" />
        <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" />

        <Select label="Service of interest" name="service">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other / general enquiry</option>
        </Select>

        <Select label="Where are you in the process?" name="urgency">
          <option value="">Select one</option>
          {urgencyOptions.map((o) => (
            <option key={o.value} value={o.label}>
              {o.label}
            </option>
          ))}
        </Select>

        <div className="sm:col-span-2">
          <Field label="Subject" name="subject" required />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-[0.8125rem] font-medium text-ink">
            How can we help? <span className="text-rose-signal">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your environment, what prompted the enquiry, and any deadlines you are working to."
            className="mt-2 w-full resize-y rounded-lg border border-line bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-cyan-signal/50 focus:outline-none focus:ring-1 focus:ring-cyan-signal/40"
          />
        </div>
      </div>

      {/* Honeypot — bots fill this, humans never see it. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-ink-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line bg-void accent-[var(--color-cyan-signal)]"
        />
        <span>
          I agree to be contacted by email, phone or WhatsApp about this enquiry, and I accept the{" "}
          <Link href="/privacy-policy" className="text-cyan-signal hover:underline">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-and-conditions" className="text-cyan-signal hover:underline">
            terms
          </Link>
          .
        </span>
      </label>

      {status === "error" ? (
        <p className="mt-6 flex items-start gap-2.5 rounded-lg border border-rose-signal/30 bg-rose-signal/[0.07] px-4 py-3 text-[0.8125rem] text-rose-signal">
          <CircleAlert size={15} className="mt-0.5 shrink-0" aria-hidden />
          {message}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-8 w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 size={15} className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight size={15} aria-hidden />
          </>
        )}
      </button>

      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
        Typical reply within one business day
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-cyan-signal/50 focus:outline-none focus:ring-1 focus:ring-cyan-signal/40";

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[0.8125rem] font-medium text-ink">
        {label} {required ? <span className="text-rose-signal">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}

function Select({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[0.8125rem] font-medium text-ink">
        {label}
      </label>
      <select id={name} name={name} className={fieldClass} defaultValue="">
        {children}
      </select>
    </div>
  );
}
