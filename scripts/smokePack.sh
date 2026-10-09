#!/usr/bin/env bash
# Packs the package, installs it into an empty project and calls it via CJS and ESM.
set -euo pipefail
root=$(pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
tarball=$(npm pack --silent --pack-destination "$tmp")
cd "$tmp" && npm init -y >/dev/null && npm i --silent --no-audit --no-fund "./$tarball"
node -e 'const p=require("i18n-iso-countries-extended-info");if(p.getCountryAlphaCodeByName("Germany","both")!=="DE, DEU")process.exit(1)'
node --input-type=module -e 'import {getCountry} from "i18n-iso-countries-extended-info";if(getCountry("DEU").iso2!=="DE")process.exit(1)'
echo "smoke ok"
