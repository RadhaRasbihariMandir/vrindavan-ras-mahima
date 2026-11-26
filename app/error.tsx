"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-24)", textAlign: "center" }}>
      <h1>Kuchh gadbad ho gayi</h1>
      <p style={{ color: "var(--muted)", margin: "0 auto var(--sp-6)" }}>
        Vani load karne me samasya aayi. Kripya dobara koshish karein.
      </p>
      <button className="btn" onClick={reset}>Dobara koshish karein</button>
    </div>
  );
}
