"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";

type Ev = { key: string; label: string; location: string; done: boolean; current: boolean; at: string | null };
type Result = { id: string; status: string; events: Ev[]; mock?: boolean };

export default function TrackingForm() {
  const [id, setId] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function go(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(""); setRes(null);
    try {
      const r = await fetch(`/api/track?id=${encodeURIComponent(id)}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Lookup failed.");
      setRes(j); track("track_shipment");
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Lookup failed.");
    } finally { setBusy(false); }
  }

  return (
    <div>
      <form onSubmit={go} aria-label="Track a shipment" style={{ gridTemplateColumns: "1fr auto", alignItems: "end" }}>
        <label>Tracking number
          <input required value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. MF-20481937" autoComplete="off" />
        </label>
        <button className="btn btn-primary" disabled={busy}>{busy ? "Searching…" : "Track"}</button>
      </form>
      <div aria-live="polite">
        {err && <p role="alert" className="err" style={{ marginTop: 16 }}>{err}</p>}
        {res && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: "1.5rem" }}>{res.id} · {res.status}</h2>
            {res.mock && <p className="placeholder-note">Demo data. Connect /api/track to your tracking system.</p>}
            <ol className="timeline">
              {res.events.map((ev) => (
                <li key={ev.key} className={`${ev.done ? "done" : ""} ${ev.current ? "current" : ""}`} aria-current={ev.current ? "step" : undefined}>
                  <span className="dot" aria-hidden="true" />
                  <strong>{ev.label}</strong> — {ev.location}
                  <br /><small>{ev.at ? new Date(ev.at).toLocaleString() : "Pending"}</small>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
