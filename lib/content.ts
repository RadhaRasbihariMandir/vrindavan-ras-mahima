// All vani imported from the app's own bundled assets (santo ki vani —
// centuries-old texts, no copyright). Regenerate: node scripts/import-apk.mjs
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "data", "content.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

export type Verse = { number: string; intro: string; text: string };
export type Granth = { id: string; title: string; source: string; verses: Verse[] };
export type ContentType = { granths: Granth[]; saints: { images: string[] } | null };

export const content: ContentType = data;
export const granths: Granth[] = data.granths;
export const getGranth = (id: string) => granths.find((g) => g.id === id);
export const mediaUrl = (name: string) => `/media/audio/${encodeURIComponent(name)}`;
