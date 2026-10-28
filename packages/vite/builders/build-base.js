/**
 * Base theme assets: src/css → dist/css, src/js → dist/js (IIFE).
 * Nested folders under src/css and src/js are preserved under dist/.
 * Partials (_*.css / _*.ts / _*.tsx) are not entries — import them from full entries.
 * Source entries are TypeScript only (.ts / .tsx).
 */

import { build } from "vite";
import { glob } from "glob";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { compileCss } from "./compile-css.js";

/**
 * @param {{ isDev?: boolean, cwd?: string }} [options]
 */
export async function buildBase({ isDev = false, cwd = process.cwd() } = {}) {
  const prev = process.cwd();
  process.chdir(cwd);

  try {
    console.log("  [base] CSS src/css/ → dist/css/");

    const cssFiles = glob.sync("./src/css/**/*.css", {
      ignore: ["./src/css/**/_*.css"],
    });

    for (const file of cssFiles) {
      const relativePath = file.replace(/^\.?\/?src\/css\//, "");
      const outDir = path.dirname(path.join("dist/css", relativePath));
      const outName = path.basename(relativePath);

      await compileCss(file, outDir, outName, { isDev });
      console.log(`    -> dist/css/${relativePath}`);
    }

    if (cssFiles.length === 0) {
      console.log("    (no CSS entries)");
    }

    console.log("  [base] JS src/js/ → dist/js/");

    const looseJs = glob.sync("./src/js/**/*.{js,jsx}", {
      ignore: ["./src/js/**/_*.{js,jsx}", "./src/js/**/*.test.{js,jsx}"],
    });
    if (looseJs.length > 0) {
      console.warn(
        "  [base] Plain .js/.jsx sources are not built. Convert to .ts/.tsx:",
      );
      for (const file of looseJs) {
        console.warn(`    - ${file}`);
      }
    }

    const tsFiles = glob.sync("./src/js/**/*.{ts,tsx}", {
      ignore: [
        "./src/js/**/_*.{ts,tsx}",
        "./src/js/**/*.d.ts",
        "./src/js/**/*.test.{ts,tsx}",
      ],
    });

    for (const file of tsFiles) {
      const relativePath = file.replace(/^\.?\/?(src\/js\/)/, "");
      const outputDir = path.dirname(path.join("dist/js", relativePath));
      const outputFileName =
        path.basename(relativePath, path.extname(relativePath)) + ".js";

      fs.mkdirSync(outputDir, { recursive: true });

      await build({
        configFile: false,
        plugins: [tailwindcss()],
        build: {
          outDir: outputDir,
          rolldownOptions: {
            input: file,
            output: {
              format: "iife",
              name: path
                .basename(file, path.extname(file))
                .replace(/[^a-zA-Z0-9]/g, ""),
              entryFileNames: outputFileName,
              codeSplitting: false,
            },
          },
          sourcemap: isDev,
          minify: !isDev,
          write: true,
          emptyOutDir: false,
        },
        logLevel: "warn",
      });

      console.log(
        `    -> dist/js/${relativePath.replace(/\.(ts|tsx)$/, ".js")}`,
      );
    }

    if (tsFiles.length === 0) {
      console.log("    (no TS entries)");
    }
  } finally {
    process.chdir(prev);
  }
}
