#!/usr/bin/env node
// Builds src/assets/floaters/mood-dude.webp, the strip of frames the Mood
// Dude behind the logo plays. Run it again only if the sprites change:
//
//   node scripts/dude-sheet.mjs <mood-dude repo> <mood-dude-adventures repo>
//
// The strip is one row of 128 px cells. Each mood is six cells: one of a
// jump (he lands), four of standing, one of a jump (he takes off). He
// changes mood at the top of the jump, between two moods' cells. First the dude of Mood Dude and Mood Dude:
// Infinity (green, blue, red), then the creatures of Mood Dude: Adventures
// (green, blue, red, yellow). `.dude` in global.css plays it and must agree
// on the number of cells and on the moods' order.

import sharp from "sharp";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const [classicRepo, adventuresRepo] = process.argv.slice(2);
if (!classicRepo || !adventuresRepo) {
  console.error("Usage: node scripts/dude-sheet.mjs <mood-dude repo> <mood-dude-adventures repo>");
  process.exit(1);
}

const CELL = 128;
const cells = [];

// The original dude is 40 x 56: enlarged to the height of the Adventures
// creatures, standing on the same line as their feet.
for (const mood of ["green", "blue", "red"]) {
  for (const frame of ["jump", "still", "still", "still", "still", "jump"]) {
    const input = await sharp(join(classicRepo, "assets/player", `${mood}_${frame}.png`))
      .resize(70, 98)
      .toBuffer();
    cells.push({ input, left: 29, top: 26 });
  }
}
for (const mood of ["green", "blue", "red", "yellow"]) {
  for (const frame of ["jump", "idle", "idle", "idle", "idle", "jump"]) {
    cells.push({ input: join(adventuresRepo, "assets/player", `${mood}_${frame}.png`), left: 0, top: 0 });
  }
}

await sharp({
  create: { width: CELL * cells.length, height: CELL, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite(cells.map((cell, i) => ({ ...cell, left: cell.left + i * CELL })))
  .webp({ lossless: true })
  .toFile(fileURLToPath(new URL("../src/assets/floaters/mood-dude.webp", import.meta.url)));

console.log(`${cells.length} cells written.`);
