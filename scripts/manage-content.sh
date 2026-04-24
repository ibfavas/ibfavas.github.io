#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONTENT_DIR="$ROOT_DIR/content"

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
}

create_writeup() {
  local title="${1:-}"
  local description="${2:-}"

  if [[ -z "$title" ]]; then
    printf 'Usage: %s new-writeup "Title" "Optional description"\n' "$0" >&2
    exit 1
  fi

  local slug
  local today
  local file

  slug="$(slugify "$title")"
  today="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  file="$CONTENT_DIR/writeups/$slug.md"

  if [[ -e "$file" ]]; then
    printf 'Refusing to overwrite existing file: %s\n' "$file" >&2
    exit 1
  fi

  umask 077
  cat > "$file" <<EOF
+++
title = "$title"
date = $today
draft = true
description = "${description:-Add a short summary here.}"
+++

## Overview

Add context for the issue, target, or lab setup.

## Discovery

Explain the initial clue and the path that led to the finding.

## Validation

Document how you confirmed impact and reduced false positives.

## Notes

Add remediation ideas, edge cases, or follow-up work.
EOF

  printf 'Created draft: %s\n' "$file"
}

create_page() {
  local section="${1:-}"
  local title="${2:-}"

  if [[ -z "$section" || -z "$title" ]]; then
    printf 'Usage: %s new-page "section" "Title"\n' "$0" >&2
    exit 1
  fi

  local slug
  local today
  local dir
  local file

  slug="$(slugify "$title")"
  today="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  dir="$CONTENT_DIR/$section"
  file="$dir/$slug.md"

  mkdir -p "$dir"

  if [[ -e "$file" ]]; then
    printf 'Refusing to overwrite existing file: %s\n' "$file" >&2
    exit 1
  fi

  umask 077
  cat > "$file" <<EOF
+++
title = "$title"
date = $today
draft = true
+++

Write content here.
EOF

  printf 'Created draft: %s\n' "$file"
}

case "${1:-}" in
  new-writeup)
    shift
    create_writeup "${1:-}" "${2:-}"
    ;;
  new-page)
    shift
    create_page "${1:-}" "${2:-}"
    ;;
  *)
    cat <<EOF
Private local content helper

Usage:
  ./scripts/manage-content.sh new-writeup "Title" "Optional description"
  ./scripts/manage-content.sh new-page "section" "Title"
EOF
    ;;
esac
