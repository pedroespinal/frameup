#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const sizes = [
  { name: 'icon.png', size: 1024, dir: 'assets/images' },
  { name: 'splash-icon.png', size: 512, dir: 'assets/images' },
  { name: 'favicon.png', size: 192, dir: 'assets/images' },
  { name: 'android-icon-foreground.png', size: 1080, dir: 'assets/images' },
  { name: 'android-icon-background.png', size: 1080, dir: 'assets/images', background: true },
  { name: 'android-icon-monochrome.png', size: 1080, dir: 'assets/images', monochrome: true },
];

const colors = {
  dark: '#0A0A0F',
  amber: '#F5A623',
  lightAmber: '#FFD080',
};

function drawApertureIcon(canvas, size, options = {}) {
  const ctx = canvas.getContext('2d');
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  // Background
  if (options.background) {
    ctx.fillStyle = colors.dark;
    ctx.fillRect(0, 0, size, size);
    return; // Solo fondo para background
  }

  // Fondo transparente (para PNG con transparency)
  ctx.clearRect(0, 0, size, size);

  // Outer frame
  const frameWidth = size * 0.08;
  ctx.strokeStyle = colors.amber;
  ctx.lineWidth = frameWidth;
  ctx.beginPath();
  ctx.roundRect(
    frameWidth / 2,
    frameWidth / 2,
    size - frameWidth,
    size - frameWidth,
    size * 0.08
  );
  ctx.stroke();

  // Aperture circle
  ctx.strokeStyle = colors.amber;
  ctx.lineWidth = size * 0.04;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Aperture blades (7 blades)
  const bladeCount = 7;
  for (let i = 0; i < bladeCount; i++) {
    const angle = (i / bladeCount) * Math.PI * 2 - Math.PI / 2;
    const nextAngle = ((i + 1) / bladeCount) * Math.PI * 2 - Math.PI / 2;

    ctx.fillStyle = options.monochrome ? 'rgba(100, 100, 100, 0.3)' : 'rgba(245, 166, 35, 0.3)';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, nextAngle);
    ctx.closePath();
    ctx.fill();
  }

  // Inner focus circle
  ctx.strokeStyle = options.monochrome ? 'rgba(100, 100, 100, 0.8)' : 'rgba(245, 166, 35, 0.8)';
  ctx.lineWidth = size * 0.005;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = options.monochrome ? 'rgba(100, 100, 100, 1)' : colors.amber;
  ctx.beginPath();
  ctx.arc(centerX, centerY, size * 0.02, 0, Math.PI * 2);
  ctx.fill();

  // Corner accents
  const cornerSize = size * 0.12;
  const cornerOffset = size * 0.1;
  ctx.strokeStyle = options.monochrome ? 'rgba(100, 100, 100, 0.8)' : colors.amber;
  ctx.lineWidth = size * 0.02;

  // Top-left
  ctx.beginPath();
  ctx.moveTo(cornerOffset, cornerOffset);
  ctx.lineTo(cornerOffset, cornerOffset + cornerSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cornerOffset, cornerOffset);
  ctx.lineTo(cornerOffset + cornerSize, cornerOffset);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.moveTo(size - cornerOffset, cornerOffset);
  ctx.lineTo(size - cornerOffset, cornerOffset + cornerSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(size - cornerOffset, cornerOffset);
  ctx.lineTo(size - cornerOffset - cornerSize, cornerOffset);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(cornerOffset, size - cornerOffset);
  ctx.lineTo(cornerOffset, size - cornerOffset - cornerSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cornerOffset, size - cornerOffset);
  ctx.lineTo(cornerOffset + cornerSize, size - cornerOffset);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(size - cornerOffset, size - cornerOffset);
  ctx.lineTo(size - cornerOffset, size - cornerOffset - cornerSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(size - cornerOffset, size - cornerOffset);
  ctx.lineTo(size - cornerOffset - cornerSize, size - cornerOffset);
  ctx.stroke();

  // Viewfinder grid
  const gridColor = options.monochrome ? 'rgba(100, 100, 100, 0.15)' : 'rgba(245, 166, 35, 0.2)';
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = size * 0.002;

  const gridMargin = size * 0.15;
  const gridSize = size - gridMargin * 2;

  // Vertical lines (thirds)
  for (let i = 1; i < 3; i++) {
    const x = gridMargin + (gridSize / 3) * i;
    ctx.beginPath();
    ctx.moveTo(x, gridMargin);
    ctx.lineTo(x, size - gridMargin);
    ctx.stroke();
  }

  // Horizontal lines (thirds)
  for (let i = 1; i < 3; i++) {
    const y = gridMargin + (gridSize / 3) * i;
    ctx.beginPath();
    ctx.moveTo(gridMargin, y);
    ctx.lineTo(size - gridMargin, y);
    ctx.stroke();
  }
}

console.log('🎨 Generating professional FrameUp icons...\n');

// Ensure canvas has roundRect support
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}

sizes.forEach(({ name, size, dir, background, monochrome }) => {
  try {
    const canvas = createCanvas(size, size);
    drawApertureIcon(canvas, size, { background, monochrome });

    const dir_path = path.join(__dirname, dir);
    if (!fs.existsSync(dir_path)) {
      fs.mkdirSync(dir_path, { recursive: true });
    }

    const filepath = path.join(dir_path, name);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filepath, buffer);

    const sizeKB = (buffer.length / 1024).toFixed(2);
    console.log(`✓ ${name} (${size}x${size}) - ${sizeKB} KB`);
  } catch (err) {
    console.error(`✗ Error generating ${name}:`, err.message);
  }
});

console.log('\n✅ All icons generated successfully!');
