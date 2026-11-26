import { load as yamlLoad } from "js-yaml";
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "content.json");

function read() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}
function write(data: unknown) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return Response.json(read());
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = read();
  const g = {
    id: String(body.id ?? Date.now()),
    title: String(body.title ?? "Naya Granth"),
    source: "admin panel",
    verses: Array.isArray(body.verses) ? body.verses : [],
  };
  data.granths.push(g);
  write(data);
  return Response.json(g, { status: 201 });
}
