import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/brand";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Freight forwarding, warehousing, last-mile delivery, customs clearance and supply-chain consulting.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">Services</span>
        <h1>Built for B2B freight.</h1>
        <p style={{ maxWidth: "52ch" }}>Five integrated services. Use one or all, with a single point of contact.</p>
        <div style={{ display: "grid", gap: 24, marginTop: 40 }}>
          {services.map((s, i) => (
            <Reveal key={s.id}>
              <section id={s.id} className="card" aria-labelledby={`${s.id}-h`} style={{ display: "grid", gap: 16, scrollMarginTop: 90 }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <Icon name={s.icon} />
                  <div>
                    <h2 id={`${s.id}-h`} style={{ fontSize: "1.8rem" }}>{String(i + 1).padStart(2, "0")} · {s.title}</h2>
                    <p style={{ maxWidth: "60ch" }}>{s.long}</p>
                    <Link href={`/quote?service=${s.id}`} className="btn btn-primary">Get a quote</Link>
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
