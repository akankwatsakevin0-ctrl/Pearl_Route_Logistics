import Link from "next/link";
import { brand, services } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="logo" style={{ margin: "0 0 12px" }}><i aria-hidden="true" />{brand.name}</p>
            <p>{brand.tagline}</p>
          </div>
          <div>
            <h3>Services</h3>
            {services.map((s) => <Link key={s.id} href={`/services#${s.id}`}>{s.title}</Link>)}
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/tracking">Track a shipment</Link>
            <Link href="/quote">Get a quote</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <address style={{ fontStyle: "normal", color: "var(--muted)" }}>
              {brand.address}<br />
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}>{brand.phone}</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </address>
            <div style={{ display: "flex", gap: 16 }}>
              {brand.socials.map((s) => <a key={s.label} href={s.href} rel="noopener noreferrer" target="_blank">{s.label}</a>)}
            </div>
          </div>
        </div>
        <div className="legal">
          © {new Date().getFullYear()} {brand.name}. &nbsp;
          <Link href="/privacy" style={{ display: "inline" }}>Privacy Policy</Link> · <Link href="/terms" style={{ display: "inline" }}>Terms</Link>
        </div>
      </div>
    </footer>
  );
}
