# NIS2COMPASS Astro Site

This directory contains the public website for NIS2COMPASS. It mirrors the dissemination repository by presenting the project overview, all six CYberSynchrony modules, public CYberSynchrony results, sourced tool references, sanitized progress notes, partner articles, public taxonomy, playbooks, templates, schemas, and synthetic examples.

The website logo and browser icon use [`public/logo.svg`](public/logo.svg), based on the operator-approved Compass Trust Mark.

## Runtime Baseline

| Item | Value |
| --- | --- |
| Deployment mode | Run from repository clone |
| Project Dockerfile | Not required and intentionally not used |
| R1 WAR base runtime image | Node.js 22 Alpine or equivalent Node.js 22 runtime |
| CPU | `0.5` vCPU |
| Memory | `512 MB` RAM |
| Disk | `1 GB` minimum, `2 GB` recommended for install/build cache |
| Port | `8080`, or platform-provided `PORT` |
| Single run command from repository root | `./start-website.sh` |
| Separate build command, only if the runner requires one | `./start-website.sh build` |
| Candidate verification | `./start-website.sh check` |
| Public-release gate | `./start-website.sh release-check` |
| Node.js | `22.x` |

## Commands

```bash
./start-website.sh
```

Run this command from the repository root. With no argument, `./start-website.sh` installs dependencies, builds `site/dist/`, and serves the static build with `sirv-cli` on `0.0.0.0:${PORT:-8080}`.

The `predev` and `prebuild` scripts first validate the public content, then copy `../docs` and `../blogs` into public artifact paths so the deployed website mirrors approved public source material. Reader navigation uses rendered routes rather than raw Markdown links.

Before serving, the launcher generates `dist/runtime-config.js`. It uses `EE_HOST_ID` from Ratio1 WAR/CAR, accepts `EDGE_NODE_NAME` as a manual fallback, and otherwise sets the visible footer text to `Served by edge node local`. The value is inserted with JSON serialization and rendered as text.

`./start-website.sh check` performs source validation, builds the static site, and automatically checks generated routes, downloadable text artifacts, internal links, canonical metadata, publication-state indexing metadata, and forbidden private paths. The private consortium release process adds a confidential deny-list scan without embedding protected names in this public repository. `./start-website.sh release-check` is a separate hard gate for the approved funding visibility package, approval references, and public release state.

## Ratio1 Worker App Runner Notes

Use the full repository clone as the source and the repository root as the working directory. This matters because the build renders Markdown from the root `docs/` folder into the website.

Recommended R1 WAR command sequence:

```bash
./start-website.sh
```

For Cloudflare Pages or Cloudflare Workers Static Assets, use `./start-website.sh build` as the build command and `site/dist` as the static output/assets directory. Cloudflare should not run `./start-website.sh start` because it serves static assets directly after deployment.

The app is intentionally static and small. It should not require a database, persistent storage, background jobs, secrets, Dockerfile, image registry, or pre-built image for the initial release.

## Publication Configuration

`src/config/publication.json` controls the visible semantic site version, update date, preview indexing, and funding visibility package. Increment `site_version` and `last_updated` with every reviewed site update. Review candidates use `-preview.N`; an approved publication drops the preview suffix. The normal build rejects malformed version metadata, a preview with indexing enabled, and a published state unless the complete release gate passes. Do not change `release_state` to `published` or disable `noindex` until the applicable signed Article 10 instruction or later written CYberSynchrony direction, review completion, automated checks, public-safe approval references, and explicit operator release approval are all recorded.

See [`../ratio1/worker-app-runner.md`](../ratio1/worker-app-runner.md) and [`../ratio1/deployment.example.yaml`](../ratio1/deployment.example.yaml).
