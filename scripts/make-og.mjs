import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  path.resolve("node_modules/.pnpm/sharp@0.34.5/node_modules/sharp")
);

const W = 1200;
const H = 630;
const A = "public/assets/mascots";

const b64 = (p) => `data:image/png;base64,${readFileSync(p).toString("base64")}`;
const egg = b64(`${A}/egg.png`);
const chick = b64(`${A}/chick.png`);
const chicken = b64(`${A}/chicken.png`);
const fried = b64(`${A}/friedchicken.png`);
const mark = b64("public/assets/brand/peck-mark.png");

const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

// ─── Variant A — Light "journey" (GitHub light) ───────────────────────────
const variantA = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#f6f8fa"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="24" fill="#ffffff" stroke="#d0d7de" stroke-width="2"/>

  <g transform="translate(84,96)">
    <image href="${mark}" x="0" y="-34" width="44" height="44"/>
    <text x="58" y="2" font-family="${FONT}" font-size="30" font-weight="800" fill="#1f2328">Peck</text>
    <text x="58" y="-12" font-family="${FONT}" font-size="0"> </text>
  </g>

  <text x="84" y="250" font-family="${FONT}" font-size="68" font-weight="800" fill="#1f2328">Your PRs,</text>
  <text x="84" y="328" font-family="${FONT}" font-size="68" font-weight="800" fill="#1a7f37">reviewed and hatched.</text>
  <text x="86" y="386" font-family="${FONT}" font-size="27" font-weight="500" fill="#59636e">A native macOS menu-bar agent that reviews your GitHub PRs.</text>

  <g transform="translate(84,470)">
    <image href="${egg}" x="0" y="0" width="92" height="92"/>
    <text x="118" y="60" font-family="${FONT}" font-size="44" fill="#8c959f">›</text>
    <image href="${chick}" x="162" y="0" width="92" height="92"/>
    <text x="280" y="60" font-family="${FONT}" font-size="44" fill="#8c959f">›</text>
    <image href="${chicken}" x="324" y="0" width="92" height="92"/>
    <text x="446" y="60" font-family="${FONT}" font-size="22" font-weight="600" fill="#59636e">from egg to chicken</text>
  </g>
</svg>`;

// ─── Variant B — Dark hero (GitHub dark) ──────────────────────────────────
const variantB = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#1f6f33" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0d1117" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0d1117"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g transform="translate(90,104)">
    <image href="${mark}" x="0" y="-34" width="42" height="42" style="filter:invert(1)"/>
    <text x="56" y="0" font-family="${FONT}" font-size="28" font-weight="800" fill="#f0f6fc">Peck</text>
  </g>

  <rect x="90" y="150" width="64" height="6" rx="3" fill="#2ea043"/>
  <text x="90" y="160" font-family="${FONT}" font-size="22" font-weight="700" fill="#3fb950" letter-spacing="2"> </text>

  <text x="88" y="288" font-family="${FONT}" font-size="74" font-weight="800" fill="#f0f6fc">Your PRs,</text>
  <text x="88" y="372" font-family="${FONT}" font-size="74" font-weight="800" fill="#f0f6fc">reviewed and</text>
  <text x="88" y="456" font-family="${FONT}" font-size="74" font-weight="800" fill="#3fb950">hatched.</text>
  <text x="90" y="520" font-family="${FONT}" font-size="26" font-weight="500" fill="#8b949e">AI drafts the review · you post it with one click.</text>

  <image href="${fried}" x="800" y="180" width="330" height="330"/>
</svg>`;

// ─── Variant C — Playful, mascot-forward ──────────────────────────────────
const variantC = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a7f37"/>
      <stop offset="100%" stop-color="#116329"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff" opacity="0.04"/>

  <g transform="translate(90,104)">
    <image href="${mark}" x="0" y="-34" width="42" height="42" style="filter:invert(1)"/>
    <text x="56" y="0" font-family="${FONT}" font-size="28" font-weight="800" fill="#ffffff">Peck</text>
  </g>

  <image href="${chick}" x="690" y="150" width="430" height="430"/>

  <text x="90" y="300" font-family="${FONT}" font-size="92" font-weight="800" fill="#ffffff">Review</text>
  <text x="90" y="396" font-family="${FONT}" font-size="92" font-weight="800" fill="#ffffff">PRs from</text>
  <text x="90" y="492" font-family="${FONT}" font-size="92" font-weight="800" fill="#ffe08a">your menu bar.</text>
  <text x="92" y="556" font-family="${FONT}" font-size="26" font-weight="500" fill="#d2f5dc">Native macOS · GitHub-native · AI PR review agent</text>
</svg>`;

const jobs = [
  ["public/og-a.png", variantA],
  ["public/og-b.png", variantB],
  ["public/og-c.png", variantC],
];

for (const [out, svg] of jobs) {
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("wrote", out);
}
