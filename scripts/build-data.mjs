import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

function build(srcPath, outName) {
  const lines = fs.readFileSync(srcPath, "utf8").split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith("export const report"));
  const fnIdx = lines.findIndex((l) => l.startsWith("export function getDomainById"));
  if (start < 0 || fnIdx < 0) throw new Error(`parse fail ${srcPath}`);
  const objectEnd = fnIdx - 2;
  const objectLines = lines.slice(start, objectEnd + 1);
  const rest = lines.slice(fnIdx);
  const header = `import type { Report, Domain, Finding, Severity } from "./types";\n\n`;
  const objectBlock = objectLines.join("\n");
  const helpers = rest.join("\n");
  const out = `${header}${objectBlock}\n\n${helpers}\n`;
  fs.writeFileSync(path.join(dataDir, outName), out);
}

build(
  "C:/Users/vbrac/Desktop/code/moncoeur/mc-rails-doctor/data/report.ts",
  "mc-rails.ts"
);
build("C:/Users/vbrac/Downloads/rails-doctor-paujauran/data/report.ts", "paujauran.ts");
console.log("data files written");
