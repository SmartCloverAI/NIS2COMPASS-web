import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getPublicationConfigErrors } from "./lib/release-policy.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const distRoot = resolve(siteRoot, "dist");
const config = JSON.parse(await readFile(resolve(siteRoot, "src/config/publication.json"), "utf8"));
const news = JSON.parse(await readFile(resolve(siteRoot, "../docs/news.json"), "utf8"));
const errors = [];
errors.push(...await getPublicationConfigErrors(siteRoot, config));
const builtTextExtensions = new Set([".css", ".csv", ".html", ".js", ".json", ".jsonl", ".md", ".mjs", ".svg", ".txt", ".xml", ".yaml", ".yml"]);
const requiredRoutes = [
  "/",
  "/news/",
  "/blogs/",
  "/blogs/n2c-article-1/",
  "/tools/",
  "/resources/",
  "/docs/",
  "/docs/progress/",
  "/docs/progress/2026-06-month-1/",
  "/docs/cybersynchrony/",
  "/docs/cybersynchrony-alignment/",
  "/docs/cybersynchrony/modules/cyrescue/",
  "/docs/cybersynchrony/modules/cyberra/",
  "/docs/cybersynchrony/modules/cybrite/",
  "/docs/cybersynchrony/modules/cross-core/",
  "/docs/cybersynchrony/modules/cyberwise/",
  "/docs/cybersynchrony/modules/cybergoplus/"
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : path;
  }));
  return paths.flat();
}

function routeToPath(route) {
  return route === "/" ? resolve(distRoot, "index.html") : resolve(distRoot, `.${route}index.html`);
}

function escapeHtmlText(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const route of requiredRoutes) {
  if (!(await exists(routeToPath(route)))) errors.push(`Missing required route: ${route}`);
}

const allBuiltFiles = await walk(distRoot);
const htmlFiles = allBuiltFiles.filter((path) => extname(path) === ".html");
const textFiles = allBuiltFiles.filter((path) => builtTextExtensions.has(extname(path)));
const forbiddenPatterns = [
  ["private report path", /N2C-reports/gi],
  ["private internal path", /(?:^|[^A-Za-z0-9_-])internal\//gim],
  ["wrapper milestone path", /progress\/M\d/gi],
  ["internal-only CYberSynchrony abbreviation", new RegExp("\\b" + ["C", "Y", "S"].join("") + "\\b", "gi")]
];

for (const path of textFiles) {
  const content = await readFile(path, "utf8");
  if (config.release_state === "published" && /-preview\.\d+/i.test(content)) errors.push(`${relative(distRoot, path)} retains a preview version token in published state`);
  for (const [label, pattern] of forbiddenPatterns) {
    if (pattern.test(content)) errors.push(`${relative(distRoot, path)} contains forbidden ${label}`);
    pattern.lastIndex = 0;
  }
}

for (const path of htmlFiles) {
  const html = await readFile(path, "utf8");
  if (/href=["'][^"']+\.md(?:[?#][^"']*)?["']/i.test(html)) {
    errors.push(`${relative(distRoot, path)} links a reader to raw Markdown`);
  }
  const hasNoIndex = /<meta name="robots" content="noindex, nofollow">/.test(html);
  if (config.release_state === "preview" && !hasNoIndex) errors.push(`${relative(distRoot, path)} is missing preview no-index metadata`);
  if (config.release_state === "published" && hasNoIndex) errors.push(`${relative(distRoot, path)} retains preview no-index metadata in published state`);
  if (config.release_state === "preview" && !html.includes("This build is not approved for publication.")) errors.push(`${relative(distRoot, path)} is missing the preview warning`);
  if (config.release_state === "published" && html.includes("This build is not approved for publication.")) errors.push(`${relative(distRoot, path)} retains the preview warning in published state`);
  if (config.release_state === "published" && !html.includes(escapeHtmlText(config.funding_sentence))) errors.push(`${relative(distRoot, path)} is missing the approved funding sentence`);
  if (config.release_state === "published" && !html.includes(escapeHtmlText(config.disclaimer))) errors.push(`${relative(distRoot, path)} is missing the approved disclaimer`);
  if (config.release_state === "published" && !html.includes(`src="${config.eu_emblem}"`)) errors.push(`${relative(distRoot, path)} is missing the approved European Union and ECCC funding mark`);
  if (config.release_state === "published" && !html.includes(`src="${config.cybersynchrony_logo}"`)) errors.push(`${relative(distRoot, path)} is missing the approved CYberSynchrony logo`);
  if (!html.includes(`Version <strong>${config.site_version}</strong>`)) errors.push(`${relative(distRoot, path)} is missing the current public site version`);
  if (!html.includes("Served by edge node <strong data-edge-node-name>local</strong>")) errors.push(`${relative(distRoot, path)} is missing the local edge-node fallback`);

  for (const match of html.matchAll(/(href|src)="(\/[^"#?]*)/g)) {
    const [, attribute, reference] = match;
    if (attribute === "href" && reference.endsWith("/")) {
      if (!(await exists(routeToPath(reference)))) errors.push(`${relative(distRoot, path)} has a broken internal route: ${reference}`);
    } else if (!(await exists(resolve(distRoot, `.${reference}`)))) {
      errors.push(`${relative(distRoot, path)} has a broken internal ${attribute} asset link: ${reference}`);
    }
  }
}

const runtimeConfigPath = resolve(distRoot, "runtime-config.js");
if (!(await exists(runtimeConfigPath))) {
  errors.push("Missing runtime-config.js");
} else {
  const runtimeConfigText = await readFile(runtimeConfigPath, "utf8");
  const runtimeMatch = runtimeConfigText.match(/^globalThis\.__N2C_RUNTIME__ = Object\.freeze\((\{.*\})\);\s*$/);
  if (!runtimeMatch) {
    errors.push("runtime-config.js does not use the expected inert configuration assignment");
  } else {
    try {
      const runtimeConfig = JSON.parse(runtimeMatch[1]);
      if (typeof runtimeConfig.edgeNodeName !== "string" || runtimeConfig.edgeNodeName.trim() === "") errors.push("runtime-config.js contains an invalid edgeNodeName");
    } catch {
      errors.push("runtime-config.js contains invalid JSON");
    }
  }
}

const homeHtml = await readFile(routeToPath("/"), "utf8");
const latestNews = [...news.items].sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id)).slice(0, 4);
for (const title of latestNews.map((item) => escapeHtmlText(item.title))) {
  if (!homeHtml.includes(title)) errors.push(`Home page does not render required news item: ${title}`);
}
if (!homeHtml.includes('class="position-box home-position"')) errors.push("Home page is missing the boxed public software and disclosure position");
if (!homeHtml.includes("six CYberSynchrony modules")) errors.push("Home page must write the CYberSynchrony project name in full");

