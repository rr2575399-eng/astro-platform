"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "முகப்பு" },
  { href: "/services", label: "சேவைகள்" },
  { href: "/about", label: "எங்களை பற்றி" },
  { href: "/faq", label: "கேள்வி பதில்" },
  { href: "/contact", label: "தொடர்பு" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-night-900/10 bg-[var(--color-paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full text-lg"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--color-gold-300), var(--color-gold-600))",
            }}
          >
            ✦
          </span>
          <span className="font-display text-xl leading-none text-[var(--color-night-900)]">
            ஜாதகம் <span style={{ color: "var(--color-kumkum-600)" }}>AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-[var(--color-night-800)] transition-colors hover:text-[var(--color-kumkum-600)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/order"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-paper)] shadow-sm transition-transform hover:scale-[1.03]"
            style={{ background: "var(--color-kumkum-600)" }}
          >
            ஜாதகம் ஆர்டர் செய்ய
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-night-900/15 md:hidden"
          aria-label={open ? "மெனுவை மூடு" : "மெனுவை திற"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-night-900/10 bg-[var(--color-paper)] px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-[15px] font-medium text-[var(--color-night-800)] active:bg-[var(--color-paper-dim)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold text-[var(--color-paper)]"
              style={{ background: "var(--color-kumkum-600)" }}
            >
              ஜாதகம் ஆர்டர் செய்ய
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
