import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(
  path.resolve("node_modules/.pnpm/sharp@0.34.5/node_modules/sharp")
);

// GitHub-style identicon: 5x5 grid, left-right mirrored, deterministic from a seed.
const SIZE = 120;
const PAD = 16;
const GRID = 5;
const CELL = (SIZE - PAD * 2) / GRID;
const BG = "#f0f0f0";

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildIdenticon(seed) {
  const h = hash(seed);
  // Foreground colour from the hash, GitHub-ish saturation/lightness.
  const hue = h % 360;
  const fg = `hsl(${hue}, 52%, 56%)`;

  // Use successive bits of the hash to fill the left half + centre column.
  let bits = h;
  const cells = [];
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 5; row++) {
      const on = (bits & 1) === 1;
      bits = bits >>> 1;
      if (bits === 0) bits = hash(seed + col + row);
      if (on) cells.push([col, row]);
    }
  }

  let rects = "";
  for (const [col, row] of cells) {
    for (const c of col === 2 ? [2] : [col, GRID - 1 - col]) {
      const x = PAD + c * CELL;
      const y = PAD + row * CELL;
      rects += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${CELL.toFixed(2)}" height="${CELL.toFixed(2)}" fill="${fg}"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>
  ${rects}
</svg>`;
}

mkdirSync("public/assets/avatars", { recursive: true });

const seeds = [
  ["rv1", "junwoo-do"],
  ["rv2", "haeun-k"],
  ["rv3", "leo-park"],
  ["sasha", "sasha1107"]
];

for (const [file, seed] of seeds) {
  const svg = buildIdenticon(seed);
  await sharp(Buffer.from(svg)).png().toFile(`public/assets/avatars/${file}.png`);
  console.log("wrote", `public/assets/avatars/${file}.png`);
}
