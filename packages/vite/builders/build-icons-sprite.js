/**
 * Builds an SVG symbol sprite from assets/icons/*.svg (excludes sprite.svg).
 *
 * Only assets/icons/ is scanned. assets/featured-icons/ is ignored (standalone
 * / featured artwork referenced directly from CSS or templates).
 *
 * Source SVGs stay in place. Every icon is also written to:
 *   - templates/icons/sprite.html.twig  (include once from html.html.twig)
 *   - dist/icons/sprite.svg             (tooling)
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * @param {{
 *   cwd?: string,
 *   iconsDir?: string,
 *   twigOut?: string,
 *   distOut?: string,
 *   symbolPrefix?: string,
 *   spriteClass?: string,
 * }} [options]
 */
export function buildIconsSprite({
  cwd = process.cwd(),
  iconsDir = "assets/icons",
  twigOut = "templates/icons/sprite.html.twig",
  distOut = "dist/icons/sprite.svg",
  symbolPrefix = "ssk-icon-",
  spriteClass = "ssk-icon-sprite",
} = {}) {
  const iconsPath = path.resolve(cwd, iconsDir);
  const twigPath = path.resolve(cwd, twigOut);
  const distPath = path.resolve(cwd, distOut);

  if (!fs.existsSync(iconsPath)) {
    console.log("  [icons] skip — assets/icons missing");
    return;
  }

  const files = fs
    .readdirSync(iconsPath)
    .filter((f) => f.endsWith(".svg") && f !== "sprite.svg")
    .sort();

  const symbols = files.map((file) => {
    const name = file.replace(/\.svg$/i, "");
    const raw = fs.readFileSync(path.join(iconsPath, file), "utf8");
    const viewBox = extractViewBox(raw);
    const inner = extractInner(raw);
    return `<symbol id="${symbolPrefix}${name}" viewBox="${viewBox}">\n${inner}\n</symbol>`;
  });

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" class="${spriteClass}" aria-hidden="true" focusable="false">${symbols.join("")}</svg>`;

  const twig = `{#
/**
 * @file
 * Generated SVG symbol sprite — do not edit by hand.
 * Source icons: assets/icons/*.svg
 * Rebuild: theme build (icons pipeline)
 */
#}
${sprite}
`;

  fs.mkdirSync(path.dirname(twigPath), { recursive: true });
  fs.mkdirSync(path.dirname(distPath), { recursive: true });
  fs.writeFileSync(twigPath, twig);
  fs.writeFileSync(distPath, `${sprite}\n`);

  console.log(`  [icons] sprite → ${files.length} symbols`);
}

function extractViewBox(svg) {
  const m = svg.match(/\bviewBox=["']([^"']+)["']/i);
  return m ? m[1] : "0 0 24 24";
}

function extractInner(svg) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<svg\b[^>]*>/i, "")
    .replace(/<\/svg>/i, "")
    .replace(/\s+aria-hidden=["'][^"']*["']/gi, "")
    .replace(/\s+focusable=["'][^"']*["']/gi, "")
    .trim();
}

const isCli =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isCli) {
  buildIconsSprite();
}
