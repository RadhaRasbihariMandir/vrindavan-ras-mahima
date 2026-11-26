import Link from "next/link";
import { notFound } from "next/navigation";
import { granths, getGranth } from "@/lib/content";

export function generateStaticParams() {
  return granths.map((g) => ({ id: g.id }));
}

export default async function GranthPage({ params }: PageProps<"/granth/[id]">) {
  const { id } = await params;
  const granth = getGranth(id);
  if (!granth) notFound();

  return (
    <div className="container" style={{ paddingBlock: "var(--sp-16)" }}>
      <Link href="/granth" style={{ color: "var(--muted)" }}>← Saare granth</Link>
      <header style={{ textAlign: "center", margin: "var(--sp-8) 0" }}>
        <p className="eyebrow">{granth.verses.length} pad</p>
        <h1>{granth.title}</h1>
      </header>
      {granth.verses.map((v, i) => (
        <section key={i} className="verse">
          {v.intro && (
            <p className="meaning" style={{ fontSize: "0.9rem", marginBottom: "var(--sp-3)" }}>{v.intro}</p>
          )}
          <p style={{ whiteSpace: "pre-line", margin: "0 auto var(--sp-3)" }}>{v.text}</p>
          {v.number && <p style={{ color: "var(--accent)", fontSize: "0.85rem" }}>पद {v.number}</p>}
        </section>
      ))}
    </div>
  );
}
