import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "content.json");
const read = () => JSON.parse(fs.readFileSync(FILE, "utf8"));
const write = (d: unknown) => fs.writeFileSync(FILE, JSON.stringify(d, null, 2));

export async function GET(_req: Request, { params }: RouteContext<"/api/granths/[id]">) {
  const { id } = await params;
  const g = read().granths.find((x: { id: string }) => x.id === id);
  if (!g) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(g);
}

export async function PUT(req: Request, { params }: RouteContext<"/api/granths/[id]">) {
  const { id } = await params;
  const body = await req.json();
  const data = read();
  const i = data.granths.findIndex((x: { id: string }) => x.id === id);
  if (i === -1) return Response.json({ error: "not found" }, { status: 404 });
  data.granths[i] = {
    ...data.granths[i],
    title: body.title ?? data.granths[i].title,
    verses: Array.isArray(body.verses) ? body.verses : data.granths[i].verses,
  };
  write(data);
  return Response.json(data.granths[i]);
}

export async function DELETE(_req: Request, { params }: RouteContext<"/api/granths/[id]">) {
  const { id } = await params;
  const data = read();
  const before = data.granths.length;
  data.granths = data.granths.filter((x: { id: string }) => x.id !== id);
  if (data.granths.length === before) return Response.json({ error: "not found" }, { status: 404 });
  write(data);
  return Response.json({ ok: true });
}
