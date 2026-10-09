#!/usr/bin/env bash
# Packs the package, installs it into an empty project and calls it via CJS and ESM.
set -euo pipefail
root=$(pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
tarball=$(npm pack --silent --pack-destination "$tmp")
cd "$tmp" && npm init -y >/dev/null && npm i --silent --no-audit --no-fund "./$tarball"
node -e 'const p=require("i18n-iso-countries-extended-info");if(p.getCountry("Germany").iso3!=="DEU")process.exit(1)'
node --input-type=module -e 'import {getCountry,findCountries,formatCurrency,getUtcOffset,COUNTRY_CODES} from "i18n-iso-countries-extended-info";if(getCountry("DEU").iso2!=="DE"||findCountries({callingCode:"+1 268"})[0].iso2!=="AG"||formatCurrency(1234.5,"US")!=="$1,234.50"||COUNTRY_CODES.length!==250||getUtcOffset("IN").utcOffsetStr!=="+05:30"||findCountries({phoneNumber:"+1 268 555 1234"})[0].iso2!=="AG"||getCountry("DE",{locale:"fr"}).name!=="Allemagne"||getCountry("AU").numeric!=="036"||getCountry("GB").domain!==".uk")process.exit(1)'
node -e 'const p=require("i18n-iso-countries-extended-info");if(p.findCountries({currency:"EUR"}).length<30||p.formatCurrency(1234.5,"US")!=="$1,234.50")process.exit(1)'
echo "smoke ok"
