/**
 * SDC assets: each components/<name>/src file → sibling .css/.js at the component root
 * so Drupal auto-discovers them. Do not list compiled paths in component.yml.
 * Partials (_*.css / _*.ts / _*.tsx) are not entries. Source scripts are TypeScript only.
 */

import { build } from "vite";
import { glob } from "glob";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { compileCss } from "./compile-css.js";

/**
 * @param {{ isDev?: boolean, cwd?: string }} [options]
 */
export async function buildSdc({ isDev = false, cwd = process.cwd() } = {}) {
  const prev = process.cwd();
  process.chdir(cwd);

  try {
    const sdcSrcDirs = glob.sync("./components/*/src");

    if (sdcSrcDirs.length === 0) {
      console.log("  [sdc] No components/*/src — skip");
      return;
    }

    console.log("  [sdc] components/*/src → component roots");

    for (const srcDir of sdcSrcDirs) {
      const componentDir = path.dirname(srcDir);
      const componentName = path.basename(componentDir);

      const looseJs = glob.sync(path.join(srcDir, "**/*.{js,jsx}"), {
        ignore: ["**/_*.{js,jsx}", "**/*.test.{js,jsx}"],
      });
      if (looseJs.length > 0) {
        console.warn(
          `  [sdc] ${componentName}: plain .js/.jsx sources are not built. Convert to .ts/.tsx:`,
        );
        for (const file of looseJs) {
          console.warn(`    - ${file}`);
        }
      }

      const tsFiles = glob.sync(path.join(srcDir, "**/*.{ts,tsx}"), {
        ignore: ["**/_*.{ts,tsx}", "**/*.d.ts", "**/*.test.{ts,tsx}"],
      });

      for (const file of tsFiles) {
        const baseName = path.basename(file, path.extname(file));
        const outputFileName = `${baseName}.js`;

        await build({
          configFile: false,
          plugins: [tailwindcss()],
          build: {
            outDir: componentDir,
            rolldownOptions: {
              input: file,
              output: {
                format: "iife",
                name: baseName.replace(/[^a-zA-Z0-9]/g, ""),
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

        console.log(`    -> ${componentName}/${outputFileName}`);
      }

      const cssFiles = glob.sync(path.join(srcDir, "**/*.css"), {
        ignore: [path.join(srcDir, "**/_*.css")],
      });

      for (const file of cssFiles) {
        const baseName = path.basename(file);
        await compileCss(file, componentDir, baseName, { isDev });
        console.log(`    -> ${componentName}/${baseName}`);
      }

      if (tsFiles.length === 0 && cssFiles.length === 0) {
        console.log(`    [sdc] ${componentName}/src empty — skip`);
      }
    }
  } finally {
    process.chdir(prev);
  }
}
