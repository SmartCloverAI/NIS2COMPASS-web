import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, extname, join, posix, relative, resolve } from "node:path";
import { marked } from "marked";

const siteRoot = process.cwd();
const repoRoot = resolve(siteRoot, "..");
const docsRoot = resolve(repoRoot, "docs");
const blogsRoot = resolve(repoRoot, "blogs");

const navGroups = [
  {
    title: "Start Here",
    items: [
      ["index", "Documentation Home"],
      ["project-overview", "Project Overview"],
      ["nis2-in-plain-language", "NIS2 In Plain Language"],
      ["cybersynchrony-alignment", "CYberSynchrony Alignment"],
      ["glossary", "Glossary"]
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
  ["Synthetic monitoring JSONL", "/artifacts/docs/examples/synthetic-monitoring-events.jsonl"]
];

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

function normalizeDocLink(currentSlug, href) {
  if (!href || href.startsWith("http") || href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }

  if (href.endsWith(".md")) {
    const base = currentSlug === "index" ? "" : dirname(currentSlug);
    const normalized = posix.normalize(posix.join(base === "." ? "" : base, href));
    const slug = normalized.replace(/\.md$/, "").replace(/\/README$/, "");
    return slug === "index" ? "/docs/" : `/docs/${slug}/`;
  }

  if (/\.(csv|json|jsonl|yaml|yml)$/i.test(href)) {
    const base = currentSlug === "index" ? "" : dirname(currentSlug);
    const normalized = posix.normalize(posix.join(base === "." ? "" : base, href));
    return `/artifacts/docs/${normalized}`;
  }

  return href;
}

function rewriteInternalLinks(html, currentSlug) {
  return html.replace(/href="([^"]+)"/g, (_, href) => `href="${normalizeDocLink(currentSlug, href)}"`);
}

function blogFileToSlug(file) {
  const rel = relative(blogsRoot, file).split("\\").join("/");
  const withoutExt = rel.replace(/\.md$/, "");
  if (withoutExt.endsWith("/article_1")) {
    return dirname(withoutExt).split("\\").join("/");
  }
  if (withoutExt.endsWith("/index")) {
    return withoutExt.replace(/\/index$/, "");
  }
  return withoutExt;
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
    const markdown = await readFile(file, "utf8");
    const rawHtml = await marked.parse(markdown, { gfm: true });
    return {
      slug,
      route: slugToRoute(slug),
      title: titleFromMarkdown(markdown, slug),
      html: rewriteInternalLinks(rawHtml, slug),
      sourcePath: relative(repoRoot, file).split("\\").join("/")
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

export async function getBlogs() {
  const files = (await walk(blogsRoot)).filter((file) => extname(file) === ".md");
  const blogs = await Promise.all(files.map(async (file) => {
    const slug = blogFileToSlug(file);
    const markdown = await readFile(file, "utf8");
    const { data, body } = parseFrontmatter(markdown);
    const rawHtml = await marked.parse(body, { gfm: true });
    return {
      slug,
      route: blogSlugToRoute(slug),
      title: data.title || titleFromMarkdown(body, slug),
      subtitle: data.subtitle || "",
      date: data.date || "",
      author: data.author || "",
      partner: data.partner || "",
      heroImage: data.hero_image ? `/artifacts/blogs/${slug}/${data.hero_image}` : "",
      html: rewriteBlogLinks(rawHtml, slug),
      sourcePath: relative(repoRoot, file).split("\\").join("/"),
      canonicalSource: `N2C-reports/blog-articles/${slug}/article_1.md`,
      pinned: slug === "n2c-article-1"
    };
  }));

  return blogs.sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function getBlogBySlug(slug) {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.slug === slug);
}
