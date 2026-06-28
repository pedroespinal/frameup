#!/usr/bin/env node

/**
 * Convert SVG icons to PNG for Android and iOS
 * Requires: sharp, svg2img, or ImageMagick
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const assetsDir = path.join(__dirname, 'assets', 'images');

// Icon sizes needed for Android and iOS
const iconConfigs = [
  {
    input: 'icon.svg',
    output: 'icon.png',
    size: 1024,
    description: 'Main icon (1024x1024)'
  },
  {
    input: 'android-icon-foreground.svg',
    output: 'android-icon-foreground.png',
    size: 1024,
    description: 'Android adaptive foreground (1024x1024)'
  },
  {
    input: 'android-icon-background.svg',
    output: 'android-icon-background.png',
    size: 1024,
    description: 'Android adaptive background (1024x1024)'
  },
  {
    input: 'android-icon-monochrome.svg',
    output: 'android-icon-monochrome.png',
    size: 1024,
    description: 'Monochrome/accessibility (1024x1024)'
  },
  {
    input: 'icon.svg',
    output: 'splash-icon.png',
    size: 1080,
    description: 'Splash screen icon (1080x1080)'
  }
];

async function convertIcons() {
  console.log('🎨 Converting SVG icons to PNG...\n');

  try {
    // Try using ImageMagick convert command
    for (const config of iconConfigs) {
      const inputPath = path.join(assetsDir, config.input);
      const outputPath = path.join(assetsDir, config.output);

      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  ${config.input} not found, skipping...`);
        continue;
      }

      try {
        // Try ImageMagick
        await execAsync(`convert "${inputPath}" -resize ${config.size}x${config.size} -background none "${outputPath}"`);
        console.log(`✅ ${config.description}`);
      } catch (err) {
        console.log(`⚠️  Could not convert ${config.input} (trying alternative method...)`);

        // Try with -density and -extent for SVG
        try {
          await execAsync(`convert -density 256 "${inputPath}" -resize ${config.size}x${config.size} -extent ${config.size}x${config.size} -gravity center -background none "${outputPath}"`);
          console.log(`✅ ${config.description} (alternative method)`);
        } catch (err2) {
          console.log(`❌ Failed to convert ${config.input}`);
        }
      }
    }

    console.log('\n📊 Conversion complete!');
    console.log('\nGenerated PNG files:');

    const pngFiles = fs.readdirSync(assetsDir)
      .filter(f => f.endsWith('.png'))
      .sort();

    if (pngFiles.length > 0) {
      pngFiles.forEach(file => {
        const size = fs.statSync(path.join(assetsDir, file)).size;
        console.log(`   ✅ ${file} (${(size / 1024).toFixed(1)} KB)`);
      });
    } else {
      console.log('\n⚠️  No PNG files generated. You may need ImageMagick installed.');
      console.log('\nOn Windows: choco install imagemagick');
      console.log('On Mac: brew install imagemagick');
      console.log('On Linux: sudo apt install imagemagick');
    }

  } catch (err) {
    console.error('Error during conversion:', err.message);
  }
}

convertIcons();
