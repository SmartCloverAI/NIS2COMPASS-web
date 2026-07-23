import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, extname, join, posix, relative, resolve } from "node:path";
import { marked } from "marked";

const siteRoot = process.cwd();
const repoRoot = resolve(siteRoot, "..");
const docsRoot = resolve(repoRoot, "docs");
const blogsRoot = resolve(repoRoot, "blogs");
const toolRegisterPath = resolve(docsRoot, "cybersynchrony/tool-register.json");
const publicationsPath = resolve(docsRoot, "publications.json");
const newsPath = resolve(docsRoot, "news.json");

const navGroups = [
  {
    title: "Start Here",
    items: [
      ["index", "Documentation Home"],
      ["news:index", "Project News", "/news/"],
      ["project-overview", "Project Overview"],
      ["nis2-in-plain-language", "NIS2 In Plain Language"],
      ["glossary", "Glossary"],
      ["resources:index", "Resource Directory", "/resources/"]
    ]
  },
  {
    title: "Project Progress",
    items: [
      ["progress", "Progress Overview"],
      ["progress/2026-06-month-1", "Month 1: Foundations"]
    ]
  },
  {
    title: "CYberSynchrony Modules",
    items: [
      ["cybersynchrony-alignment", "Six-Module Overview"],
      ["cybersynchrony", "CYberSynchrony Public Results"],
      ["tools:index", "Public Tool References", "/tools/"],
      ["cybersynchrony/modules/cyrescue", "CYRESCUE"],
      ["cybersynchrony/modules/cyberra", "CYBERRA"],
      ["cybersynchrony/modules/cybrite", "CYBRITE"],
      ["cybersynchrony/modules/cross-core", "CROSS-CORE"],
      ["cybersynchrony/modules/cyberwise", "CYBERWISE"],
      ["cybersynchrony/modules/cybergoplus", "CYBERGOPLUS"]
    ]
  },
  {
    title: "Blogs",
    items: [
      ["blog:index", "Blog Index", "/blogs/"],
      ["blog:n2c-article-1", "Pinned: Turning Cybersecurity Work Into Verifiable Proof", "/blogs/n2c-article-1/"]
    ]
  },
  {
    title: "Taxonomy",
    items: [
      ["taxonomy", "Taxonomy Overview"],
      ["taxonomy/nis2-control-areas", "NIS2 Control Areas"],
      ["taxonomy/evidence-types", "Evidence Types"],
      ["taxonomy/deliverable-types", "Deliverable Types"],
      ["taxonomy/confidentiality-labels", "Confidentiality Labels"],
      ["taxonomy/cybersynchrony-module-map", "CYberSynchrony Module Map"]
    ]
  },
  {
    title: "Playbooks",
    items: [
      ["playbooks", "Playbooks Overview"],
      ["playbooks/nis2-readiness-starter-guide", "NIS2 Readiness Starter Guide"],
      ["playbooks/evidence-pack-playbook", "Evidence Pack Playbook"],
      ["playbooks/monitoring-evidence-playbook", "Monitoring Evidence Playbook"],
      ["playbooks/threat-intelligence-playbook", "Threat-Intelligence Playbook"],
      ["playbooks/vulnerability-validation-safety-guide", "Validation Safety Guide"],
      ["playbooks/awareness-and-phishing-metrics-guide", "Awareness And Phishing Metrics Guide"],
      ["playbooks/public-dissemination-guide", "Public Dissemination Guide"]
    ]
  },
  {
    title: "Artifacts",
    items: [
      ["templates", "Templates Overview"],
      ["schemas", "Schemas Overview"],
      ["examples", "Synthetic Examples Overview"],
      ["examples/synthetic-evidence-pack", "Synthetic Evidence Pack"]
    ]
  }
];

const artifactLinks = [
  ["Evidence record CSV", "/artifacts/docs/templates/evidence-record-template.csv"],
  ["Evidence record schema", "/artifacts/docs/schemas/evidence-record.schema.json"],
  ["Synthetic monitoring JSONL", "/artifacts/docs/examples/synthetic-monitoring-events.jsonl"],
  ["Public tool register JSON", "/artifacts/docs/cybersynchrony/tool-register.json"],
  ["Project news register JSON", "/artifacts/docs/news.json"]
];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(path);
    }
    return path;
  }));
  return files.flat();
}

function fileToSlug(file) {
  const rel = relative(docsRoot, file).split("\\").join("/");
  const withoutExt = rel.replace(/\.md$/, "");
  if (withoutExt === "index") {
    return "index";
  }
  if (withoutExt.endsWith("/README")) {
    return withoutExt.replace(/\/README$/, "");
  }
  return withoutExt;
}

