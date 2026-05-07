# NIS2COMPASS Astro Site

This directory contains the initial public website for NIS2COMPASS. It mirrors the public dissemination repository by presenting the project overview, CYberSynchrony alignment, public taxonomy, playbooks, templates, schemas, synthetic examples, and deployment notes.

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
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Node.js | `22.x` |

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
```

`npm run start` serves the static build from `dist/` with `sirv-cli` on `0.0.0.0:${PORT:-8080}`.

The `predev` and `prebuild` scripts copy `../docs` into `site/public/artifacts/docs` so the deployed website mirrors the public documentation tree and exposes raw templates/schemas under `/artifacts/docs/`.

## Ratio1 Worker App Runner Notes

Use the full repository clone as the source and `site/` as the working directory. This matters because the build renders Markdown from the root `docs/` folder into the website.

Recommended R1 WAR command sequence:

```bash
cd site
npm ci
npm run build
npm run start
```

The app is intentionally static and small. It should not require a database, persistent storage, background jobs, secrets, Dockerfile, image registry, or pre-built image for the initial release.

See [`../ratio1/worker-app-runner.md`](../ratio1/worker-app-runner.md) and [`../ratio1/deployment.example.yaml`](../ratio1/deployment.example.yaml).
