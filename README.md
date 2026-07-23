# NIS2COMPASS

<img src="site/public/logo.svg" width="72" height="72" alt="NIS2COMPASS logo">

NIS2COMPASS is the public dissemination repository for an 8-month NIS2 readiness, evidence, and cybersecurity improvement project funded by the CYberSynchrony consortium through the Financial Support to Third Parties open-call instrument.

This repository contains public-safe documentation, reusable templates, synthetic examples, partner articles, a six-module CYberSynchrony learning centre, a sourced tool directory, sanitized progress notes, and the source for the project website.

## Attribution

Content development: SmartClover SRL.

Copyright: AI STM Learning SRL and SmartClover SRL, as the NIS2COMPASS consortium partners.

## Public Website

Project logo: [`site/public/logo.svg`](site/public/logo.svg). The same SVG is used by the website header and browser icon.

Preferred public hub:

- Primary: `www.nis2compass.eu`
- Recommended redirect: `nis2compass.eu` to `www.nis2compass.eu` once apex DNS is configured
- Optional defensive redirect: `nis2compass.com`
- Optional short-link redirect only: `nis2compass.link`

The website source lives in [`site/`](site/). The initial site is an Astro static application designed to run from the repository clone through Ratio1 Worker App Runner, without a project Dockerfile or a pre-built image.

## Ratio1 Worker App Runner Baseline

Recommended minimal runtime for the initial documentation site:

| Item | Value |
| --- | --- |
| Deployment mode | Clone this Git repository and run commands from the repository root |
| Project Dockerfile | Not required and intentionally not used |
| R1 WAR base runtime image | Node.js 22 Alpine or equivalent Node.js 22 runtime |
| Single run command | `./start-website.sh` |
| Separate build command, only if the runner requires one | `./start-website.sh build` |
| Candidate verification | `./start-website.sh check` |
| Public-release gate | `./start-website.sh release-check` |
| Port | `8080`, or the platform-provided `PORT` variable |
| CPU | `0.5` vCPU |
| Memory | `512 MB` RAM |
| Disk | `1 GB` minimum writable workspace, `2 GB` recommended for install/build cache |
| Network | Outbound network required only during dependency install/build |
| Node.js | `22.x` |
| npm | `11.x` tested locally |

The app is intentionally static and small. Astro is used at build time, and `sirv-cli` serves the generated `dist/` folder at runtime. The first deployment should not need a database, background worker, queue, secret store, persistent volume, Dockerfile, image registry, or pre-built container image.

## Root Commands

Use this command from the repository root. It intentionally avoids `cd site` so a deployment runner can clone the repo and execute one clear command.

```bash
./start-website.sh
```

With no argument, `./start-website.sh` installs dependencies with `npm ci`, builds the static site into `site/dist`, and serves it on `0.0.0.0:${PORT:-8080}`. To override the port, run `PORT=8090 ./start-website.sh`.

The footer displays the site version and runtime edge-node identity. Ratio1 WAR/CAR deployments should expose the node identifier as `EE_HOST_ID`, which is the same environment key used by other SmartClover web applications. The launcher writes that value to the generated `site/dist/runtime-config.js` before serving. With no `EE_HOST_ID`, the footer reads `Served by edge node local`. `EDGE_NODE_NAME` is available as a manual fallback for other static hosts.

Useful explicit commands for operators:

```bash
./start-website.sh build
./start-website.sh check
./start-website.sh release-check
./start-website.sh start
./start-website.sh dev
```

Use `./start-website.sh build` when a platform has a separate build phase. Use `./start-website.sh check` to build and verify the candidate. Use `./start-website.sh release-check` only when preparing an approved public release; it intentionally fails while the site remains a no-index review candidate. Use `./start-website.sh start` only when `site/dist` already exists and you want to serve it without forcing a rebuild; the existing output is revalidated before it is served.

## Website Versioning

The public version is controlled by `site/src/config/publication.json` and shown in the footer on every page. Increment `site_version` for every reviewed website update, including content-only updates. Use semantic versioning: increase the patch number for corrections or small additions, the minor number for new public sections or behavior, and the major number for incompatible structural changes. Review candidates retain a `-preview.N` suffix; approved public releases use the corresponding version without that suffix. Keep `last_updated` synchronized with the version change.

## Cloudflare Static Hosting

For Cloudflare Pages or Cloudflare Workers Static Assets, do not use a Node start command. Use the repository root as the project root, set the build command to `./start-website.sh build`, set the build output directory or assets directory to `site/dist`, and set Node.js to `22.x`. Set `EDGE_NODE_NAME=cloudflare` in the build environment if the static deployment should identify its hosting network; request-specific Cloudflare locations are not available to prebuilt static HTML.

## Repository Map

```text
docs/
  Public project documentation, CYberSynchrony module pages, news/tool/publication registers, progress notes, taxonomy, playbooks, templates, schemas, and synthetic examples.

blogs/
  Approved public article reading copies and their images. Publisher canonical links are defined in docs/publications.json.

site/
  Astro website source for www.nis2compass.eu or the selected public domain.

ratio1/
  Worker App Runner deployment notes and an example repo-clone deployment descriptor.
```

## What Is Public Here

This repository may contain:

- Plain-language project explanations.
- NIS2 readiness learning material.
- CYberSynchrony alignment notes.
- Plain-language pages for all six CYberSynchrony modules and links to public CYberSynchrony results.
- Public-source references to independently available tools, including source and licence links.
- Sanitized project progress notes.
- Public partner articles with publisher attribution and canonical links.
- Public-safe playbooks.
- Empty reusable templates.
- JSON Schemas for public-safe evidence examples.
- Synthetic examples with fake data.
- Website source and deployment notes.

## What Must Not Be Published Here

This repository must not contain:

- Pilot architecture.
- Raw logs.
- Raw alerts.
- Real vulnerabilities or exploit details.
- Credentials, secrets, tokens, private endpoints, or customer data.
- Personal data.
- Payment records, support letters, signed annexes, or contract material.
- Internal-only proposal or funder communication unless explicitly cleared for publication.

See [`PUBLICATION_POLICY.md`](PUBLICATION_POLICY.md) before publishing new material.

## Review Candidate Status

The website remains a no-index review candidate until the CYberSynchrony Coordinator provides written direction that confirms the authorized funding-programme wording, required disclaimer, European Union emblem, and CYberSynchrony logo treatment. The site displays this state visibly, and `./start-website.sh release-check` remains closed until the approved values, assets, public-safe direction reference, and operator approval reference are configured.

## Local Site Commands

```bash
./start-website.sh
```

The local preview server listens on `0.0.0.0:8080` by default.

## License

Apache License 2.0. See [`LICENSE`](LICENSE).
