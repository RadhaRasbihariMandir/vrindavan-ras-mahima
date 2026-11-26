// One-time importer: reads the extracted XAPK flutter_assets YAMLs and media
// into the app's data/content.json and public/media/. Run: node scripts/import-apk.mjs
import { load as yamlLoad } from "js-yaml";
import fs from "node:fs";
import path from "node:path";

const SRC = "/vercel/sandbox/xapk/apk/assets/flutter_assets/assets";
const ROOT = process.cwd();
const MEDIA = path.join(ROOT, "public/media");
fs.mkdirSync(MEDIA, { recursive: true });

// 1. Copy media (mp3 audio, saints/chaturasi jpgs)
const audioDir = path.join(MEDIA, "audio");
fs.mkdirSync(audioDir, { recursive: true });
let copied = 0;
for (const dir of ["audio", "SMRSNJ"]) {
  const p = path.join(SRC, dir);
  if (!fs.existsSync(p)) continue;
  for (const f of fs.readdirSync(p)) {
    if (f.endsWith(".mp3")) {
      const dest = path.join(audioDir, dir === "audio" ? f : `SMRSNJ_${f}`);
      if (!fs.existsSync(dest)) fs.copyFileSync(path.join(p, f), dest);
      copied++;
    }
  }
}
for (const dir of ["saints", "chaturasi"]) {
  const destDir = path.join(MEDIA, dir);
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(SRC, dir))) {
    if (f.endsWith(".jpg")) fs.copyFileSync(path.join(SRC, dir, f), path.join(destDir, f));
  }
}
console.log("media files copied:", copied);

// 2. Parse all top-level granth YAMLs (list of verses)
const skip = new Set([
  "ashtyam_en.yaml", "ashtyam_hi.yaml", "saints_data.yaml",
  "topic-wise-questions.yaml", "byaleesleea_extra_pages_after.yaml",
  "byaleesleea_extra_pages_before.yaml",
]);
function safeLoadFile(p) {
  try {
    return yamlLoad(fs.readFileSync(p, "utf8"));
  } catch (e) {
    console.warn("YAML parse failed (skipping verse shape check):", path.basename(p), e.message.split("\n")[0]);
    // Retry line-wise: extract verseNumber/verseIntro/verseText blocks manually
    const raw = fs.readFileSync(p, "utf8");
    const verses = [];
    const blocks = raw.split(/^- /m).slice(1);
    for (const b of blocks) {
      const num = b.match(/verseNumber:\s*"?([^"\n]*)"?\s*\n/)?.[1] ?? "";
      const intro = b.match(/verseIntro:\s*([\s\S]*?)\n\s*verseText:/)?.[1]?.trim().replace(/^"|"$/g, "") ?? "";
      const text = b.match(/verseText:\s*\|\-?\s*\n([\s\S]*)$/)?.[1] ?? "";
      if (text.trim()) verses.push({ number: num, intro, text: text.replace(/\n\s*\n/g, "\n\n").trim() });
    }
    return verses.length ? verses : null;
  }
}

const granths = [];
for (const f of fs.readdirSync(SRC)) {
  if (!f.endsWith(".yaml") || skip.has(f)) continue;
  const doc = safeLoadFile(path.join(SRC, f));
  if (!Array.isArray(doc) || !doc.length || !doc[0]?.verseText) continue;
  const verses = doc
    .filter((v) => v?.verseText)
    .map((v, i) => {
      const text = String(v.verseText).trim();
      // vyakhya sections embedded as "व्याख्या - ..." lines stay with the verse;
      // reader splits them for display.
      return {
        number: v.verseNumber ?? String(i + 1),
        intro: v.verseIntro ?? "",
        text,
      };
    });
  granths.push({
    id: path.basename(f, ".yaml"),
    title: path.basename(f, ".yaml"),
    source: "com.vrindavan_ras_mahima 1.0.76 assets",
    verses,
  });
}
granths.sort((a, b) => a.title.localeCompare(b.title));

const saints = safeLoadFile(path.join(SRC, "saints_data.yaml")) ?? { images: [] };

const data = { granths, saints, importedAt: new Date().toISOString() };
fs.mkdirSync(path.join(ROOT, "data"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "data/content.json"), JSON.stringify(data, null, 2));
console.log("granths:", granths.length, "verses:", granths.reduce((n, g) => n + g.verses.length, 0));
