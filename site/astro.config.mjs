import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.nis2compass.eu",
  output: "static",
  server: {
    host: "0.0.0.0",
    port: 4321
  }
});
