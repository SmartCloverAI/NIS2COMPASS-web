# Ratio1 Worker App Runner Notes

The initial NIS2COMPASS site is a static Astro application in `site/`.

Ratio1 Worker App Runner is the preferred deployment path because it can clone a Git repository, run build commands, and start the app without requiring this repository to provide a Dockerfile or a pre-built container image.

## Runtime Baseline

| Item | Value |
| --- | --- |
| Deployment mode | Full Git repository clone |
| Working directory | `site/` |
| Project Dockerfile | Not required and intentionally not used |
| R1 WAR base runtime image | Node.js 22 Alpine or equivalent Node.js 22 runtime |
| CPU | `0.5` vCPU |
| Memory | `512 MB` RAM |
| Disk | `1 GB` minimum, `2 GB` recommended for dependency install and build cache |
| Port | `8080`, or platform-provided `PORT` |
| Build command | `npm ci && npm run build` from `site/` |
| Start command | `npm run start` from `site/` |

## Notes

- The application is static after build.
- The build copies `docs/` into `site/public/artifacts/docs/` so the website mirrors the public documentation tree and exposes raw templates/schemas under `/artifacts/docs/`.
- No database is required.
- No persistent volume is required.
- No secrets are required for the initial public site.
- Outbound network is needed during dependency installation, unless dependencies are cached by the runner.
- The full repository must be cloned, not only the `site/` directory, because the rendered documentation source lives in root `docs/`.
