/**
 * Compiles one CSS entry with Vite + Tailwind.
 * Uses base "./" so url() fonts/images resolve next to the emitted CSS in Drupal.
 */

import { build } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

/**
 * @param {string} inputFile
 * @param {string} outDir
 * @param {string} outName
 * @param {{ isDev?: boolean }} [options]
 */
export async function compileCss(inputFile, outDir, outName, { isDev = false } = {}) {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  fs.mkdirSync(outDir, { recursive: true });

  const tempJsFile = path.join(outDir, `_temp-css-${uid}.js`);
  fs.writeFileSync(tempJsFile, `import '${path.resolve(inputFile)}';`);

  const tempOutName = `_temp-css-out-${uid}.js`;

  await build({
    configFile: false,
    base: "./",
    plugins: [tailwindcss()],
    build: {
      outDir,
      rolldownOptions: {
        input: tempJsFile,
        output: {
          format: "es",
          entryFileNames: tempOutName,
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name;
            if (!fileName) return "assets/[name]-[hash][extname]";
            if (/\.(woff2?|ttf|eot|otf)$/i.test(fileName)) {
              return "fonts/[name][extname]";
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(fileName)) {
              return "images/[name][extname]";
            }
            if (fileName.endsWith(".css")) return outName;
            return "[name][extname]";
          },
        },
      },
      emptyOutDir: false,
      sourcemap: isDev,
      minify: !isDev,
    },
    logLevel: "warn",
  });

  for (const f of [
    tempJsFile,
    path.join(outDir, tempOutName),
    path.join(outDir, `${tempOutName}.map`),
  ]) {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }
}
