import { brand } from "./brand";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

async function send(m: Mail) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[mail:dev] (no RESEND_API_KEY) would send:", m.to, "|", m.subject);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? `${brand.name} <no-reply@example.com>`,
      to: m.to,
      subject: m.subject,
      text: m.text,
      reply_to: m.replyTo,
    }),
  });
  if (!res.ok) throw new Error(`Mail provider error ${res.status}`);
}

/** Notify sales, auto-reply to the customer, and optionally forward to a CRM webhook. */
export async function handleSubmission(
  kind: "quote" | "contact",
  data: Record<string, unknown> & { email: string; name: string }
) {
  const sales = process.env.SALES_INBOX ?? brand.email;
  const summary = Object.entries(data)
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");

  await Promise.all([
    send({
      to: sales,
      subject: `New ${kind} request from ${data.name}`,
      text: summary,
      replyTo: data.email,
    }),
    send({
      to: data.email,
      subject: `We received your ${kind} request – ${brand.name}`,
      text: `Hi ${data.name},\n\nThanks for reaching out. A specialist will reply within one business day.\n\nYour details:\n${summary}\n\n— ${brand.name}`,
    }),
    process.env.CRM_WEBHOOK_URL
      ? fetch(process.env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, ...data, receivedAt: new Date().toISOString() }),
        }).then(() => undefined)
      : Promise.resolve(),
  ]);
}
