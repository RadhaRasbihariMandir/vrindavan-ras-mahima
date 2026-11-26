import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: "var(--sp-24)", textAlign: "center" }}>
      <h1>Ye shabd archive me nahi mila</h1>
      <p style={{ color: "var(--muted)", margin: "0 auto var(--sp-6)" }}>
        Jo aap dhoondh rahe hain wo yahan nahi hai — poore vani archive me khojein.
      </p>
      <Link href="/vani" className="btn">Vani archive kholein</Link>
    </div>
  );
}
