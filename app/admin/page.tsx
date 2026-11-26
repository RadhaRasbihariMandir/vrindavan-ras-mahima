"use client";

import { useEffect, useState } from "react";

type Verse = { number: string; intro: string; text: string };
type Granth = { id: string; title: string; source: string; verses: Verse[] };

export default function AdminPage() {
  const [granths, setGranths] = useState<Granth[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [editing, setEditing] = useState<Granth | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    setState("loading");
    fetch("/api/granths")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { setGranths(d.granths); setState("ready"); })
      .catch(() => setState("error"));
  };
  useEffect(load, []);

  async function save(g: Granth) {
    setBusy(true);
    const res = await fetch(`/api/granths/${encodeURIComponent(g.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(g),
    });
    setBusy(false);
    if (res.ok) { setEditing(null); load(); }
  }

  async function remove(id: string) {
    if (!confirm("Ye granth delete karein? Wapas nahi aayega.")) return;
    setBusy(true);
    await fetch(`/api/granths/${encodeURIComponent(id)}`, { method: "DELETE" });
    setBusy(false);
    load();
  }

  async function create() {
    if (!newTitle.trim()) return;
    setBusy(true);
    const res = await fetch("/api/granths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: newTitle.trim().replace(/\s+/g, "-").toLowerCase(), title: newTitle.trim(), verses: [] }),
    });
    setBusy(false);
    if (res.ok) { setNewTitle(""); load(); }
  }

  if (state === "loading") return <div className="container" style={{ paddingBlock: "var(--sp-12)" }} role="status"><div className="skeleton" style={{ height: 40, maxWidth: 480 }} /></div>;
  if (state === "error") return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }}>
      <div className="card" role="alert">
        <h2>Admin data load nahi hua</h2>
        <button className="btn" onClick={load}>Dobara koshish karein</button>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }}>
      <p className="eyebrow">Control panel</p>
      <h1>Admin — Vani manage karein</h1>
      <p style={{ color: "var(--muted)" }}>{granths.length} granth · {granths.reduce((n, g) => n + g.verses.length, 0)} pad</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBlock: "var(--sp-6)" }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Naye granth ka naam"
          aria-label="Naye granth ka naam"
          style={{ minHeight: 44, padding: "0 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", flex: 1, minWidth: 220 }}
        />
        <button className="btn" onClick={create} disabled={busy || !newTitle.trim()}>Naya granth</button>
      </div>

      {editing ? (
        <GranthEditor granth={editing} onCancel={() => setEditing(null)} onSave={save} busy={busy} />
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
          {granths.map((g) => (
            <li key={g.id} className="card" style={{ padding: "var(--sp-4)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <strong>{g.title}</strong>
                <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{g.verses.length} pad · {g.source}</div>
              </div>
              <button className="btn secondary" style={{ padding: "8px 14px" }} onClick={() => setEditing(g)}>Edit</button>
              <button className="btn secondary" style={{ padding: "8px 14px" }} onClick={() => remove(g.id)} disabled={busy}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GranthEditor({ granth, onCancel, onSave, busy }: { granth: Granth; onCancel: () => void; onSave: (g: Granth) => void; busy: boolean }) {
  const [title, setTitle] = useState(granth.title);
  const [verses, setVerses] = useState<Verse[]>(granth.verses);

  const setVerse = (i: number, patch: Partial<Verse>) =>
    setVerses((vs) => vs.map((v, j) => (j === i ? { ...v, ...patch } : v)));

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h2 style={{ fontSize: "var(--step-2)" }}>Edit: {granth.title}</h2>
      <label className="eyebrow" htmlFor="g-title">Naam</label>
      <input id="g-title" value={title} onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", minHeight: 44, padding: "0 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", marginBottom: 16 }} />
      {verses.map((v, i) => (
        <div key={i} style={{ borderTop: "1px dashed var(--border)", paddingBlock: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>Pad {v.number || i + 1}</strong>
            <button aria-label={`Pad ${i + 1} hatao`} onClick={() => setVerses(vs => vs.filter((_, j) => j !== i))}
              style={{ marginLeft: "auto", minHeight: 36, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--accent)", cursor: "pointer" }}>Hatao</button>
          </div>
          <label className="eyebrow" htmlFor={`t-${i}`}>Pad (shlok — same rakha ja sakta hai)</label>
          <textarea id={`t-${i}`} value={v.text} onChange={(e) => setVerse(i, { text: e.target.value })} rows={4}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontFamily: "var(--font-text)" }} />
          <label className="eyebrow" htmlFor={`m-${i}`}>Vyakhya (apne shabdon me — yahin original se hata kar likhein)</label>
          <textarea id={`m-${i}`} value={v.intro} onChange={(e) => setVerse(i, { intro: e.target.value })} rows={3}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontFamily: "var(--font-text)" }} />
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => onSave({ ...granth, title, verses })} disabled={busy}>Save</button>
        <button className="btn secondary" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="btn secondary" onClick={() => setVerses(vs => [...vs, { number: String(vs.length + 1), intro: "", text: "" }])} disabled={busy}>Naya pad</button>
      </div>
    </div>
  );
}
