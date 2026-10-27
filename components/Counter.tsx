"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReduced } from "@/lib/use3d";

export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReduced();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) { setN(value); return; }
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduced]);

  const fmt = (x: number) => x.toLocaleString("en-US");
  return (
    <>
      <span ref={ref} aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(n)}{suffix}</span>
      <span className="sr">{fmt(value)}{suffix}</span>
    </>
  );
}
