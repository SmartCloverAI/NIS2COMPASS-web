import { realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

const article10FundingSentence = "NIS2COMPASS has received funding from the European Union’s Horizon Europe research and innovation programme through the CYberSynchrony Open Call issued and executed under the CYberSynchrony project (Grant Agreement no. 101158555).";
const approvedDisclaimer = "This material reflects only the author’s views. The European Commission and the CYberSynchrony Consortium are not liable for any use that may be made of the information contained in it.";

function isStrictlyInside(root, path) {
  const relativePath = relative(root, path);
  return relativePath !== "" && relativePath !== ".." && !relativePath.startsWith(`..${sep}`) && !isAbsolute(relativePath);
}

function getVersionMetadataErrors(config) {
  const errors = [];
  const versionPattern = /^\d+\.\d+\.\d+(?:-preview\.\d+)?$/;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof config.site_version !== "string" || !versionPattern.test(config.site_version)) {
    errors.push("site_version must use semantic versioning, optionally followed by -preview.N");
  }
  const [year, month, day] = typeof config.last_updated === "string" && datePattern.test(config.last_updated) ? config.last_updated.split("-").map(Number) : [];
  const parsedDate = year && month && day ? new Date(Date.UTC(year, month - 1, day)) : null;
  const isExactDate = parsedDate && parsedDate.getUTCFullYear() === year && parsedDate.getUTCMonth() === month - 1 && parsedDate.getUTCDate() === day;
  if (!isExactDate) {
    errors.push("last_updated must be a valid ISO calendar date");
  }
  if (config.release_state === "preview" && typeof config.site_version === "string" && !/-preview\.\d+$/.test(config.site_version)) {
    errors.push("Preview publication state requires a -preview.N site_version");
  }
  if (config.release_state === "published" && typeof config.site_version === "string" && config.site_version.includes("-preview.")) {
    errors.push("Published site_version must not retain a preview suffix");
  }
  return errors;
}

export async function getReleaseErrors(siteRoot, config) {
  const errors = getVersionMetadataErrors(config);
  if (config.release_state !== "published") errors.push("release_state must be published");
  if (config.noindex !== false) errors.push("noindex must be false");
  if (config.funding_status !== "approved") errors.push("funding_status must be approved under the applicable contractual or later written visibility direction");
  for (const field of ["funding_sentence", "disclaimer", "eu_emblem", "cybersynchrony_logo", "funding_direction_reference", "operator_release_approval_reference"]) {
    if (typeof config[field] !== "string" || config[field].trim() === "") errors.push(`${field} is required`);
  }
  if (config.funding_sentence !== article10FundingSentence) errors.push("funding_sentence must exactly match the approved Article 10 text");
  if (config.disclaimer !== approvedDisclaimer) errors.push("disclaimer must exactly match the approved public wording");
  const publicRoot = resolve(siteRoot, "public");
  for (const field of ["eu_emblem", "cybersynchrony_logo"]) {
    if (!config[field]) continue;
    const path = resolve(publicRoot, config[field].replace(/^\/+/, ""));
    if (!isStrictlyInside(publicRoot, path)) {
      errors.push(`${field} does not resolve to a file under site/public`);
      continue;
    }
    try {
      const [realPublicRoot, realAssetPath, assetStats] = await Promise.all([realpath(publicRoot), realpath(path), stat(path)]);
      if (!isStrictlyInside(realPublicRoot, realAssetPath) || !assetStats.isFile()) {
        errors.push(`${field} does not resolve to a file under site/public`);
      }
    } catch {
      errors.push(`${field} does not resolve to a file under site/public`);
    }
  }
  return errors;
}

export async function getPublicationConfigErrors(siteRoot, config) {
  const metadataErrors = getVersionMetadataErrors(config);
  if (config.release_state === "preview") {
    return config.noindex === true ? metadataErrors : [...metadataErrors, "Preview publication state requires noindex: true"];
  }
  if (config.release_state === "published") {
    return (await getReleaseErrors(siteRoot, config)).map((error) => `Published configuration: ${error}`);
  }
  return [...metadataErrors, `Unsupported publication release_state: ${config.release_state}`];
}
