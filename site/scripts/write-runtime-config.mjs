import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const distRoot = resolve(siteRoot, "dist");

function normalizeEdgeNodeName(value) {
  if (typeof value !== "string") return "";
  const normalized = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 128);
  return normalized;
}

const edgeNodeName = [process.env.EE_HOST_ID, process.env.EDGE_NODE_NAME].map(normalizeEdgeNodeName).find(Boolean) || "local";
const runtimeConfig = `globalThis.__N2C_RUNTIME__ = Object.freeze(${JSON.stringify({ edgeNodeName })});\n`;

await mkdir(distRoot, { recursive: true });
await writeFile(resolve(distRoot, "runtime-config.js"), runtimeConfig, "utf8");
console.log(`Runtime edge node configured as: ${edgeNodeName}`);
