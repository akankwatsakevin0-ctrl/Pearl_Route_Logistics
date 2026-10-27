// ─── BRAND CONFIG ─────────────────────────────────────────────
// Single place to swap company details. Colors live in app/globals.css (:root).
// Everything marked PLACEHOLDER must be replaced before launch.

export const brand = {
  name: "Pearl Route Logistics",
  tagline: "East Africa to the world, on time.",
  description:
    "Freight forwarding, warehousing, last-mile delivery, customs clearance and supply-chain consulting for shippers who can't afford delays.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aknkwatsak.com",
  email: "akankwatsakevin0@gmail.com",
  phone: "+256 791 321919",
  address: "Kampala, Uganda", // add full street address
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
};

export const services = [
  {
    id: "freight-forwarding",
    title: "Freight Forwarding",
    short: "Air, ocean and road freight, booked and tracked end to end.",
    long: "One partner for every leg. We negotiate carrier rates, consolidate loads and keep your cargo moving across 120+ trade lanes.",
    icon: "ship",
  },
  {
    id: "warehousing",
    title: "Warehousing",
    short: "Secure, scalable storage with real-time inventory visibility.",
    long: "Climate-controlled and bonded space near major ports, with pick, pack and cross-dock services on demand.",
    icon: "box",
  },
  {
    id: "last-mile",
    title: "Last-Mile Delivery",
    short: "Fast, trackable doorstep delivery your customers notice.",
    long: "Route-optimized fleets, proof of delivery and live ETAs that cut failed drops and support tickets.",
    icon: "truck",
  },
  {
    id: "customs",
    title: "Customs Clearance",
    short: "Compliant paperwork, cleared faster, with no surprise duties.",
    long: "Licensed brokers handle classification, filings and duty optimization so shipments don't stall at the border.",
    icon: "doc",
  },
  {
    id: "consulting",
    title: "Supply-Chain Consulting",
    short: "Data-led advice to cut cost and lead time.",
    long: "We map your network, find the bottlenecks and build a plan with measurable savings.",
    icon: "chart",
  },
] as const;

// PLACEHOLDER stats — replace with verified figures
export const stats = [
  { label: "Shipments delivered", value: 1250000, suffix: "+" },
  { label: "Countries served", value: 120, suffix: "" },
  { label: "On-time delivery", value: 98, suffix: "%" },
  { label: "Warehouses", value: 34, suffix: "" },
];

// PLACEHOLDER clients
export const clients = ["Northwind", "Acme Retail", "Globex", "Initech", "Umbra Goods", "Vertex Mfg"];

// PLACEHOLDER testimonial
export const testimonial = {
  quote:
    "Our transit times became predictable. We finally trust our delivery dates.",
  name: "Jane Doe",
  role: "VP Logistics, Acme Retail (placeholder)",
};

// Port coordinates [lat, lon] for hero route arcs
export const ports: Record<string, [number, number]> = {
  Rotterdam: [51.95, 4.14],
  Shanghai: [31.23, 121.47],
  Singapore: [1.26, 103.82],
  LosAngeles: [33.74, -118.27],
  NewYork: [40.67, -74.04],
  Dubai: [25.0, 55.06],
  Mombasa: [-4.05, 39.67],
  Santos: [-23.96, -46.3],
};

export const routes: [string, string][] = [
  ["Shanghai", "Rotterdam"],
  ["Singapore", "Dubai"],
  ["Dubai", "Mombasa"],
  ["LosAngeles", "Shanghai"],
  ["NewYork", "Rotterdam"],
  ["Santos", "NewYork"],
  ["Singapore", "LosAngeles"],
];
