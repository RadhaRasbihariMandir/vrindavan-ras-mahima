// Android build: static-exports the reader app into out/ for Capacitor.
// API routes (admin panel backend) only run on the web server, so they are
// moved aside during the export and always restored afterwards.
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const api = path.join(process.cwd(), "app", "api");
const parked = path.join(os.tmpdir(), `vrm-api-${process.pid}`);

fs.renameSync(api, parked);
try {
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, CAP_ANDROID: "1" } });
  execSync("npx cap sync android", { stdio: "inherit" });
} finally {
  fs.cpSync(parked, api, { recursive: true });
  fs.rmSync(parked, { recursive: true, force: true });
}
