"use client";
import { useEffect, useState } from "react";
import { services } from "@/lib/brand";
import { track } from "@/lib/analytics";

const cargo = [
  ["general", "General cargo"], ["fragile", "Fragile"], ["perishable", "Perishable"],
  ["hazardous", "Hazardous"], ["oversized", "Oversized"], ["other", "Other"],
];
const timelines = [["asap", "As soon as possible"], ["1-2-weeks", "1–2 weeks"], ["1-month", "Within a month"], ["flexible", "Flexible"]];

type Data = Record<string, string>;
const initial: Data = { origin: "", destination: "", cargoType: "general", weightKg: "", timeline: "1-2-weeks", name: "", email: "", company: "", notes: "", website: "" };
const TITLES = ["Route", "Cargo", "Contact"];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(initial);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [started, setStarted] = useState(false);

  // Prefill from /quote?service=<id> (links on the Services page)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    const svc = services.find((x) => x.id === id);
    if (svc) setD((prev) => (prev.notes ? prev : { ...prev, notes: `Service of interest: ${svc.title}` }));
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!started) { setStarted(true); track("quote_start"); }
    setD({ ...d, [k]: e.target.value });
  };

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(step + 1); track("quote_step", { step: step + 1 }); return; }
    submit();
  };

  async function submit() {
    setState("sending"); setMsg("");
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Something went wrong.");
      setState("done"); track("generate_lead", { form: "quote", cargo: d.cargoType });
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done")
    return (
      <div role="status" className="card">
        <h3 className="ok">Quote request received</h3>
        <p>Thanks, {d.name}. A confirmation is on its way to {d.email}. We'll reply within one business day.</p>
      </div>
    );

  return (
    <form onSubmit={next} aria-label="Request a freight quote" noValidate={false}>
      <div className="steps" aria-hidden="true">{TITLES.map((_, i) => <span key={i} className={i <= step ? "on" : ""} />)}</div>
      <p style={{ margin: 0 }} aria-live="polite">Step {step + 1} of 3 — {TITLES[step]}</p>

      {/* Honeypot: hidden from humans and assistive tech */}
      <div className="hp" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={d.website} onChange={set("website")} /></label>
      </div>

      {step === 0 && (
        <div className="row">
          <label>Origin<input required minLength={2} value={d.origin} onChange={set("origin")} placeholder="City or port" autoComplete="off" /></label>
          <label>Destination<input required minLength={2} value={d.destination} onChange={set("destination")} placeholder="City or port" autoComplete="off" /></label>
        </div>
      )}
      {step === 1 && (
        <>
          <div className="row">
            <label>Cargo type
              <select value={d.cargoType} onChange={set("cargoType")}>{cargo.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            </label>
            <label>Weight (kg)<input required type="number" min={1} inputMode="numeric" value={d.weightKg} onChange={set("weightKg")} /></label>
          </div>
          <label>Timeline
            <select value={d.timeline} onChange={set("timeline")}>{timelines.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </label>
        </>
      )}
      {step === 2 && (
        <>
          <div className="row">
            <label>Full name<input required minLength={2} autoComplete="name" value={d.name} onChange={set("name")} /></label>
            <label>Work email<input required type="email" autoComplete="email" value={d.email} onChange={set("email")} /></label>
          </div>
          <label>Company (optional)<input autoComplete="organization" value={d.company} onChange={set("company")} /></label>
          <label>Notes (optional)<textarea value={d.notes} onChange={set("notes")} maxLength={2000} /></label>
        </>
      )}

      {state === "error" && <p role="alert" className="err">{msg}</p>}
      <div style={{ display: "flex", gap: 12 }}>
        {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
        <button className="btn btn-primary" disabled={state === "sending"}>{step < 2 ? "Continue" : state === "sending" ? "Sending…" : "Get my quote"}</button>
      </div>
    </form>
  );
}
