# NIS2COMPASS

NIS2COMPASS is the public dissemination repository for an 8-month NIS2 readiness, evidence, and cybersecurity improvement project funded by the CYberSynchrony consortium through the Financial Support to Third Parties open-call instrument.

This repository contains public-safe documentation, reusable templates, synthetic examples, and the source for the project website.

## Attribution

Content development: SmartClover SRL.

Copyright: AI STM Learning SRL and SmartClover SRL, as the NIS2COMPASS consortium partners.

## Public Website

Preferred domain:

- Primary: `nis2compass.org`
- Recommended redirect: `nis2compass.eu`, if available and eligible
- Optional defensive redirect: `nis2compass.com`
- Optional short-link redirect only: `nis2compass.link`

The website source lives in [`site/`](site/). The initial site is an Astro static application designed to run from the repository clone through Ratio1 Worker App Runner, without a project Dockerfile or a pre-built image.

## Ratio1 Worker App Runner Baseline

Recommended minimal runtime for the initial documentation site:

| Item | Value |
| --- | --- |
| Deployment mode | Clone this Git repository and run commands from `site/` |
| Project Dockerfile | Not required and intentionally not used |
| R1 WAR base runtime image | Node.js 22 Alpine or equivalent Node.js 22 runtime |
| Build command | `cd site && npm ci && npm run build` |
| Start command | `cd site && npm run start` |
| Port | `8080`, or the platform-provided `PORT` variable |
| CPU | `0.5` vCPU |
| Memory | `512 MB` RAM |
| Disk | `1 GB` minimum writable workspace, `2 GB` recommended for install/build cache |
| Network | Outbound network required only during dependency install/build |
| Node.js | `22.x` |
| npm | `11.x` tested locally |

The app is intentionally static and small. Astro is used at build time, and `sirv-cli` serves the generated `dist/` folder at runtime. The first deployment should not need a database, background worker, queue, secret store, persistent volume, Dockerfile, image registry, or pre-built container image.

## Repository Map

```text
docs/
  Public project documentation, taxonomy, playbooks, templates, schemas, and synthetic examples.

site/
  Astro website source for nis2compass.org or the selected public domain.

ratio1/
  Worker App Runner deployment notes and an example repo-clone deployment descriptor.
```

## What Is Public Here

This repository may contain:

- Plain-language project explanations.
- NIS2 readiness learning material.
- CYberSynchrony alignment notes.
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

## Local Site Commands

```bash
cd site
npm install
npm run dev
npm run build
npm run start
```

The local preview server listens on `0.0.0.0:8080` by default.

## License

Apache License 2.0. See [`LICENSE`](LICENSE).
