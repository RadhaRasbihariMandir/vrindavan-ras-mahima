import Link from "next/link";
import { notFound } from "next/navigation";
import { getSant, sants, shabdsBySant } from "@/lib/fixtures";

export function generateStaticParams() {
  return sants.map((s) => ({ slug: s.slug }));
}

export default async function SantPage({ params }: PageProps<"/sant/[slug]">) {
  const { slug } = await params;
  const sant = getSant(slug);
  if (!sant) notFound();
  const list = shabdsBySant(slug);

  return (
    <div className="container" style={{ paddingBlock: "var(--sp-16)" }}>
      <Link href="/sant" style={{ color: "var(--muted)" }}>← Sab sant</Link>
      <header style={{ textAlign: "center", margin: "var(--sp-8) 0" }}>
        <p className="eyebrow">{sant.period} · {sant.place}</p>
        <h1>{sant.name}</h1>
        <p style={{ margin: "0 auto" }}>{sant.bio}</p>
      </header>
      <h2>Vani</h2>
      {list.length === 0 ? (
        <div className="card"><p style={{ margin: 0 }}>Abhi is sant ki koi vani archive me nahi hai. <Link href="/vani">Poora archive dekhein</Link>.</p></div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)" }}>
          {list.map((s) => (
            <li key={s.slug} className="card">
              <Link href={`/vani/${s.slug}`} style={{ textDecoration: "none" }}>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
                <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{s.verses[0].text}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
