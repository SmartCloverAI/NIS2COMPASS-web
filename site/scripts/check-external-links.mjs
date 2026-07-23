import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");
const register = JSON.parse(await readFile(resolve(repoRoot, "docs/cybersynchrony/tool-register.json"), "utf8"));
const publications = JSON.parse(await readFile(resolve(repoRoot, "docs/publications.json"), "utf8"));
const news = JSON.parse(await readFile(resolve(repoRoot, "docs/news.json"), "utf8"));
const urls = new Set();

for (const module of register.modules) for (const url of module.official_sources) urls.add(url);
for (const tool of register.tools) {
  for (const field of ["homepage", "source_repository", "documentation", "license_source", "cybersynchrony_public_source"]) {
    if (tool[field]) urls.add(tool[field]);
  }
}
for (const publication of publications.publications) urls.add(publication.canonical_url);
for (const item of news.items) {
  if (item.href.startsWith("https://")) urls.add(item.href);
  urls.add(item.source_url);
}

async function check(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal, headers: { "user-agent": "NIS2COMPASS-public-link-check/1.0" } });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { range: "bytes=0-0", "user-agent": "NIS2COMPASS-public-link-check/1.0" } });
    }
    return { url, ok: response.ok, status: response.status };
  } catch (error) {
    return { url, ok: false, status: error.name };
  } finally {
    clearTimeout(timeout);
  }
}

const pending = [...urls];
const results = [];
const workers = Array.from({ length: 4 }, async () => {
  while (pending.length > 0) results.push(await check(pending.shift()));
});
await Promise.all(workers);

const failures = results.filter((result) => !result.ok);
for (const result of results.sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(`${result.ok ? "OK" : "FAIL"} ${result.status} ${result.url}`);
}
if (failures.length > 0) process.exit(1);
