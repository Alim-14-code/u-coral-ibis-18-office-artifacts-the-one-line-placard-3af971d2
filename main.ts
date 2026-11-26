// Office Artifacts: The One-Line Placard — entry program.
//
// Reads the single-line placard from entry.txt (shipped beside this file)
// and writes it, unchanged, to <output>/entry.txt, where <output> is
// $MAKEFUN_OUTPUT_DIR when set and /output otherwise. Node 22 stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(repoDir, "entry.txt");

const raw = readFileSync(entryPath, "utf8");
// entry.txt ships as one line; drop a single trailing newline (and any
// carriage return) so an editor-added line ending never counts against
// the 180-character gate or changes the judged text.
let text = raw;
if (text.endsWith("\n")) text = text.slice(0, -1);
if (text.endsWith("\r")) text = text.slice(0, -1);

if (text.length < 1 || text.length > 180 || text.trim().length === 0) {
  throw new Error(
    `entry must be 1-180 non-whitespace characters, got ${text.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");

console.log(`wrote ${text.length} chars: ${text}`);