const newsHtml = await readFile(routeToPath("/news/"), "utf8");
if (!newsHtml.includes('class="news-timeline"')) errors.push("News register route does not render the timeline");
if (!newsHtml.includes("September-October 2025")) errors.push("News register is missing the sourced CYberSynchrony framework-results period");
if (!newsHtml.includes("CYberSynchrony releases")) errors.push("News register must write the CYberSynchrony project name in full");
for (const title of news.items.map((item) => escapeHtmlText(item.title))) {
  if (!newsHtml.includes(title)) errors.push(`News register route does not render news item: ${title}`);
}

const blogHtml = await readFile(routeToPath("/blogs/n2c-article-1/"), "utf8");
if (!blogHtml.includes('<link rel="canonical" href="https://smartclover.ro/blog/nis2compass-verifiable-cybersecurity-proof">')) {
  errors.push("SmartClover reading copy does not preserve the publisher canonical URL");
}

const toolsHtml = await readFile(routeToPath("/tools/"), "utf8");
if (!toolsHtml.includes('class="position-box" aria-label="Public software position"')) errors.push("Tool directory is missing the boxed public software position");
for (const name of ["Apache Caldera", "MISP", "Suricata", "Wazuh", "WEKA", "Snyk CLI and service"]) {
  if (!toolsHtml.includes(name)) errors.push(`Tool directory does not render ${name}`);
}
const calderaStart = toolsHtml.indexOf('id="apache-caldera"');
const calderaEnd = toolsHtml.indexOf("</article>", calderaStart);
const calderaArticle = calderaStart >= 0 && calderaEnd >= 0 ? toolsHtml.slice(calderaStart, calderaEnd) : "";
if (calderaArticle.includes("Public CYberSynchrony source")) {
  errors.push("Apache Caldera must not render a per-tool CYberSynchrony source without primary-source support");
}

const blogsHtml = await readFile(routeToPath("/blogs/"), "utf8");
for (const publisher of ["SmartClover SRL", "AI STM Learning SRL"]) {
  if (!blogsHtml.includes(publisher)) errors.push(`Blog index does not render ${publisher}`);
}

for (const route of ["/docs/cybersynchrony-alignment/", "/docs/cybersynchrony/modules/cross-core/", "/docs/cybersynchrony/modules/cyberwise/", "/docs/cybersynchrony/modules/cybergoplus/", "/docs/taxonomy/cybersynchrony-module-map/"]) {
  const html = await readFile(routeToPath(route), "utf8");
  if (!html.includes("public-position-doc") || !html.includes("<blockquote>")) errors.push(`${route} is missing its boxed public-position structure`);
}

if (errors.length > 0) {
  console.error(`Built-site validation failed with ${errors.length} error(s):`);
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Built-site validation passed: ${requiredRoutes.length} required routes, ${htmlFiles.length} HTML files, and ${textFiles.length} public text artifacts checked.`);
