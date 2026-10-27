# Pearl Route Logistics: 3D marketing site (placeholder brand)

Next.js 14 (App Router) + React Three Fiber. All 3D is **procedural** (no model files), so the 3D payload is 0 MB, well under the 3 MB budget. Scenes are lazy-loaded with `next/dynamic` after the static poster paints.

> **Status:** code is complete, but it has **not been installed, built or Lighthouse-tested yet**. The build sandbox could not reach the npm registry. Run the steps below on your machine and fix anything the first build flags.

## Run

```bash
npm install
cp .env.example .env.local   # fill in values (all optional for local dev)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Requires Node 18.18+.

## Deploy

- **Vercel (easiest):** import the repo, add the env vars from `.env.example`, deploy.
- **Any Node host / Docker:** `npm run build && npm start` (port 3000).
- Set `NEXT_PUBLIC_SITE_URL` to your real domain (used by sitemap, canonical URLs, Open Graph and JSON-LD).

## Where to swap brand assets

| What | Where |
|---|---|
| Company name, tagline, contact details, socials | `lib/brand.ts` |
| Services copy, stats, client names, testimonial | `lib/brand.ts` |
| Colors (navy / orange) | `:root` in `app/globals.css` |
| Fonts (Inter + Space Grotesk, max 2) | `app/layout.tsx` |
| Globe port locations and routes | `ports` and `routes` in `lib/brand.ts` |
| Logo / favicon | `app/icon.svg` (also used in JSON-LD); header mark in `components/Header.tsx` |
| Open Graph image | generated from brand name/tagline in `app/opengraph-image.tsx` |
| Forms → email / CRM | `.env.local` (`RESEND_API_KEY`, `SALES_INBOX`, `CRM_WEBHOOK_URL`) |
| Tracking data | replace the mock in `app/api/track/route.ts` |
| Privacy / Terms | `app/privacy/page.tsx`, `app/terms/page.tsx` (templates, get legal review) |

## File tree

```
app/
  layout.tsx · globals.css · page.tsx (Home) · sitemap.ts · robots.ts
  services/ tracking/ about/ quote/ privacy/ terms/   (page.tsx each)
  api/quote · api/contact · api/track                 (route.ts each)
components/
  Scene3D.tsx          Canvas wrapper: 30 FPS cap, pauses off-screen / hidden tab, dpr ≤ 1.5
  Globe.tsx            Hero globe + animated route arcs (procedural)
  HeroVisual.tsx       Picks 3D vs static SVG poster
  ContainerScene.tsx   Scroll-driven container stack (one InstancedMesh)
  ContainerSection.tsx Sticky scroll section + step captions + static fallback
  TiltCard.tsx (max 8°) · Magnetic.tsx · Counter.tsx · Reveal.tsx · Icon.tsx
  Header.tsx · Footer.tsx · JsonLd.tsx (Organization + Service)
  QuoteForm.tsx (3 steps) · ContactForm.tsx · TrackingForm.tsx
lib/
  brand.ts · schemas.ts (zod) · ratelimit.ts · mail.ts · analytics.ts · use3d.ts
```

## How the requirements are met

- **Graceful degradation:** `lib/use3d.ts` falls back to static SVG art when `prefers-reduced-motion` is set, WebGL is missing, or Data Saver is on. The hero text is server-rendered, so LCP isn't blocked by 3D.
- **Animation caps:** render loop is `frameloop="demand"` ticked at 30 FPS, paused when off-screen or the tab is hidden. Tilt is capped at 8°; magnetic/tilt are off for touch and reduced motion.
- **Forms:** honeypot field (`website`), zod validation, in-memory rate limit (5/min/IP), auto-reply to the user + notification to `SALES_INBOX` via Resend, optional CRM webhook. GA4 events: `quote_start`, `quote_step`, `generate_lead`, `track_shipment`.
- **Rate limiting caveat:** the limiter is per-instance memory. On serverless or multi-instance hosting, swap `lib/ratelimit.ts` for Upstash/Redis.
- **SEO:** per-page metadata, Open Graph, canonical URLs, JSON-LD (Organization + one Service per offering), `sitemap.xml`, `robots.txt`.
- **Accessibility:** skip link, semantic landmarks, visible focus, `aria-current`, labelled forms, live regions for results/errors, `role="img"` + labels on every canvas and SVG fallback, orange-on-navy button text chosen for AA contrast.

## Using real 3D models later

Put compressed GLB files in `public/models/` (long-cache headers are already set). Compress with `npx gltf-transform optimize in.glb out.glb --compress draco --texture-compress webp`, keep the total under 3 MB, and load them inside a lazy-loaded scene component with `useGLTF` from `@react-three/drei` (install drei and enable the Draco decoder).

## Placeholders that need real content

- Company name, tagline, address, phone, email, social links (`lib/brand.ts`)
- Stats (1.25M shipments, 120 countries, 98% on-time, 34 warehouses) are invented
- Client names, the testimonial, certifications, "company story" paragraph
- Privacy Policy and Terms (templates only)
- Street address, real social links, and a real logo (current one is a simple diamond mark)
- Tracking is a mock
