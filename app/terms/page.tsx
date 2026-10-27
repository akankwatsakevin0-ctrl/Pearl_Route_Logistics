import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>Terms of Service</h1>
        <p className="placeholder-note">TEMPLATE. Have legal counsel review and replace before launch.</p>
        <h2 style={{ fontSize: "1.4rem" }}>Use of this site</h2>
        <p>Content is provided for information. Quotes are estimates and not binding until confirmed in writing by {brand.name}.</p>
        <h2 style={{ fontSize: "1.4rem" }}>Services</h2>
        <p>Freight and logistics services are governed by a separate service agreement and applicable trade conditions.</p>
      </div>
    </div>
  );
}
