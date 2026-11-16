import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fc4109",
        color: "#201e1f",
        fontSize: 46,
        fontWeight: 800,
        borderRadius: 9999,
      }}
    >
      p
    </div>,
    { ...size },
  );
}
