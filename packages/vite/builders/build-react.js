/**
 * React app: entry → dist/js/react-app.js (ESM).
 * Mount points are declared in packages/ui block config (or theme-local equivalent).
 */

import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 * @param {{
 *   isDev?: boolean,
 *   cwd?: string,
 *   entry?: string,
 *   basePath?: string,
 * }} [options]
 */
export async function buildReact({
  isDev = false,
  cwd = process.cwd(),
  entry = "./src/react/main.tsx",
  basePath = "/themes/custom/specstack_theme/dist/",
} = {}) {
  const prev = process.cwd();
  process.chdir(cwd);

  try {
    const entryPath = path.resolve(entry);
    if (!fs.existsSync(entryPath)) {
      console.log(`  [react] No ${entry} — skip`);
      return;
    }

    console.log("  [react] Building React app...");

    const reactPath = path.dirname(
      require.resolve("react/package.json", { paths: [cwd] }),
    );
    const reactDomPath = path.dirname(
      require.resolve("react-dom/package.json", { paths: [cwd] }),
    );

    await build({
      configFile: false,
      base: basePath,
      plugins: [react(), tailwindcss()],
      resolve: {
        dedupe: ["react", "react-dom"],
        alias: {
          react: reactPath,
          "react-dom": reactDomPath,
        },
      },
      build: {
        outDir: "dist",
        modulePreload: false,
        rolldownOptions: {
          input: entryPath,
          output: {
            format: "es",
            // Keep one ESM file. Drupal library URLs append ?{query_string};
            // async chunks would resolve the entry without that query and load
            // a second module graph.
            entryFileNames: "js/react-app.js",
            assetFileNames: (assetInfo) => {
              const fileName = assetInfo.name;
              if (!fileName) return "assets/[name]-[hash][extname]";
              if (/\.(woff2?|ttf|eot|otf)$/i.test(fileName)) {
                return "fonts/[name][extname]";
              }
              if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(fileName)) {
                return "images/[name][extname]";
              }
              if (fileName.endsWith(".css")) return "css/react-app.css";
              return "css/[name][extname]";
            },
            codeSplitting: false,
          },
        },
        sourcemap: isDev,
        emptyOutDir: false,
        minify: !isDev,
      },
      logLevel: "warn",
    });

    console.log("    -> dist/js/react-app.js");
  } finally {
    process.chdir(prev);
  }
}
