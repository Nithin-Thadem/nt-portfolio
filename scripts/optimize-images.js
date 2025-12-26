import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Configuration
const CONFIG = {
  quality: 85, // WebP quality (0-100)
  maxWidth: 1920, // Max width for large images
  skipPatterns: ['.webp', '.svg', '.gif'], // Skip these formats
};

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();

  // Skip certain file types
  if (CONFIG.skipPatterns.some(pattern => ext === pattern)) {
    console.log(`⏭️  Skipping: ${path.basename(inputPath)}`);
    return;
  }

  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  // Skip if WebP already exists and is newer
  if (fs.existsSync(outputPath)) {
    const inputStat = fs.statSync(inputPath);
    const outputStat = fs.statSync(outputPath);
    if (outputStat.mtime > inputStat.mtime) {
      console.log(`✅ Already optimized: ${path.basename(inputPath)}`);
      return;
    }
  }

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSize = inputStats.size;

    await sharp(inputPath)
      .resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSize = outputStats.size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(
      `✨ ${path.basename(inputPath)} → ${path.basename(outputPath)} ` +
      `(${formatBytes(inputSize)} → ${formatBytes(outputSize)}, -${savings}%)`
    );
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      await optimizeImage(filePath);
    }
  }
}

console.log('🖼️  Starting image optimization...\n');
await processDirectory(IMAGES_DIR);
console.log('\n✅ Image optimization complete!');
console.log('\n📝 Note: Update your image imports to use .webp files for better performance.');
console.log('   You can keep original files as fallbacks for older browsers.');
