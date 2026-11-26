"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { shabds, sants } from "@/lib/fixtures";
import { usePlayer } from "./AudioPlayerBar";

export default function VaniList() {
  const [q, setQ] = useState("");
  const [sant, setSant] = useState("all");
  const { play } = usePlayer();

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return shabds.filter((s) => {
      if (sant !== "all" && s.sant !== sant) return false;
      if (!needle) return true;
      return (
        s.title.toLowerCase().includes(needle) ||
        s.tags.some((t) => t.includes(needle)) ||
        s.verses.some((v) => v.text.includes(needle))
      );
    });
  }, [q, sant]);

  const santName = (slug: string) => sants.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", marginBlock: "var(--sp-6)" }}>
        <label htmlFor="vani-q" className="eyebrow">Shabd khojein</label>
        <input
          id="vani-q"
          type="search"
          placeholder="जैसे: चदरिया, meera, prem…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            minHeight: 48,
            padding: "0 var(--sp-4)",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            fontFamily: "var(--font-text)",
            fontSize: "var(--step-1)",
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button type="button" onClick={() => setSant("all")} aria-pressed={sant === "all"}
            style={chipStyle(sant === "all")}>Sab sant</button>
          {sants.map((s) => (
            <button type="button" key={s.slug} onClick={() => setSant(s.slug)} aria-pressed={sant === s.slug}
              style={chipStyle(sant === s.slug)}>{s.name}</button>
          ))}
        </div>
      </form>

      {results.length === 0 ? (
        <div className="card" role="status">
          <h3>Koi shabd nahi mila</h3>
          <p>“{q}” ke liye koi vani nahi mili. Spelling badal kar dekhein, ya filter hata kar poora archive dekhein.</p>
          <button
            onClick={() => { setQ(""); setSant("all"); }}
            className="btn secondary"
          >Filter saaf karein</button>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)" }}>
          {results.map((s) => (
            <li key={s.slug} className="card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--sp-3)" }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <Link href={`/vani/${s.slug}`} style={{ textDecoration: "none" }}>
                  <h3 style={{ margin: 0 }}>{s.title}</h3>
                </Link>
                <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "0.9rem" }}>
                  {santName(s.sant)} · {s.verses.length} pad · {s.tags.join(", ")}
                </p>
              </div>
              {s.audioUrl ? (
                <button className="btn secondary" onClick={() => play({ title: s.title, sant: santName(s.sant), slug: s.slug })}>
                  ▶ Sunein
                </button>
              ) : (
                <span style={{ color: "var(--muted)", fontSize: "0.85rem" }} title="Sample data me audio nahi hai">
                  Path aa raha hai
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function chipStyle(active: boolean): React.CSSProperties {
  return {
    minHeight: 44,
    padding: "8px 14px",
    borderRadius: 999,
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    background: active ? "var(--accent-soft)" : "var(--surface)",
    color: active ? "var(--accent)" : "var(--text)",
    cursor: "pointer",
    fontFamily: "var(--font-text)",
    transition: "all 200ms cubic-bezier(0.22,1,0.36,1)",
  };
}
