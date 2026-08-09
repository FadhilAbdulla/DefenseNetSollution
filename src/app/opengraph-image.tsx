import { ImageResponse } from "next/og";

// Required for `output: export` — the image is rendered once at build time.
export const dynamic = "force-static";

export const alt = "DefenseNet Solutions — AI-based security for India and the Gulf";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04060b",
          backgroundImage:
            "radial-gradient(1000px 500px at 15% -10%, rgba(34,211,238,0.18), transparent), radial-gradient(800px 420px at 95% 20%, rgba(167,139,250,0.16), transparent)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          <div
            style={{
              color: "#22d3ee",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            DefenseNet Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e8eefb",
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Cyber defence that</span>
            <span style={{ color: "#22d3ee" }}>thinks at machine speed.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#96a5bd",
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            AI-assisted 24/7 SOC · VAPT · Incident Response · Cloud Security · Compliance
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1b2537",
            paddingTop: 28,
            color: "#6a7994",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>defensenetsolutions.com</div>
          <div style={{ display: "flex" }}>Kozhikode, Kerala · India &amp; the Gulf</div>
        </div>
      </div>
    ),
    size,
  );
}
