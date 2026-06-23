// Aggregate runner: executes every `test:*` script in package.json sequentially
// and fails on the first error. Keeps a single pre-merge entry point so new
// `test:<area>` checks are picked up automatically without editing this file.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

const scripts = Object.keys(pkg.scripts || {})
  .filter((name) => name.startsWith("test:"))
  .sort();

if (!scripts.length) {
  console.error("test-all: no test:* scripts found");
  process.exit(1);
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
let failed = 0;

for (const name of scripts) {
  process.stdout.write(`\n▶ ${name}\n`);
  const result = spawnSync(npm, ["run", name], { cwd: root, stdio: "inherit" });
  if (result.status !== 0) {
    failed += 1;
    console.error(`✗ ${name} failed (exit ${result.status})`);
  }
}

if (failed) {
  console.error(`\ntest-all: ${failed} of ${scripts.length} suites failed`);
  process.exit(1);
}
console.log(`\ntest-all: all ${scripts.length} suites passed`);
