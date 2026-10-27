import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const runtime = "edge";
export const alt = brand.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0b1f3a,#1b4278)", color: "#e8eef7" }}>
        <div style={{ width: 28, height: 28, background: "#ff6b35", transform: "rotate(45deg)", marginBottom: 40 }} />
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{brand.name}</div>
        <div style={{ fontSize: 38, color: "#a9b8cf", marginTop: 20 }}>{brand.tagline}</div>
      </div>
    ),
    size
  );
}
