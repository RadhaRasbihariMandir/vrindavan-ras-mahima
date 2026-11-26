import Link from "next/link";
import { notFound } from "next/navigation";
import { getShabd, getSant, shabds } from "@/lib/fixtures";

export function generateStaticParams() {
  return shabds.map((s) => ({ slug: s.slug }));
}

export default async function ShabdPage({ params }: PageProps<"/vani/[slug]">) {
  const { slug } = await params;
  const shabd = getShabd(slug);
  if (!shabd) notFound();
  const sant = getSant(shabd.sant);

  return (
    <article className="container" style={{ paddingBlock: "var(--sp-16)" }}>
      <Link href="/vani" style={{ color: "var(--muted)" }}>← Vani archive</Link>
      <header style={{ textAlign: "center", margin: "var(--sp-8) 0 var(--sp-12)" }}>
        <p className="eyebrow">{sant?.name}</p>
        <h1>{shabd.title}</h1>
      </header>
      {shabd.verses.map((v, i) => (
        <section key={i} className="verse">
          <p style={{ margin: "0 auto var(--sp-3)" }}>{v.text}</p>
          <p className="meaning" style={{ fontSize: "var(--step-0)", lineHeight: 1.6 }}>{v.meaning}</p>
        </section>
      ))}
      {sant && (
        <p style={{ textAlign: "center", marginTop: "var(--sp-12)" }}>
          <Link href={`/sant/${sant.slug}`} className="btn secondary">{sant.name} ki aur vani</Link>
        </p>
      )}
    </article>
  );
}
