const [major, minor] = process.versions.node.split(".").map(Number);
const ok = major > 20 || (major === 20 && minor >= 9);
if (!ok) {
  console.error("\n[!] Node.js >= 20.9 requis avant Next.js.");
  console.error(`    Version actuelle : ${process.version}`);
  process.exit(1);
}
