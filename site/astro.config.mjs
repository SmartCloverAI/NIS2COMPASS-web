import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nis2compass.org",
  output: "static",
  server: {
    host: "0.0.0.0",
    port: 8080
  }
});
