export default function Loading() {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }} role="status" aria-label="Loading">
      <div className="skeleton" style={{ height: 28, width: 200, marginBottom: 24 }} />
      <div className="skeleton" style={{ height: 48, width: "100%", maxWidth: 560, marginBottom: 32 }} />
      {[0, 1, 2].map((i) => (
        <div key={i} className="card" style={{ marginBottom: 16 }}>
          <div className="skeleton" style={{ height: 24, width: "60%", marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 16, width: "40%" }} />
        </div>
      ))}
    </div>
  );
}
