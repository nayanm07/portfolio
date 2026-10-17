import { ImageResponse } from "next/og";
import { config } from "@/data/config";

// Edge runtime: the Node runtime's font loading breaks on Windows ("Invalid URL")
export const runtime = "edge";

/**
 * Social preview image (Open Graph / Twitter) — what LinkedIn, WhatsApp, Slack
 * etc. show when the site is shared. Generated at build time; Next.js links it
 * from every page automatically.
 */
export const alt = `${config.author} — Full-Stack Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STACK = ["React / Next.js", "Node.js / NestJS", "React Native", "AI / LLM", "AWS"];

export default async function OpenGraphImage() {
  // Bundled with the route at build time (edge has no filesystem access)
  const logo = await fetch(new URL("../../public/assets/logo-mark.png", import.meta.url)).then((r) => r.arrayBuffer());
  const host = new URL(config.site).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(212,84,126,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(212,84,126,0.18), transparent 40%)",
          color: "#f0f0f0",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo + availability */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Satori accepts an ArrayBuffer as an image source */}
            <img src={logo as unknown as string} width={88} height={88} alt="" />
            <div style={{ fontSize: 26, color: "#d4547e" }}>{host}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid rgba(34,197,94,0.45)",
              backgroundColor: "rgba(34,197,94,0.1)",
              color: "#4ade80",
              fontSize: 24,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#4ade80" }} />
            Available for work
          </div>
        </div>

        {/* Middle: name + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#a1a1aa" }}>HI, I&apos;M</div>
          <div
            style={{
              marginTop: 8,
              fontSize: 112,
              fontWeight: 800,
              lineHeight: 1.1,
              paddingBottom: 12,
              backgroundImage: "linear-gradient(90deg, #a83d62, #d4547e, #e07a9c, #f5b8cc)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {config.author}
          </div>
          <div style={{ fontSize: 40, color: "#d4d4d8" }}>Full-Stack Software Engineer</div>
        </div>

        {/* Bottom: stack */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {STACK.map((s) => (
              <div
                key={s}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "2px solid #2a2a2a",
                  backgroundColor: "#0a0a0a",
                  fontSize: 22,
                  color: "#a1a1aa",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
