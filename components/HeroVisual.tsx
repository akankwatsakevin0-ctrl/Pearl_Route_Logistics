"use client";
import dynamic from "next/dynamic";
import { use3DMode } from "@/lib/use3d";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

/** Static poster: shown first (fast LCP), and permanently if WebGL / motion is unavailable. */
export function GlobePoster() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of a globe with shipping routes connecting major ports">
      <defs>
        <radialGradient id="g" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#1b4278" />
          <stop offset="1" stopColor="#0b1f3a" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#g)" stroke="#3b78d8" strokeOpacity=".4" />
      {[60, 100, 140].map((rx) => (
        <ellipse key={rx} cx="200" cy="200" rx={rx} ry="150" fill="none" stroke="#6f9be0" strokeOpacity=".25" />
      ))}
      {[-80, -30, 30, 80].map((y) => (
        <ellipse key={y} cx="200" cy={200 + y} rx={Math.sqrt(150 * 150 - y * y)} ry="14" fill="none" stroke="#6f9be0" strokeOpacity=".2" />
      ))}
      <path d="M95 250 Q170 90 300 150" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M130 130 Q240 230 290 280" fill="none" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".7" />
      {[[95, 250], [300, 150], [130, 130], [290, 280]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#ff6b35" />
      ))}
    </svg>
  );
}

export default function HeroVisual() {
  const mode = use3DMode();
  return (
    <>
      {mode !== "3d" && (
        <div className="hero-fallback">
          <GlobePoster />
        </div>
      )}
      {mode === "3d" && (
        <div className="hero-canvas">
          <Globe />
        </div>
      )}
    </>
  );
}
