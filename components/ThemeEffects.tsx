"use client";

import { useTheme } from "./ThemeProvider";
import { themes } from "@/lib/fixtures";

const FX_COUNTS: Record<string, number> = {
  lotus: 14,
  vrindavan: 12,
  "liquid-glass": 5,
  fire: 22,
  water: 4,
  barsana: 18,
};

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="group" aria-label="Theme chunein" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          aria-pressed={theme === t.id}
          title={t.description}
          style={{
            minHeight: 44,
            padding: "8px 14px",
            borderRadius: 8,
            border: `1px solid ${theme === t.id ? "var(--accent)" : "var(--border)"}`,
            background: theme === t.id ? "var(--accent-soft)" : "var(--surface)",
            color: theme === t.id ? "var(--accent)" : "var(--text)",
            cursor: "pointer",
            fontFamily: "var(--font-text)",
            transition: "all 200ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

export default function ThemeEffects() {
  const { theme } = useTheme();
  const count = FX_COUNTS[theme] ?? 0;
  if (!count) return null;

  const items = Array.from({ length: count }, (_, i) => {
    const style: React.CSSProperties & Record<string, string | number> = {
      left: `${(i * 97) % 100}%`,
      animationDuration: `${8 + ((i * 7) % 14)}s`,
      animationDelay: `${-((i * 3) % 12)}s`,
    };
    if (theme === "liquid-glass") style.top = `${(i * 31) % 80}%`;
    if (theme === "barsana") { style.top = `${(i * 43) % 95}%`; }
    if (theme === "water") { style.left = `${10 + ((i * 27) % 80)}%`; style.bottom = `${(i * 17) % 60}%`; }
    return <i key={i} style={style} />;
  });

  return (
    <div className="fx-layer" aria-hidden="true">
      {theme === "water" ? items.map((el, i) => <b key={i} style={el.props.style} />) : items}
    </div>
  );
}
