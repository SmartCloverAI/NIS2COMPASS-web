# Ratio1 Worker App Runner Notes

The initial NIS2COMPASS site is a static Astro application in `site/`.

Ratio1 Worker App Runner is the preferred deployment path because it can clone a Git repository, run build commands, and start the app without requiring this repository to provide a Dockerfile or a pre-built container image.

## Runtime Baseline

| Item | Value |
| --- | --- |
| Deployment mode | Full Git repository clone |
| Working directory | Repository root |
| Project Dockerfile | Not required and intentionally not used |
| R1 WAR base runtime image | Node.js 22 Alpine or equivalent Node.js 22 runtime |
| CPU | `0.5` vCPU |
| Memory | `512 MB` RAM |
| Disk | `1 GB` minimum, `2 GB` recommended for dependency install and build cache |
| Port | `8080`, or platform-provided `PORT` |
| Single run command | `./start-website.sh` |
| Separate build command, only if the runner requires one | `./start-website.sh build` |

## Notes

- The application is static after build.
- The build copies `docs/` into `site/public/artifacts/docs/` so the website mirrors the public documentation tree and exposes raw templates/schemas under `/artifacts/docs/`.
- `start-website.sh` is a root-level launcher that delegates to the Astro project in `site/`, so the runner does not need `cd site` commands.
- With no argument, `./start-website.sh` installs dependencies, builds the website, and starts the static server.
- The launcher reads the Ratio1 runtime node identifier from `EE_HOST_ID`, writes it to generated runtime configuration, and shows `Served by edge node local` when the variable is absent.
- Do not hard-code `EE_HOST_ID` in a reusable deployment descriptor. WAR/CAR should inject the identity of the node that is actually serving the application.
- No database is required.
- No persistent volume is required.
- No secrets are required for the initial public site.
- Outbound network is needed during dependency installation, unless dependencies are cached by the runner.
- The full repository must be cloned, not only the `site/` directory, because the rendered documentation source lives in root `docs/`.
