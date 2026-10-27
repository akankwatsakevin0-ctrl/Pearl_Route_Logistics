import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import ContactForm from "@/components/ContactForm";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Request a freight quote or contact our team. We reply within one business day.",
  alternates: { canonical: "/quote" },
};

export default function Quote() {
  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">Quote & contact</span>
        <h1>Get a quote in a day.</h1>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginTop: 32, alignItems: "start" }}>
          <section className="card" aria-labelledby="q-h">
            <h2 id="q-h" style={{ fontSize: "1.6rem" }}>Request a quote</h2>
            <QuoteForm />
          </section>
          <section className="card" aria-labelledby="c-h">
            <h2 id="c-h" style={{ fontSize: "1.6rem" }}>Or just say hello</h2>
            <p>{brand.phone} · {brand.email}</p>
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
