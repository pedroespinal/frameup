#!/usr/bin/env node
// Increments patch version, iOS buildNumber, Android versionCode, and
// the matching native value in android/app/build.gradle.
// Run with: npm run bump-version
// Example: 1.1.0 / build 2  →  1.1.1 / build 3

const fs   = require('fs');
const path = require('path');

const root          = path.resolve(__dirname, '..');
const appJsonPath   = path.join(root, 'app.json');
const pkgPath       = path.join(root, 'package.json');
const buildGradlePath = path.join(root, 'android', 'app', 'build.gradle');

const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
const pkg     = JSON.parse(fs.readFileSync(pkgPath,     'utf8'));

// Bump patch version  e.g. 1.1.0 → 1.1.1
const parts  = appJson.expo.version.split('.').map(Number);
parts[2]    += 1;
const newVersion = parts.join('.');

// Bump build / version codes
const newBuildNumber = String(Number(appJson.expo.ios.buildNumber) + 1);
const newVersionCode = Number(appJson.expo.android.versionCode) + 1;

// --- Update app.json ---
appJson.expo.version             = newVersion;
appJson.expo.ios.buildNumber     = newBuildNumber;
appJson.expo.android.versionCode = newVersionCode;

// --- Update package.json ---
pkg.version = newVersion;

// --- Update android/app/build.gradle (native source of truth for APK) ---
let gradle = fs.readFileSync(buildGradlePath, 'utf8');
gradle = gradle.replace(
  /versionCode\s+\d+/,
  `versionCode ${newVersionCode}`
);
gradle = gradle.replace(
  /versionName\s+"[^"]+"/,
  `versionName "${newVersion}"`
);

fs.writeFileSync(appJsonPath,     JSON.stringify(appJson, null, 2) + '\n', 'utf8');
fs.writeFileSync(pkgPath,         JSON.stringify(pkg,     null, 2) + '\n', 'utf8');
fs.writeFileSync(buildGradlePath, gradle, 'utf8');

console.log(`✓ Version bumped to ${newVersion} (build ${newBuildNumber} / versionCode ${newVersionCode})`);
console.log(`  Updated: app.json, package.json, android/app/build.gradle`);
