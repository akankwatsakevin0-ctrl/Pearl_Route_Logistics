import Link from "next/link";
import { brand, services, stats, clients, testimonial } from "@/lib/brand";
import HeroVisual from "@/components/HeroVisual";
import ContainerSection from "@/components/ContainerSection";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import Icon from "@/components/Icon";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <HeroVisual />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Global freight & logistics</span>
            <h1 id="hero-h">{brand.tagline}</h1>
            <p>Freight, warehousing and last-mile delivery with live visibility. Your cargo arrives when we say it will.</p>
            <div className="hero-cta">
              <Magnetic><Link href="/quote" className="btn btn-primary">Get a quote</Link></Magnetic>
              <Magnetic><Link href="/tracking" className="btn btn-ghost">Track a shipment</Link></Magnetic>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Key figures">
        <div className="container">
          <div className="stats">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="stat"><b><Counter value={s.value} suffix={s.suffix} /></b><span>{s.label}</span></div>
              </Reveal>
            ))}
          </div>
          <p className="placeholder-note" style={{ marginTop: 16 }}>Placeholder figures, replace with verified numbers.</p>
        </div>
      </section>

      <ContainerSection />

      <section className="section" aria-labelledby="svc-h">
        <div className="container">
          <Reveal>
            <span className="eyebrow">What we do</span>
            <h2 id="svc-h">Every link in your supply chain.</h2>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <TiltCard>
                  <Icon name={s.icon} />
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <Link href={`/services#${s.id}`} style={{ color: "var(--accent)", fontWeight: 600 }}>Learn more →</Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="cl-h" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 id="cl-h" className="sr">Trusted by</h2>
          <p className="eyebrow" style={{ textAlign: "center" }}>Trusted by shippers worldwide</p>
          <div className="logos">{clients.map((c) => <span key={c}>{c}</span>)}</div>
          <p className="placeholder-note" style={{ textAlign: "center", marginTop: 16 }}>Placeholder client names, replace with real logos.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-h" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal>
            <figure className="card" style={{ margin: 0, padding: "clamp(24px, 5vw, 48px)" }}>
              <h2 id="t-h" className="sr">Customer testimonial</h2>
              <blockquote style={{ margin: 0, fontFamily: "var(--font-head)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", lineHeight: 1.3 }}>“{testimonial.quote}”</blockquote>
              <figcaption style={{ marginTop: 20, color: "var(--muted)" }}>{testimonial.name}, {testimonial.role}</figcaption>
              <p className="placeholder-note">Placeholder testimonial.</p>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="cta-h">
        <div className="container">
          <div className="cta-band">
            <h2 id="cta-h">Ready to ship smarter?</h2>
            <p style={{ maxWidth: "50ch", margin: "0 auto 24px" }}>Tell us your route and cargo. Get a tailored quote within one business day.</p>
            <Magnetic><Link href="/quote" className="btn btn-primary">Get a quote</Link></Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
