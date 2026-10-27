"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand } from "@/lib/brand";
import Magnetic from "./Magnetic";

const links = [
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/about", label: "About" },
  { href: "/quote", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container bar">
        <Link href="/" className="logo" aria-label={`${brand.name} home`}>
          <i aria-hidden="true" />
          {brand.name}
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
          <Magnetic>
            <Link href="/quote" className="btn btn-primary" style={{ minHeight: 42, padding: "10px 20px" }}>Get a quote</Link>
          </Magnetic>
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="mnav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav id="mnav" className="mobile-nav" aria-label="Mobile" onClick={() => setOpen(false)}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
          <Link href="/quote" className="btn btn-primary">Get a quote</Link>
        </nav>
      )}
    </header>
  );
}
