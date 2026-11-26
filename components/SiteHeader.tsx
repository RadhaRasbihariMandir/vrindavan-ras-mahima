"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemePicker } from "./ThemeEffects";
import { useTheme } from "./ThemeProvider";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header
      className="page-content"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-1)",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--sp-4)", minHeight: 64 }}
      >
        <Link href="/" style={{ textDecoration: "none", flexShrink: 1, minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--step-2)", color: "var(--heading)", fontWeight: 600, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            ॐ Vrindavan Ras Mahima
          </span>
        </Link>

        <nav aria-label="Main" style={{ display: open ? "flex" : "none", flexDirection: "column", gap: "var(--sp-2)", position: "absolute", top: 64, left: 0, right: 0, background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "var(--sp-4) var(--sp-6)" }}
          className="main-nav">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/vani" onClick={() => setOpen(false)}>Vani</Link>
          <Link href="/granth" onClick={() => setOpen(false)}>Granth</Link>
          <Link href="/admin" onClick={() => setOpen(false)}>Admin</Link>
          <Link href="/sant" onClick={() => setOpen(false)}>Sant</Link>
          <Link href="/themes" onClick={() => setOpen(false)}>Themes</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
          <button
            aria-label={`Theme: ${theme}. Badlein`}
            aria-expanded={pickerOpen}
            onClick={() => setPickerOpen((v) => !v)}
            style={{ minHeight: 44, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", color: "var(--text)" }}
          >
            🎨 <span aria-hidden="true">Theme</span>
          </button>
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ minHeight: 44, minWidth: 44, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", color: "var(--text)" }}
          >
            ☰
          </button>
        </div>
      </div>

      {pickerOpen && (
        <div className="container" style={{ paddingBlock: "var(--sp-4)" }}>
          <ThemePicker />
        </div>
      )}

      <style>{`
        .main-nav a { text-decoration: none; color: var(--text); min-height: 44px; display: flex; align-items: center; }
        .main-nav a:hover { color: var(--accent); }
        @media (min-width: 768px) {
          .nav-toggle { display: none; }
          .main-nav { display: flex !important; flex-direction: row !important; position: static !important; background: transparent !important; border: none !important; padding: 0 !important; gap: var(--sp-6) !important; }
        }
      `}</style>
    </header>
  );
}
