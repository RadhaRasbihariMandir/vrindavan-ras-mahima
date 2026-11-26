import Link from "next/link";
import { shabds, sants } from "@/lib/fixtures";
import { granths } from "@/lib/content";

export default function Home() {
  return (
    <div className="container">
      <section style={{ textAlign: "center", padding: "var(--sp-24) 0 var(--sp-16)" }}>
        <p className="eyebrow">संतों की अमृत वाणी</p>
        <h1>Har Shabd, Ek Darshan</h1>
        <p style={{ margin: "0 auto var(--sp-8)" }}>
          Bhajan, pravachan aur santo ki vani ka naya ghar — har recording sanrakshit,
          har shabd ko saans lene ke liye jagah.
        </p>
        <Link href="/granth" className="btn">Sunni Shuru Karein</Link>
      </section>

      <section style={{ padding: "var(--sp-12) 0" }}>
        <p className="eyebrow">Granth</p>
        <h2>Pramukh granth</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {granths.slice(0, 6).map((g) => (
            <li key={g.id} className="card">
              <Link href={`/granth/${g.id}`} style={{ textDecoration: "none" }}>
                <h3 style={{ margin: 0 }}>{g.title}</h3>
                <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{g.verses.length} pad</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ padding: "var(--sp-12) 0" }}>
        <p className="eyebrow">Vani archive</p>
        <h2>Aaj ke pramukh shabd</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {shabds.slice(0, 3).map((s) => (
            <li key={s.slug} className="card">
              <Link href={`/vani/${s.slug}`} style={{ textDecoration: "none" }}>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
                <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s.verses[0].text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ padding: "var(--sp-12) 0" }}>
        <p className="eyebrow">Sant collection</p>
        <h2>Santo ki jhanki</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {sants.map((s) => (
            <li key={s.slug} className="card">
              <Link href={`/sant/${s.slug}`} style={{ textDecoration: "none" }}>
                <h3 style={{ margin: 0 }}>{s.name}</h3>
                <p style={{ color: "var(--muted)", margin: "4px 0 0", fontSize: "0.9rem" }}>{s.period} · {s.place}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
