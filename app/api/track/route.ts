import { NextResponse } from "next/server";
import { trackSchema } from "@/lib/schemas";
import { rateLimit, clientIp } from "@/lib/ratelimit";

// MOCK tracking endpoint. Replace the body with a call to your TMS / carrier API.
const STAGES = [
  { key: "booked", label: "Booked", location: "Origin office" },
  { key: "pickup", label: "Picked up", location: "Shanghai, CN" },
  { key: "port", label: "Departed port", location: "Port of Shanghai" },
  { key: "transit", label: "In transit", location: "Indian Ocean" },
  { key: "customs", label: "Customs clearance", location: "Rotterdam, NL" },
  { key: "delivered", label: "Delivered", location: "Destination" },
];

export async function GET(req: Request) {
  const rl = rateLimit(`track:${clientIp(req)}`, 20, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const id = new URL(req.url).searchParams.get("id") ?? "";
  const parsed = trackSchema.safeParse({ id });
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid tracking number." }, { status: 422 });

  // Deterministic fake progress from the ID so the demo is stable.
  const seed = [...parsed.data.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const current = seed % STAGES.length;
  const base = Date.now() - (STAGES.length - current) * 36 * 3600 * 1000;
  const events = STAGES.map((s, i) => ({
    ...s,
    done: i <= current,
    current: i === current,
    at: i <= current ? new Date(base + i * 36 * 3600 * 1000).toISOString() : null,
  }));
  return NextResponse.json({ id: parsed.data.id.toUpperCase(), mock: true, status: STAGES[current].label, events });
}
