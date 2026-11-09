import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
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
          justifyContent: "center",
          padding: "80px",
          background: "#0b1220",
        }}
      >
        <div style={{ fontSize: 28, color: "#2dd4bf", fontFamily: "monospace" }}>Hi, my name is</div>
        <div style={{ fontSize: 96, fontWeight: 700, color: "#e2e8f0", marginTop: 16 }}>{site.name}</div>
        <div style={{ fontSize: 48, color: "#2dd4bf", marginTop: 12 }}>{site.title}</div>
      </div>
    ),
    size,
  );
}
