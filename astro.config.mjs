// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@/": fileURLToPath(new URL("./src", import.meta.url)),
        "@/assets": fileURLToPath(new URL("./public/assets", import.meta.url)),
      },
    },
  },
  integrations: [react(), tailwind()],
});
