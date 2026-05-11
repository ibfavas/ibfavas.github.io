#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"
ROUTE="${1:-/writeups/peelr/}"
OUTPUT_PATH="${2:-/tmp/ibfavas-mobile-screenshot.png}"
PORT="${SCREENSHOT_PORT:-4173}"
WIDTH="${SCREENSHOT_WIDTH:-390}"
HEIGHT="${SCREENSHOT_HEIGHT:-1800}"
SCALE="${SCREENSHOT_SCALE:-2}"
SERVER_PID=""

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT

mkdir -p "$(dirname "$OUTPUT_PATH")"

hugo --source "$ROOT_DIR" >/dev/null

python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$PUBLIC_DIR" >/tmp/ibfavas-screenshot-server.log 2>&1 &
SERVER_PID=$!

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
    break
  fi
  sleep 0.2
done

if ! curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
  printf 'Local preview server did not start on port %s\n' "$PORT" >&2
  exit 1
fi

google-chrome-stable \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --force-device-scale-factor="$SCALE" \
  --window-size="${WIDTH},${HEIGHT}" \
  --virtual-time-budget=3000 \
  --run-all-compositor-stages-before-draw \
  "--screenshot=$OUTPUT_PATH" \
  "http://127.0.0.1:$PORT$ROUTE" >/tmp/ibfavas-screenshot-browser.log 2>&1

printf 'Saved screenshot to %s\n' "$OUTPUT_PATH"
