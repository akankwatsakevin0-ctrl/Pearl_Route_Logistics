import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { rateLimit, clientIp } from "@/lib/ratelimit";
import { handleSubmission } from "@/lib/mail";

export async function POST(req: Request) {
  const rl = rateLimit(`quote:${clientIp(req)}`, 5, 60_000);
  if (!rl.ok)
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled → pretend success so bots learn nothing.
    if ((body as { website?: string })?.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const { website: _hp, ...data } = parsed.data;
  try {
    await handleSubmission("quote", data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not send. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
