import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL ?? "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
