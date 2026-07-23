#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SITE_DIR="$ROOT_DIR/site"
COMMAND="${1:-run}"

usage() {
  cat <<'EOF'
Usage: ./start-website.sh [command]

With no command, the script installs dependencies, builds the static website, and serves it on 0.0.0.0:${PORT:-8080}.

Commands:
  install   Install website dependencies with npm ci.
  dev       Start the Astro development server on 0.0.0.0:4321.
  build     Install dependencies and build the static website into site/dist.
  check     Build and validate the review candidate.
  release-check  Validate the public-release configuration and funding visibility package.
  start     Validate and serve site/dist on 0.0.0.0:${PORT:-8080}; builds first only if dist is missing.

Deployment examples from the repository root:
  ./start-website.sh
  PORT=8090 ./start-website.sh
  EE_HOST_ID=edge-node-name ./start-website.sh

Ratio1 uses EE_HOST_ID. EDGE_NODE_NAME is the documented fallback for other static hosts.
EOF
}

run_npm() {
  npm --prefix "$SITE_DIR" "$@"
}

case "$COMMAND" in
  run)
    run_npm ci
    run_npm run build
    run_npm run runtime:config
    run_npm run check:built
    run_npm run start
    ;;
  install)
    run_npm ci
    ;;
  dev)
    if [ ! -d "$SITE_DIR/node_modules" ]; then
      run_npm ci
    fi
    run_npm run dev
    ;;
  build)
    run_npm ci
    run_npm run build
    ;;
  check)
    if [ ! -d "$SITE_DIR/node_modules" ]; then
      run_npm ci
    fi
    run_npm run check
    ;;
  release-check)
    if [ ! -d "$SITE_DIR/node_modules" ]; then
      run_npm ci
    fi
    run_npm run check:release
    ;;
  start|serve)
    if [ ! -d "$SITE_DIR/node_modules" ]; then
      run_npm ci
    fi
    if [ ! -d "$SITE_DIR/dist" ]; then
      run_npm run build
    fi
    run_npm run runtime:config
    run_npm run check:built
    run_npm run start
    ;;
  help|--help|-h)
    usage
    ;;
  *)
    echo "Unknown command: $COMMAND" >&2
    usage >&2
    exit 2
    ;;
esac
