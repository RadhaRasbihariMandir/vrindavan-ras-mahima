"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type NowPlaying = { title: string; sant: string; slug: string } | null;
type Ctx = { now: NowPlaying; play: (n: NonNullable<NowPlaying>) => void; stop: () => void };
const PlayerCtx = createContext<Ctx>({ now: null, play: () => {}, stop: () => {} });
export const usePlayer = () => useContext(PlayerCtx);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState<NowPlaying>(null);
  const play = useCallback((n: NonNullable<NowPlaying>) => setNow(n), []);
  const stop = useCallback(() => setNow(null), []);
  return <PlayerCtx.Provider value={{ now, play, stop }}>{children}</PlayerCtx.Provider>;
}

export default function AudioPlayerBar() {
  const { now, stop } = usePlayer();
  if (!now) return null;
  return (
    <div
      role="region"
      aria-label="Audio player"
      style={{
        position: "fixed",
        left: 0, right: 0, bottom: 0,
        zIndex: 30,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        boxShadow: "var(--shadow-2)",
        padding: "var(--sp-2) var(--sp-4)",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
        <span
          aria-hidden="true"
          style={{
            width: 12, height: 12, borderRadius: "50%",
            background: "var(--accent)",
            animation: "shimmer 1.2s linear infinite alternate",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-text)", color: "var(--heading)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {now.title}
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{now.sant}</div>
        </div>
        <button
          onClick={stop}
          style={{ minHeight: 44, padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: "pointer" }}
        >
          Band karein
        </button>
      </div>
    </div>
  );
}
