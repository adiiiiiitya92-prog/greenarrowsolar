import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const alt = "Green Arrow Solar – Rooftop solar in Jabalpur & Madhya Pradesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo-mark.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(160deg,#7ec8f5 0%,#fff1cf 62%,#9ad9a3 100%)", color: "#0e2a1b", position: "relative" }}>
        <div style={{ position: "absolute", top: 60, right: 90, width: 190, height: 190, borderRadius: 999, background: "#f5a623", boxShadow: "0 0 90px 30px rgba(245,166,35,.6)" }} />
        <div style={{ display: "flex", background: "#fff", padding: "22px 34px", borderRadius: 28, alignSelf: "flex-start", boxShadow: "0 20px 50px -20px rgba(0,0,0,.3)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={150} height={100} alt="" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", marginLeft: 22 }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 800 }}><span style={{ color: "#15803d" }}>Green Arrow Solar</span></div>
            <div style={{ display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: 6, color: "#55606f" }}>PVT. LTD.</div>
          </div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color: "#1a7a22", letterSpacing: 4, marginTop: 44 }}>JABALPUR · MADHYA PRADESH</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, marginTop: 14, maxWidth: 900 }}>Rooftop solar with subsidy &amp; net-metering support</div>
        <div style={{ marginTop: 32, display: "flex", fontSize: 28, fontWeight: 700, background: "#1a7a22", color: "#fff", padding: "14px 32px", borderRadius: 999, alignSelf: "flex-start" }}>Free site survey</div>
      </div>
    ),
    size,
  );
}
