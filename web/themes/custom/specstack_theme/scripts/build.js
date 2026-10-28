#!/usr/bin/env node

import { buildTheme } from "@specstack/vite/build";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const isDev = args.includes("--dev");
const watch = args.includes("--watch");
const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await buildTheme({
  isDev,
  watch,
  cwd,
  reactEntry: "./src/react/main.tsx",
  reactBasePath: "/themes/custom/specstack_theme/dist/",
  themeLabel: "specstack_theme",
});
