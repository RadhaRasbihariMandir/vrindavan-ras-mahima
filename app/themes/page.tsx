import { ThemePicker } from "@/components/ThemeEffects";
import { themes } from "@/lib/fixtures";

export const metadata = { title: "Themes — Vrindavan Ras Mahima" };

export default function ThemesPage() {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }}>
      <p className="eyebrow">Roop badlein</p>
      <h1>Themes</h1>
      <p style={{ color: "var(--muted)" }}>Har theme ke apne rang aur apne effects hain — poore app me.</p>
      <div style={{ margin: "var(--sp-6) 0" }}><ThemePicker /></div>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--sp-4)", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {themes.map((t) => (
          <li key={t.id} className="card">
            <h3 style={{ margin: 0 }}>{t.name}</h3>
            <p style={{ color: "var(--muted)", margin: "4px 0 0" }}>{t.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
