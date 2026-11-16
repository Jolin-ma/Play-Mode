import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Play Mode. Stories you can step into.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#201e1f";
const CREAM = "#f4efe8";
const ORANGE = "#fc4109";
const PINK = "#ffabc8";

/** Bold branded share image: oversized type, flat colour, one pill. */
/** Bricolage Grotesque ExtraBold (SIL Open Font License), bundled with the app. */
async function loadFont() {
  "use cache";
  const file = await readFile(join(process.cwd(), "src/app/og-font.woff"));
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
}

export default async function OpengraphImage() {
  const font = await loadFont();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: NIGHT,
        color: CREAM,
        padding: "56px 72px",
        position: "relative",
        fontFamily: "Bricolage",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -90,
          width: 420,
          height: 420,
          borderRadius: 9999,
          background: PINK,
        }}
      />
      <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
        play mode
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 116,
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: "-0.04em",
        }}
      >
        <div style={{ display: "flex" }}>Stories</div>
        <div style={{ display: "flex" }}>
          <span style={{ color: ORANGE, marginRight: 28 }}>you can</span>
        </div>
        <div style={{ display: "flex" }}>step into.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            background: PINK,
            color: NIGHT,
            fontSize: 30,
            fontWeight: 700,
            padding: "14px 30px",
            borderRadius: 9999,
          }}
        >
          Interactive stories
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }],
    },
  );
}
