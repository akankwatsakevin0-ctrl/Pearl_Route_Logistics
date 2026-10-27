"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { use3DMode } from "@/lib/use3d";

const ContainerScene = dynamic(() => import("./ContainerScene"), { ssr: false });

const steps = [
  { t: "Book", d: "One request. Rates, routing and capacity confirmed within hours." },
  { t: "Consolidate", d: "Loads are grouped to cut cost per unit and cut emissions." },
  { t: "Deliver", d: "Containers move port to door, tracked at every handoff." },
];

function StaticStack() {
  const rows = [0, 1, 2];
  return (
    <svg viewBox="0 0 360 260" role="img" aria-label="Illustration of stacked shipping containers" style={{ width: "100%", maxWidth: 480 }}>
      {rows.map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={30 + c * 105} y={170 - r * 62} width="100" height="56" rx="4"
            fill={(r + c) % 5 === 0 ? "#ff6b35" : ["#1b4278", "#2a5a9e", "#12305a"][(r + c) % 3]} stroke="#6f9be0" strokeOpacity=".3" />
        ))
      )}
    </svg>
  );
}

export default function ContainerSection() {
  const mode = use3DMode();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(v < 0.38 ? 0 : v < 0.72 ? 1 : 2));
  const is3d = mode === "3d";

  return (
    <section aria-labelledby="stack-h" ref={ref} className={`stack-wrap${is3d ? "" : " is-static"}`}>
      <div className="stack-sticky">
        <div className="container stack-inner">
          <div>
            <span className="eyebrow">How it moves</span>
            <h2 id="stack-h">From booking to doorstep.</h2>
            <ol style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 14 }}>
              {steps.map((s, i) => (
                <li key={s.t} className="card" style={{ padding: 18, opacity: !is3d || active === i ? 1 : 0.5, borderColor: is3d && active === i ? "var(--accent)" : undefined, transition: "opacity .3s, border-color .3s" }}>
                  <h3 style={{ margin: 0 }}>{i + 1}. {s.t}</h3>
                  <p style={{ margin: "4px 0 0" }}>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="stack-canvas" style={{ display: "grid", placeItems: "center" }}>
            {is3d ? <ContainerScene progress={scrollYProgress} /> : <StaticStack />}
          </div>
        </div>
      </div>
    </section>
  );
}
