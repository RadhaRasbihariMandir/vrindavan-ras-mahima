import VaniList from "@/components/VaniList";

export const metadata = { title: "Vani Archive — Vrindavan Ras Mahima" };

export default function VaniPage() {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-12)" }}>
      <p className="eyebrow">Vani archive</p>
      <h1>Sampoorna Vani</h1>
      <p style={{ color: "var(--muted)" }}>Sant, shabd ya pad ke shabdon se khojein.</p>
      <VaniList />
    </div>
  );
}
