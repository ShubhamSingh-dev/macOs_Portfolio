import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(dirname(fileURLToPath(import.meta.url)), "src"),
      "@src/constants": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "constants"
      ),
      "@src/store": resolve(dirname(fileURLToPath(import.meta.url)), "store"),
      "@src/hoc": resolve(dirname(fileURLToPath(import.meta.url)), "hoc"),
      "@src/windows": resolve(
        dirname(fileURLToPath(import.meta.url)),
        "windows"
      ),
    },
  },
});
