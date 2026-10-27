import type { Metadata } from "next";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { brand, stats } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name}: our story, network and certifications.`,
  alternates: { canonical: "/about" },
};

// PLACEHOLDER content
const certs = ["ISO 9001 (placeholder)", "C-TPAT (placeholder)", "IATA Accredited (placeholder)", "AEO (placeholder)"];
const network = [
  { h: "Fleet", p: "Owned and partner trucks, with GPS and temperature telemetry on every load." },
  { h: "Warehouses", p: "34 bonded and climate-controlled sites near major ports and hubs." },
  { h: "Partners", p: "Vetted ocean and air carriers on 120+ trade lanes." },
];

export default function About() {
  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">About us</span>
        <h1>Logistics, done precisely.</h1>
        <p style={{ maxWidth: "60ch", fontSize: "1.1rem" }}>
          Founded by operators frustrated with late cargo and opaque pricing, {brand.name} builds freight programs around visibility and accountability. (Placeholder story, replace with your history.)
        </p>

        <div className="stats" style={{ margin: "48px 0" }}>
          {stats.map((s) => (
            <div className="stat" key={s.label}><b><Counter value={s.value} suffix={s.suffix} /></b><span>{s.label}</span></div>
          ))}
        </div>

        <h2>Our network</h2>
        <div className="grid grid-3">
          {network.map((n, i) => (
            <Reveal key={n.h} delay={i * 0.06}><div className="card"><h3>{n.h}</h3><p>{n.p}</p></div></Reveal>
          ))}
        </div>

        <h2 style={{ marginTop: 56 }}>Certifications</h2>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: 0, listStyle: "none" }}>
          {certs.map((c) => <li key={c} className="card" style={{ padding: "12px 18px" }}>{c}</li>)}
        </ul>
        <p className="placeholder-note">Placeholder certifications. List only those you hold.</p>
      </div>
    </div>
  );
}
