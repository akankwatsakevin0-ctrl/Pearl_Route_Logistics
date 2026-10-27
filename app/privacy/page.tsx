import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" }, robots: { index: true } };

export default function Privacy() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>Privacy Policy</h1>
        <p className="placeholder-note">TEMPLATE. Have legal counsel review and replace before launch.</p>
        <h2 style={{ fontSize: "1.4rem" }}>What we collect</h2>
        <p>Details you submit through our quote, contact and tracking forms (name, email, company, shipment details), plus basic analytics if enabled.</p>
        <h2 style={{ fontSize: "1.4rem" }}>How we use it</h2>
        <p>To respond to your request, provide quotes and services, and improve this site. We do not sell personal data.</p>
        <h2 style={{ fontSize: "1.4rem" }}>Contact</h2>
        <p>Questions? Email {brand.email}.</p>
      </div>
    </div>
  );
}
