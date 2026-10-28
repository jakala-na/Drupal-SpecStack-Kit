import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  // Resolved relative to the package cwd (packages/drupal-sdk).
  input: "../../web/themes/custom/specstack_theme/openapi_schemas/openapi.json",
  output: "src/openapi-clients/specstack",
  plugins: [
    "@hey-api/client-fetch",
    { name: "@hey-api/sdk", validator: true },
    "@tanstack/react-query",
    "zod",
  ],
});
