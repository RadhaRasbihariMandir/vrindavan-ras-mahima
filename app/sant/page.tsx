import Link from "next/link";
import { sants, shabdsBySant } from "@/lib/fixtures";

export const metadata = { title: "Sant — Vrindavan Ras Mahima" };

export default function SantIndex() {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }}>
      <p className="eyebrow">Sant collection</p>
      <h1>Santo ki Jhanki</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)" }}>
        {sants.map((s) => (
          <li key={s.slug} className="card">
            <Link href={`/sant/${s.slug}`} style={{ textDecoration: "none" }}>
              <h2 style={{ fontSize: "var(--step-3)", margin: 0 }}>{s.name}</h2>
            </Link>
            <p style={{ color: "var(--muted)", margin: "4px 0 8px" }}>{s.period} · {s.place} · {shabdsBySant(s.slug).length} shabd</p>
            <p style={{ margin: 0 }}>{s.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
