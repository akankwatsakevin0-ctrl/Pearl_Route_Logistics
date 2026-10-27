"use client";
import { useEffect, useState } from "react";

export type Mode = "pending" | "3d" | "static";

/**
 * Decides whether to render WebGL. Falls back to static art when:
 *  - prefers-reduced-motion is set
 *  - WebGL is unavailable
 *  - the user has Data Saver on
 * Returns "pending" on the server / first paint so the static poster shows first (good for LCP/CLS).
 */
export function use3DMode(): Mode {
  const [mode, setMode] = useState<Mode>("pending");
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      let gl = false;
      try {
        const c = document.createElement("canvas");
        gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        gl = false;
      }
      const saveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData;
      setMode(mq.matches || !gl || saveData ? "static" : "3d");
    };
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);
  return mode;
}

export function usePrefersReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setR(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return r;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  return fine;
}
