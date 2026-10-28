#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd -- "$(dirname -- "$0")" || exit 1

node_bin="$(command -v node 2>/dev/null)"
# Fallback for Macs that have Codex's bundled Node but no system installation.
if [ -z "$node_bin" ]; then
  bundled_node="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
  if [ -x "$bundled_node" ]; then
    node_bin="$bundled_node"
  fi
fi

result=0
if [ -z "$node_bin" ]; then
  echo 'Node.js 22+ was not found. Install Node.js and open this file again.'
  result=1
elif ! "$node_bin" -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 22 ? 0 : 1)'; then
  echo 'Node.js 22+ is required. Please update Node.js.'
  result=1
else
  echo "Using Node: $node_bin"
  "$node_bin" scripts/ids.mjs generate && "$node_bin" scripts/ids.mjs check
  result=$?
fi

if [ "$result" -eq 0 ]; then
  echo 'Done. Generated files are in generated/ and dist/.'
  echo 'Review and commit them together with element-ids.json.'
else
  echo 'Generation failed. Check the error above.'
fi
printf '\nPress Enter to close...'
read -r _
exit "$result"
