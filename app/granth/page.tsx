import Link from "next/link";
import { granths } from "@/lib/content";

export const metadata = { title: "Granth — Vrindavan Ras Mahima" };

export default function GranthIndex() {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }}>
      <p className="eyebrow">Poora sangrah</p>
      <h1>Saare Granth</h1>
      <p style={{ color: "var(--muted)" }}>
        {granths.length} granth · {granths.reduce((n, g) => n + g.verses.length, 0)} pad — app ki saari vani.
      </p>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-3)", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {granths.map((g) => (
          <li key={g.id} className="card" style={{ padding: "var(--sp-4)" }}>
            <Link href={`/granth/${g.id}`} style={{ textDecoration: "none" }}>
              <h3 style={{ fontSize: "var(--step-1)", margin: 0 }}>{g.title}</h3>
              <p style={{ color: "var(--muted)", margin: "4px 0 0", fontSize: "0.85rem" }}>{g.verses.length} pad</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
