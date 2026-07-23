import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getReleaseErrors } from "./lib/release-policy.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const config = JSON.parse(await readFile(resolve(siteRoot, "src/config/publication.json"), "utf8"));
const errors = await getReleaseErrors(siteRoot, config);

if (errors.length > 0) {
  console.error("Public release gate is closed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Public release gate passed.");
