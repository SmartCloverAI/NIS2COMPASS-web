import { access, readFile, readdir } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getPublicationConfigErrors } from "./lib/release-policy.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const repoRoot = resolve(siteRoot, "..");
const docsRoot = resolve(repoRoot, "docs");
const blogsRoot = resolve(repoRoot, "blogs");
const expectedModuleIds = ["cross-core", "cybergoplus", "cyberra", "cyberwise", "cybrite", "cyrescue"];
const expectedOpenSourceToolIds = ["apache-caldera", "misp", "suricata", "wazuh", "weka"];
const expectedNewsIds = ["aistm-article-1", "cybersynchrony-module-results-published", "n2c-project-launch", "smartclover-article-1"];
const sourceTextExtensions = new Set([".astro", ".css", ".csv", ".js", ".json", ".jsonl", ".md", ".mjs", ".sh", ".svg", ".txt", ".xml", ".yaml", ".yml"]);
const errors = [];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

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

function sorted(values) {
  return [...values].sort();
}

function sameValues(left, right) {
  return JSON.stringify(sorted(left)) === JSON.stringify(sorted(right));
}

function requireString(record, field, context) {
  if (typeof record[field] !== "string" || record[field].trim() === "") {
    errors.push(`${context}: missing ${field}`);
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const register = await readJson(resolve(docsRoot, "cybersynchrony/tool-register.json"));
const publications = await readJson(resolve(docsRoot, "publications.json"));
const news = await readJson(resolve(docsRoot, "news.json"));
const publicationConfig = await readJson(resolve(siteRoot, "src/config/publication.json"));
const packageMetadata = await readJson(resolve(siteRoot, "package.json"));
const moduleIds = register.modules.map((module) => module.id);

if (!sameValues(moduleIds, expectedModuleIds)) {
  errors.push(`Tool register must contain exactly the six CYberSynchrony modules; found ${sorted(moduleIds).join(", ")}`);
}

if (new Set(moduleIds).size !== moduleIds.length) {
  errors.push("Tool register contains duplicate module IDs");
}

const toolsById = new Map(register.tools.map((tool) => [tool.id, tool]));
const openSourceToolIds = register.tools.filter((tool) => tool.category === "open-source-upstream").map((tool) => tool.id);
if (!sameValues(openSourceToolIds, expectedOpenSourceToolIds)) {
  errors.push(`Open-source tool set must be ${expectedOpenSourceToolIds.join(", ")}; found ${sorted(openSourceToolIds).join(", ")}`);
}

for (const module of register.modules) {
  for (const field of ["name", "plain_role", "docs_slug"]) {
    requireString(module, field, `Module ${module.id}`);
  }
  if (!Array.isArray(module.official_sources) || module.official_sources.length === 0) {
    errors.push(`Module ${module.id}: at least one official source is required`);
  }
  const docPath = resolve(docsRoot, `${module.docs_slug}.md`);
  if (!(await exists(docPath))) {
    errors.push(`Module ${module.id}: missing documentation file ${module.docs_slug}.md`);
    continue;
  }
  const markdown = await readFile(docPath, "utf8");
  const markers = [...markdown.matchAll(/<!--\s*tool-ref:([a-z0-9-]+)\s*-->/g)].map((match) => match[1]);
  if (!sameValues(markers, module.public_tool_ids)) {
    errors.push(`Module ${module.id}: Markdown tool markers do not match the register`);
  }
  for (const toolId of module.public_tool_ids) {
    const tool = toolsById.get(toolId);
    if (!tool || !tool.module_ids.includes(module.id)) {
      errors.push(`Module ${module.id}: tool relationship is not reciprocal for ${toolId}`);
    }
  }
}

for (const tool of register.tools) {
  for (const field of ["name", "category", "purpose", "relationship", "homepage", "source_repository", "documentation", "license_id", "license_source", "last_verified"]) {
    requireString(tool, field, `Tool ${tool.id}`);
  }
  for (const moduleId of tool.module_ids) {
    if (!moduleIds.includes(moduleId)) {
      errors.push(`Tool ${tool.id}: unknown module ${moduleId}`);
    }
  }
  if (tool.relationship.startsWith("Named in") && !tool.cybersynchrony_public_source) {
    errors.push(`Tool ${tool.id}: a public CYberSynchrony source is required for the claimed CYberSynchrony relationship`);
  }
}

const caldera = toolsById.get("apache-caldera");
if (!caldera?.relationship.includes("Independent upstream") || !caldera.relationship.includes("not presented as a CYberSynchrony-supplied component")) {
  errors.push("Apache Caldera must remain explicitly labelled as an independent upstream reference, not a CYberSynchrony component");
}
if (caldera?.cybersynchrony_public_source) {
  errors.push("Apache Caldera must not carry a per-tool CYberSynchrony source unless a primary CYberSynchrony source explicitly names it");
}

const snyk = toolsById.get("snyk-cli");
if (snyk?.category !== "commercial-account-backed" || snyk.module_ids.length !== 0) {
  errors.push("Snyk must remain account-backed and unassigned to a CYberSynchrony module unless a cleared source changes that fact");
}

const alignmentMarkdown = await readFile(resolve(docsRoot, "cybersynchrony-alignment.md"), "utf8");
const toolSectionStart = alignmentMarkdown.indexOf("## Public Tool References");
const toolSectionEnd = alignmentMarkdown.indexOf("\n## ", toolSectionStart + 4);
const toolSection = toolSectionStart >= 0 ? alignmentMarkdown.slice(toolSectionStart, toolSectionEnd >= 0 ? toolSectionEnd : undefined) : "";
if (!toolSection) {
  errors.push("Six-module alignment page is missing its public tool reference section");
} else {
  const assignedTools = register.tools.filter((tool) => tool.module_ids.length > 0);
  for (const module of register.modules) {
    const rowPattern = new RegExp(`^\\|\\s*${escapeRegex(module.name)}\\s*\\|([^\\n]+)\\|$`, "m");
    const row = toolSection.match(rowPattern);
    if (!row) {
      errors.push(`Six-module alignment page is missing the ${module.name} tool row`);
      continue;
    }
    for (const tool of assignedTools) {
      const shouldAppear = module.public_tool_ids.includes(tool.id);
      const doesAppear = row[1].includes(tool.name);
      if (shouldAppear !== doesAppear) {
        errors.push(`Six-module alignment page tool row for ${module.name} has drifted from the register for ${tool.name}`);
      }
    }
  }
}

if (!Array.isArray(publications.publications) || publications.publications.length !== 2) {
  errors.push("Publication index must contain the two approved partner articles");
} else {
  const kinds = sorted(publications.publications.map((publication) => publication.kind));
  if (!sameValues(kinds, ["external-article", "local-article"])) {
    errors.push("Publication index must contain one local reading copy and one external partner article");
  }
  const ids = publications.publications.map((publication) => publication.id);
  const featuredOrders = publications.publications.map((publication) => publication.featured_order);
  if (new Set(ids).size !== ids.length) errors.push("Publication IDs must be unique");
  if (featuredOrders.some((order) => !Number.isInteger(order)) || new Set(featuredOrders).size !== featuredOrders.length || featuredOrders.filter((order) => order === 1).length !== 1) {
    errors.push("Publication featured_order values must be unique integers with exactly one pinned value of 1");
  }
  for (const publication of publications.publications) {
    for (const field of ["id", "kind", "title", "date", "publisher", "partner", "summary", "canonical_url"]) {
      requireString(publication, field, `Publication ${publication.id || "unknown"}`);
    }
    if (!publication.canonical_url.startsWith("https://")) {
      errors.push(`Publication ${publication.id}: canonical URL must use HTTPS`);
    }
    if (publication.kind === "local-article") {
      for (const field of ["slug", "local_route", "image", "source_file"]) requireString(publication, field, `Publication ${publication.id}`);
      const sourcePath = resolve(repoRoot, publication.source_file || "");
      if (!sourcePath.startsWith(`${blogsRoot}/`) || !(await exists(sourcePath))) {
        errors.push(`Publication ${publication.id}: local Markdown source_file must resolve under blogs/`);
      }
    }
  }
}

if (!Array.isArray(news.items)) {
  errors.push("News register items must be an array");
} else {
  const newsIds = news.items.map((item) => item.id);
  const missingNewsIds = expectedNewsIds.filter((id) => !newsIds.includes(id));
  if (missingNewsIds.length > 0) errors.push(`News register is missing required entries: ${missingNewsIds.join(", ")}`);
  if (new Set(newsIds).size !== newsIds.length) errors.push("News register IDs must be unique");
  const sourceOrder = news.items.map((item) => item.date);
  const expectedOrder = [...sourceOrder].sort((a, b) => b.localeCompare(a));
  if (JSON.stringify(sourceOrder) !== JSON.stringify(expectedOrder)) errors.push("News register must be stored in reverse chronological order");

  const publicationsById = new Map(publications.publications.map((publication) => [publication.id, publication]));
  for (const item of news.items) {
    for (const field of ["id", "date", "date_label", "category", "title", "summary", "href", "source_label", "source_url"]) {
      requireString(item, field, `News item ${item.id || "unknown"}`);
    }
    if (!/^\d{4}-\d{2}(?:-\d{2})?$/.test(item.date)) errors.push(`News item ${item.id}: date must use YYYY-MM or YYYY-MM-DD`);
    if (!item.href.startsWith("/") && !item.href.startsWith("https://")) errors.push(`News item ${item.id}: href must be a root-relative route or HTTPS URL`);
    if (!item.source_url.startsWith("https://")) errors.push(`News item ${item.id}: source_url must use HTTPS`);
    if (item.publication_id) {
      const publication = publicationsById.get(item.publication_id);
      if (!publication) {
        errors.push(`News item ${item.id}: unknown publication_id ${item.publication_id}`);
      } else {
        const expectedHref = publication.kind === "local-article" ? publication.local_route : publication.canonical_url;
        if (item.date !== publication.date) errors.push(`News item ${item.id}: date does not match publication ${item.publication_id}`);
        if (item.href !== expectedHref) errors.push(`News item ${item.id}: href does not match publication ${item.publication_id}`);
        if (item.source_url !== publication.canonical_url) errors.push(`News item ${item.id}: source_url does not match publication ${item.publication_id}`);
      }
    }
  }
  const launchItem = news.items.find((item) => item.id === "n2c-project-launch");
  if (launchItem?.date !== "2026-06-01") errors.push("Project-launch news item must preserve the sourced 1 June 2026 start date");
  if (/\bpilot\b/i.test(launchItem?.summary || "")) errors.push("Public project-launch summary must not introduce pilot activity absent from the public Month 1 note");
}

for (const field of ["schema_version", "content_version", "last_verified"]) requireString(news, field, "News register");
const packageVersion = publicationConfig.site_version?.replace(/-preview\.\d+$/, "");
if (packageVersion !== packageMetadata.version) {
  errors.push(`Site version ${publicationConfig.site_version} must match package version ${packageMetadata.version} before any preview suffix`);
}

errors.push(...await getPublicationConfigErrors(siteRoot, publicationConfig));

for (const [label, publicRegister] of [["Tool register", register], ["Publication register", publications], ["News register", news]]) {
  requireString(publicRegister, "content_version", label);
  const hasPreviewVersion = /-preview\.\d+$/.test(publicRegister.content_version || "");
  if (publicationConfig.release_state === "published" && hasPreviewVersion) errors.push(`${label} content_version must not retain a preview suffix in published state`);
}
requireString(register, "release_state", "Tool register");
if (publicationConfig.release_state === "published" && register.release_state !== "published") {
  errors.push(`Tool register release_state ${register.release_state} must match site release_state ${publicationConfig.release_state}`);
}

const scanDirectories = [resolve(repoRoot, "docs"), resolve(repoRoot, "blogs"), resolve(repoRoot, "ratio1"), resolve(siteRoot, "src"), resolve(siteRoot, "scripts")];
const scanRootFiles = ["ACKNOWLEDGEMENTS.md", "CONTRIBUTING.md", "PUBLICATION_POLICY.md", "README.md", "SECURITY.md", "start-website.sh", "site/README.md", "site/astro.config.mjs", "site/package.json"].map((path) => resolve(repoRoot, path));
const scannedScriptExclusions = new Set(["validate-built-site.mjs", "validate-public-content.mjs"]);
const scanFiles = [...new Set([...(await Promise.all(scanDirectories.map(walk))).flat(), ...scanRootFiles])].filter((path) => sourceTextExtensions.has(extname(path)) && !(dirname(path) === resolve(siteRoot, "scripts") && scannedScriptExclusions.has(basename(path))));
const forbidden = [
  ["private report path", /N2C-reports/gi],
  ["private internal path", /(?:^|[^A-Za-z0-9_-])internal\//gim],
  ["wrapper milestone path", /progress\/M\d/gi],
  ["internal-only CYberSynchrony abbreviation", new RegExp("\\b" + ["C", "Y", "S"].join("") + "\\b", "gi")]
];
const dangerousMarkup = [/<script\b/i, /javascript\s*:/i, /<[^>]*[\/\s]on[a-z]+\s*=/i, /<(?:embed|iframe|object)\b/i];

for (const path of scanFiles) {
  const content = await readFile(path, "utf8");
  for (const [label, pattern] of forbidden) {
    if (pattern.test(content)) errors.push(`${relative(repoRoot, path)}: contains forbidden ${label}`);
    pattern.lastIndex = 0;
  }
  if (extname(path) === ".md" && dangerousMarkup.some((pattern) => pattern.test(content))) {
    errors.push(`${relative(repoRoot, path)}: contains active raw HTML that is not allowed in public Markdown`);
  }
}

if (errors.length > 0) {
  console.error(`Public content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Public content validation passed: 6 modules, ${openSourceToolIds.length} open-source references, ${publications.publications.length} partner articles, ${news.items.length} news items, version ${publicationConfig.site_version}, and ${scanFiles.length} public source files scanned.`);
