// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@/": fileURLToPath(new URL("./src", import.meta.url)),
        "@/assets": fileURLToPath(new URL("./public/assets", import.meta.url)),
      },
    },
    server: {
      allowedHosts: ["wielder-dipped-unplowed.ngrok-free.dev"],
    },
  },

  integrations: [react(), tailwind()],
  adapter: cloudflare()
});