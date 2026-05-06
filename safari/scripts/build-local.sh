#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SAFARI_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WEB_EXTENSION_DIR="${SAFARI_DIR}/web-extension"
PROJECT_DIR="${SAFARI_DIR}/tabash"
PROJECT_FILE="${PROJECT_DIR}/tabash.xcodeproj"
RESOURCES_DIR="${PROJECT_DIR}/tabash Extension/Resources"
BUILD_DIR="${SAFARI_DIR}/build"
DERIVED_DATA_DIR="${SAFARI_DIR}/.derived-data"

if ! command -v npm >/dev/null 2>&1; then
  echo "error: npm is required" >&2
  exit 1
fi

if ! command -v xcrun >/dev/null 2>&1; then
  echo "error: Xcode command line tools are required" >&2
  exit 1
fi

if ! xcrun --find safari-web-extension-packager >/dev/null 2>&1; then
  echo "error: safari-web-extension-packager was not found. Install full Xcode, then run xcode-select if needed." >&2
  exit 1
fi

if [[ ! -d "${WEB_EXTENSION_DIR}/node_modules" ]]; then
  npm --prefix "${WEB_EXTENSION_DIR}" ci
fi

npm --prefix "${WEB_EXTENSION_DIR}" run build

if [[ ! -d "${PROJECT_FILE}" ]]; then
  xcrun safari-web-extension-packager \
    --project-location "${SAFARI_DIR}" \
    --app-name tabash \
    --bundle-identifier dev.jiseop.tabash \
    --macos-only \
    --swift \
    --copy-resources \
    --no-open \
    --no-prompt \
    --force \
    "${WEB_EXTENSION_DIR}/dist"
fi

rm -rf "${RESOURCES_DIR}"
mkdir -p "${RESOURCES_DIR}"
rsync -a --delete "${WEB_EXTENSION_DIR}/dist/" "${RESOURCES_DIR}/"

xcodebuild \
  -project "${PROJECT_FILE}" \
  -scheme tabash \
  -configuration Debug \
  -destination "generic/platform=macOS" \
  -derivedDataPath "${DERIVED_DATA_DIR}" \
  CODE_SIGNING_ALLOWED=YES \
  CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY="-" \
  DEVELOPMENT_TEAM="" \
  CONFIGURATION_BUILD_DIR="${BUILD_DIR}/Debug" \
  build

echo "Built ${BUILD_DIR}/Debug/tabash.app"
