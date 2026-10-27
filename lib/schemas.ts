import { z } from "zod";

// `website` is the honeypot: real users never see or fill it.
const honeypot = z.string().max(0).optional();

export const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().max(150).optional().default(""),
  origin: z.string().min(2).max(150),
  destination: z.string().min(2).max(150),
  cargoType: z.enum(["general", "fragile", "perishable", "hazardous", "oversized", "other"]),
  weightKg: z.coerce.number().positive().max(10_000_000),
  timeline: z.enum(["asap", "1-2-weeks", "1-month", "flexible"]),
  notes: z.string().max(2000).optional().default(""),
  website: honeypot,
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(3000),
  website: honeypot,
});

export const trackSchema = z.object({
  id: z.string().trim().min(6).max(30).regex(/^[A-Za-z0-9-]+$/),
});
