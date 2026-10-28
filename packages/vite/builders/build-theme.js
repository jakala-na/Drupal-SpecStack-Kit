/**
 * Theme build orchestrator.
 *
 * 1. icons  — assets/icons → sprite Twig + dist SVG
 * 2. base   — src/css + src/js (TS) → dist/ (nesting + _ partials)
 * 3. sdc    — each component src/ → assets at the component root
 * 4. react  — React entry → dist/js/react-app.js
 *
 * Flags: --dev (sourcemaps, no minify), --watch
 */

import fs from "node:fs";
import path from "node:path";
import { buildBase } from "./build-base.js";
import { buildSdc } from "./build-sdc.js";
import { buildReact } from "./build-react.js";
import { buildIconsSprite } from "./build-icons-sprite.js";

/**
 * @param {{
 *   isDev?: boolean,
 *   watch?: boolean,
 *   cwd?: string,
 *   reactEntry?: string,
 *   reactBasePath?: string,
 *   themeLabel?: string,
 * }} [options]
 */
export async function buildTheme(options = {}) {
  const {
    isDev = false,
    watch = false,
    cwd = process.cwd(),
    reactEntry = "./src/react/main.tsx",
    reactBasePath = "/themes/custom/specstack_theme/dist/",
    themeLabel = "SpecStack theme",
  } = options;

  const buildType = isDev ? "DEV" : "PRODUCTION";

  function cleanDist() {
    const dist = path.join(cwd, "dist");
    if (fs.existsSync(dist)) {
      fs.rmSync(dist, { recursive: true, force: true });
    }
    fs.mkdirSync(dist, { recursive: true });
  }

  async function performFullBuild() {
    const start = Date.now();
    console.log(`\n--- ${themeLabel} ${buildType} build ---\n`);

    cleanDist();
    buildIconsSprite({ cwd });
    await buildBase({ isDev, cwd });
    await buildSdc({ isDev, cwd });
    await buildReact({
      isDev,
      cwd,
      entry: reactEntry,
      basePath: reactBasePath,
    });

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n--- ${buildType} build done (${elapsed}s) ---\n`);
  }

  function resolvePipelines(filePath) {
    const normalized = filePath.replace(/\\/g, "/");

    if (normalized.includes("/src/api/") || normalized.startsWith("src/api/")) {
      return ["sdc", "react"];
    }
    if (
      normalized.includes("/assets/icons/") ||
      normalized.startsWith("assets/icons/")
    ) {
      return ["icons"];
    }
    if (normalized.includes("/components/") && normalized.includes("/src/")) {
      return ["sdc"];
    }
    if (
      normalized.includes("/src/react/") ||
      normalized.startsWith("src/react/")
    ) {
      return ["react"];
    }
    if (
      normalized.includes("/src/") ||
      normalized.startsWith("src/") ||
      normalized.includes("/templates/") ||
      normalized.startsWith("templates/")
    ) {
      return ["base"];
    }
    return ["icons", "base", "sdc", "react"];
  }

  async function runPipeline(name) {
    switch (name) {
      case "icons":
        return buildIconsSprite({ cwd });
      case "base":
        return buildBase({ isDev, cwd });
      case "sdc":
        return buildSdc({ isDev, cwd });
      case "react":
        return buildReact({
          isDev,
          cwd,
          entry: reactEntry,
          basePath: reactBasePath,
        });
    }
  }

  if (!watch) {
    await performFullBuild();
    return;
  }

  const watchDirs = ["src", "components", "templates", "assets/icons"].map(
    (p) => path.join(cwd, p),
  );

  console.log(`[watch] ${themeLabel} (${buildType})`);
  watchDirs.forEach((p) => console.log(`  ${p}/`));

  await performFullBuild();

  const chokidar = await import("chokidar");
  let building = false;
  let queued = null;
  const DEBOUNCE_MS = 250;
  let debounceTimer = null;

  function scheduleRebuild(filePath) {
    if (debounceTimer) clearTimeout(debounceTimer);

    const pipelines = resolvePipelines(filePath);
    if (queued) {
      for (const p of pipelines) {
        if (!queued.pipelines.includes(p)) queued.pipelines.push(p);
      }
    } else {
      queued = { pipelines: [...pipelines] };
    }

    debounceTimer = setTimeout(async () => {
      if (building) return;
      building = true;

      const batch = queued;
      queued = null;

      const start = Date.now();
      console.log(`\n[watch] Rebuilding: ${batch.pipelines.join(", ")}`);

      try {
        for (const p of batch.pipelines) {
          await runPipeline(p);
        }
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        console.log(`[watch] Done (${elapsed}s)`);
      } catch (err) {
        console.error("[watch] Rebuild error:", err.message);
      }

      building = false;
      if (queued) scheduleRebuild("");
    }, DEBOUNCE_MS);
  }

  const watcher = chokidar.watch(watchDirs, {
    ignored: (filePath) => {
      const normalized = filePath.replace(/\\/g, "/");
      if (normalized.includes("node_modules")) return true;
      if (normalized.includes("/.git") || normalized.startsWith(".git")) {
        return true;
      }

      const basename = path.basename(normalized);
      if (basename.startsWith("_temp-")) return true;
      if (/(?:^|\/)dist(\/|$)/.test(normalized)) return true;
      if (normalized.endsWith("/templates/icons/sprite.html.twig")) {
        return true;
      }

      const compMatch = normalized.match(/(?:^|\/)components\/(.+)/);
      if (compMatch) {
        const afterComponents = compMatch[1];
        if (!afterComponents.includes("/")) return false;
        if (/\/src(\/|$)/.test(afterComponents)) return false;
        if (normalized.endsWith(".twig")) return false;
        return true;
      }
      return false;
    },
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on("all", (event, filePath) => {
    if (event === "addDir") return;
    console.log(`  [${event}] ${filePath}`);
    scheduleRebuild(filePath);
  });

  process.on("SIGINT", () => {
    console.log("\n[watch] Stopped.");
    watcher.close();
    process.exit(0);
  });
}
