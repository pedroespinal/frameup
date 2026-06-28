#!/usr/bin/env node

/**
 * Professional Photography-Themed Icon Generator for FrameUp
 * Creates camera/lens inspired icons for Android and iOS
 */

const fs = require('fs');
const path = require('path');

// SVG for main icon - Camera with aperture
const mainIconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient background -->
  <defs>
    <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0f1e;stop-opacity:1" />
    </radialGradient>
    <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5a623;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d68a1e;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1024" fill="url(#bgGradient)"/>

  <!-- Camera body -->
  <rect x="150" y="250" width="724" height="524" rx="60" fill="#1a1a2e" stroke="#f5a623" stroke-width="8"/>

  <!-- Lens outer ring -->
  <circle cx="512" cy="512" r="320" fill="none" stroke="#f5a623" stroke-width="12"/>

  <!-- Aperture blades -->
  <g opacity="0.8">
    <path d="M 512 192 L 640 340 L 580 512 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 512 192 L 384 340 L 444 512 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 832 512 L 684 384 L 684 444 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 832 512 L 684 640 L 684 580 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 512 832 L 384 684 L 444 512 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 512 832 L 640 684 L 580 512 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 192 512 L 340 384 L 340 444 Z" fill="#f5a623" opacity="0.6"/>
    <path d="M 192 512 L 340 640 L 340 580 Z" fill="#f5a623" opacity="0.6"/>
  </g>

  <!-- Lens glass center -->
  <circle cx="512" cy="512" r="240" fill="url(#lensGradient)" opacity="0.3"/>
  <circle cx="512" cy="512" r="240" fill="none" stroke="#f5a623" stroke-width="4"/>

  <!-- Inner lens detail -->
  <circle cx="512" cy="512" r="180" fill="none" stroke="#f5a623" stroke-width="3" opacity="0.5"/>
  <circle cx="512" cy="512" r="120" fill="none" stroke="#f5a623" stroke-width="2" opacity="0.4"/>

  <!-- Focus ring lines -->
  <line x1="330" y1="512" x2="380" y2="512" stroke="#f5a623" stroke-width="2" opacity="0.6"/>
  <line x1="644" y1="512" x2="694" y2="512" stroke="#f5a623" stroke-width="2" opacity="0.6"/>
  <line x1="512" y1="330" x2="512" y2="380" stroke="#f5a623" stroke-width="2" opacity="0.6"/>
  <line x1="512" y1="644" x2="512" y2="694" stroke="#f5a623" stroke-width="2" opacity="0.6"/>

  <!-- Camera button (top) -->
  <circle cx="280" cy="320" r="24" fill="#f5a623" stroke="#d68a1e" stroke-width="2"/>
  <circle cx="280" cy="320" r="16" fill="#00d9ff" opacity="0.7"/>

  <!-- Shutter text -->
  <text x="512" y="720" font-family="Arial, sans-serif" font-size="48" font-weight="bold"
        fill="#f5a623" text-anchor="middle" opacity="0.8">FRAMEUP</text>
</svg>`;

// SVG for foreground (adaptive icon)
const foregroundSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5a623;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d68a1e;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Lens outer ring -->
  <circle cx="512" cy="512" r="380" fill="none" stroke="#f5a623" stroke-width="16"/>

  <!-- Aperture blades -->
  <g opacity="0.9">
    <path d="M 512 132 L 740 360 L 640 512 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 512 132 L 284 360 L 384 512 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 892 512 L 664 284 L 664 384 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 892 512 L 664 740 L 664 640 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 512 892 L 284 664 L 384 512 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 512 892 L 740 664 L 640 512 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 132 512 L 360 284 L 360 384 Z" fill="#f5a623" opacity="0.7"/>
    <path d="M 132 512 L 360 740 L 360 640 Z" fill="#f5a623" opacity="0.7"/>
  </g>

  <!-- Lens glass center -->
  <circle cx="512" cy="512" r="280" fill="url(#lensGrad)" opacity="0.2"/>
  <circle cx="512" cy="512" r="280" fill="none" stroke="#f5a623" stroke-width="6"/>

  <!-- Inner lens details -->
  <circle cx="512" cy="512" r="200" fill="none" stroke="#f5a623" stroke-width="4" opacity="0.6"/>
  <circle cx="512" cy="512" r="120" fill="none" stroke="#f5a623" stroke-width="3" opacity="0.5"/>
</svg>`;

// SVG for background (adaptive icon)
const backgroundSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" style="stop-color:#1a2440;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e17;stop-opacity:1" />
    </radialGradient>
  </defs>

  <rect width="1024" height="1024" fill="url(#bgGrad)"/>

  <!-- Subtle pattern -->
  <circle cx="256" cy="256" r="120" fill="#f5a623" opacity="0.05"/>
  <circle cx="768" cy="256" r="100" fill="#00d9ff" opacity="0.04"/>
  <circle cx="256" cy="768" r="100" fill="#51cf66" opacity="0.04"/>
  <circle cx="768" cy="768" r="120" fill="#f5a623" opacity="0.05"/>
</svg>`;

// SVG for monochrome (accessibility)
const monochromeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Lens outer ring -->
  <circle cx="512" cy="512" r="380" fill="none" stroke="#000000" stroke-width="20"/>

  <!-- Aperture blades -->
  <g>
    <path d="M 512 132 L 740 360 L 640 512 Z" fill="#000000"/>
    <path d="M 512 132 L 284 360 L 384 512 Z" fill="#000000"/>
    <path d="M 892 512 L 664 284 L 664 384 Z" fill="#000000"/>
    <path d="M 892 512 L 664 740 L 664 640 Z" fill="#000000"/>
    <path d="M 512 892 L 284 664 L 384 512 Z" fill="#000000"/>
    <path d="M 512 892 L 740 664 L 640 512 Z" fill="#000000"/>
    <path d="M 132 512 L 360 284 L 360 384 Z" fill="#000000"/>
    <path d="M 132 512 L 360 740 L 360 640 Z" fill="#000000"/>
  </g>

  <!-- Inner lens details -->
  <circle cx="512" cy="512" r="200" fill="none" stroke="#000000" stroke-width="4"/>
  <circle cx="512" cy="512" r="120" fill="none" stroke="#000000" stroke-width="3"/>
</svg>`;

// Ensure assets directory exists
const assetsDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log('✅ Created assets/images directory');
}

// Write SVG files
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), mainIconSvg);
fs.writeFileSync(path.join(assetsDir, 'android-icon-foreground.svg'), foregroundSvg);
fs.writeFileSync(path.join(assetsDir, 'android-icon-background.svg'), backgroundSvg);
fs.writeFileSync(path.join(assetsDir, 'android-icon-monochrome.svg'), monochromeSvg);

console.log('✅ Professional photography-themed icons created!');
console.log('');
console.log('📸 Icon Details:');
console.log('   Theme: Camera lens with aperture blades');
console.log('   Colors: Golden amber (#F5A623) + Dark navy background');
console.log('   Style: Professional photography aesthetic');
console.log('   Formats: SVG (ready for conversion to PNG)');
console.log('');
console.log('📁 Files created:');
console.log('   - assets/images/icon.svg (main icon)');
console.log('   - assets/images/android-icon-foreground.svg (adaptive)');
console.log('   - assets/images/android-icon-background.svg (adaptive)');
console.log('   - assets/images/android-icon-monochrome.svg (accessibility)');
console.log('');
console.log('Next: Run `npm run build` or use EAS to compile with new icons');
