"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";

export default function ContactForm() {
  const [d, setD] = useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setD({ ...d, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending"); setMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Something went wrong.");
      setState("done"); track("generate_lead", { form: "contact" });
    } catch (err) {
      setState("error"); setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done")
    return <div role="status" className="card"><h3 className="ok">Message sent</h3><p>Thanks, {d.name}. Check your inbox for a confirmation.</p></div>;

  return (
    <form onSubmit={submit} aria-label="Contact us">
      <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={d.website} onChange={set("website")} /></label></div>
      <label>Name<input required minLength={2} autoComplete="name" value={d.name} onChange={set("name")} /></label>
      <label>Email<input required type="email" autoComplete="email" value={d.email} onChange={set("email")} /></label>
      <label>Message<textarea required minLength={10} maxLength={3000} value={d.message} onChange={set("message")} /></label>
      {state === "error" && <p role="alert" className="err">{msg}</p>}
      <button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
