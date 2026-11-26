#!/usr/bin/env bash
# Build this repository's website with MathStruct's shared Quartz
# (https://github.com/MathStruct/quartz: Quartz plus the plugins and fixes all MathStruct sites
# share). Needs git and Node >= 22.
#
#   site/build.sh            # -> site/public/
#   site/build.sh --serve    # live preview on http://localhost:8080, rebuilt as you edit
#
# The shared Quartz is cloned into site/.quartz/ (gitignored) and moved to QUARTZ_REF on every
# build. To try a change to the shared Quartz on this site before pushing it, point QUARTZ_DIR
# at your checkout of it: QUARTZ_DIR=~/Code/MathStruct-quartz site/build.sh --serve
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTENT="$HERE/../content"
QUARTZ_REF="${QUARTZ_REF:-main}"

ENGINE="${QUARTZ_DIR:-$HERE/.quartz}"
if [[ -z "${QUARTZ_DIR:-}" ]]; then
  [[ -d "$ENGINE/.git" ]] || git clone -q --depth 1 https://github.com/MathStruct/quartz.git "$ENGINE"
  if git -C "$ENGINE" fetch -q --depth 1 origin "$QUARTZ_REF"; then
    git -C "$ENGINE" checkout -q -f --detach FETCH_HEAD
  else
    echo ">> offline: building with site/.quartz as it is ($(git -C "$ENGINE" rev-parse --short HEAD))"
  fi
fi
"$ENGINE/mathstruct/site.sh" "$HERE" "$CONTENT" "$@"

# Project sites live at their repository's name, and GitHub Pages paths are case-sensitive:
# mathstruct.org/sophia would be a 404 next to mathstruct.org/Sophia/. site/redirects/ holds a
# redirect page for each lowercase spelling, copied into the output as it is (Quartz would turn
# an index.html in content/ into a page of its own).
OUT="$HERE/public"
for arg in "$@"; do [[ "$arg" == --* ]] || OUT="$arg"; done
cp -r "$HERE/redirects/." "$OUT/"

# The front page is not Quartz: landing/ is an Astro site whose only page replaces Quartz's
# /index.html (plus its bundles in /assets/ and the logo). Every other page stays a Quartz page.
# Preview it on its own with `npm run dev` in landing/.
LANDING="$HERE/../landing"
if [[ -z "${SKIP_LANDING:-}" ]]; then
  (cd "$LANDING" && { [[ -d node_modules ]] || npm ci --no-audit --no-fund; } && npx astro build --silent)
  cp -r "$LANDING/dist/." "$OUT/"
  # Astro builds landing/src/pages/zh/index.astro to zh.html (build.format is "file"); the Chinese
  # front page belongs at /zh/, so move it to where GitHub Pages serves it from
  mv "$OUT/zh.html" "$OUT/zh/index.html"
fi