function slugToRoute(slug) {
  return slug === "index" ? "/docs/" : `/docs/${slug}/`;
}

function blogSlugToRoute(slug) {
  return `/blogs/${slug}/`;
}

function titleFromMarkdown(markdown, slug) {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }
  return basename(slug).replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return { data: {}, body: markdown };
  }

  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) {
    return { data: {}, body: markdown };
  }

  const frontmatter = markdown.slice(4, end).trim();
  const body = markdown.slice(end + 5).replace(/^\s+/, "");
  const data = {};
  for (const line of frontmatter.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*"?([^"]*)"?$/);
    if (match) {
      data[match[1]] = match[2];
    }
  }
  return { data, body };
}

function normalizeDocLink(sourceDirectory, href) {
  if (!href || href.startsWith("http") || href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }

  if (href.endsWith(".md")) {
    const normalized = posix.normalize(posix.join(sourceDirectory, href));
    const slug = normalized.replace(/\.md$/, "").replace(/\/README$/, "");
    return slug === "index" ? "/docs/" : `/docs/${slug}/`;
  }

  if (/\.(csv|json|jsonl|yaml|yml)$/i.test(href)) {
    const normalized = posix.normalize(posix.join(sourceDirectory, href));
    return `/artifacts/docs/${normalized}`;
  }

  return href;
}

function rewriteInternalLinks(html, sourceDirectory) {
  return html.replace(/href="([^"]+)"/g, (_, href) => `href="${normalizeDocLink(sourceDirectory, href)}"`);
}

function normalizeBlogLink(currentSlug, href) {
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }

  if (href.endsWith(".md")) {
    const base = dirname(currentSlug);
    const normalized = posix.normalize(posix.join(base === "." ? "" : base, href));
    const slug = normalized.replace(/\.md$/, "").replace(/\/article_1$/, "").replace(/\/index$/, "");
    return blogSlugToRoute(slug);
  }

  const base = currentSlug === "index" ? "" : currentSlug;
  const normalized = posix.normalize(posix.join(base, href));
  return `/artifacts/blogs/${normalized}`;
}

function rewriteBlogLinks(html, currentSlug) {
  return html
    .replace(/href="([^"]+)"/g, (_, href) => `href="${normalizeBlogLink(currentSlug, href)}"`)
    .replace(/src="([^"]+)"/g, (_, src) => `src="${normalizeBlogLink(currentSlug, src)}"`);
}

export async function getDocs() {
  const files = (await walk(docsRoot)).filter((file) => extname(file) === ".md");
  const docs = await Promise.all(files.map(async (file) => {
    const slug = fileToSlug(file);
    const sourceDirectory = relative(docsRoot, dirname(file)).split("\\").join("/").replace(/^\.$/, "");
    const markdown = await readFile(file, "utf8");
    const rawHtml = await marked.parse(markdown, { gfm: true });
    return {
      slug,
      route: slugToRoute(slug),
      title: titleFromMarkdown(markdown, slug),
      html: rewriteInternalLinks(rawHtml, sourceDirectory)
    };
  }));

  return docs.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getDocBySlug(slug) {
  const docs = await getDocs();
  return docs.find((doc) => doc.slug === slug);
}

export function getDocsNav() {
  return navGroups;
}

export function getArtifactLinks() {
  return artifactLinks;
}

export async function getToolRegister() {
  return readJson(toolRegisterPath);
}

export async function getPublications() {
  const index = await readJson(publicationsPath);
  return [...index.publications].sort((a, b) => a.featured_order - b.featured_order || b.date.localeCompare(a.date));
}

export async function getNews() {
  const register = await readJson(newsPath);
  return {
    ...register,
    items: [...register.items].sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
  };
}

export async function getBlogs() {
  const publications = await getPublications();
  const localPublications = publications.filter((publication) => publication.kind === "local-article");
  const blogs = await Promise.all(localPublications.map(async (metadata) => {
    const file = resolve(repoRoot, metadata.source_file);
    const slug = metadata.slug;
    const markdown = await readFile(file, "utf8");
    const { body } = parseFrontmatter(markdown);
    const rawHtml = await marked.parse(body, { gfm: true });
    return {
      slug,
      route: blogSlugToRoute(slug),
      title: metadata.title,
      subtitle: metadata.summary,
      date: metadata.date,
      author: metadata.publisher,
      partner: metadata.partner,
      heroImage: metadata.image || "",
      html: rewriteBlogLinks(rawHtml, slug),
      canonicalUrl: metadata.canonical_url,
      pinned: metadata.featured_order === 1
    };
  }));

  return blogs.sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function getBlogBySlug(slug) {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.slug === slug);
}
