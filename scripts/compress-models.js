import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODELS_DIR = path.join(__dirname, '..', 'public', 'models');

// Skip these models - they contain textures/animations that degrade with Draco
const SKIP_MODELS = ['nit.glb', 'scrn.glb'];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function compressModel(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const fileName = path.basename(inputPath);
  if (ext !== '.glb' && ext !== '.gltf') return;

  // Skip models that degrade with compression
  if (SKIP_MODELS.includes(fileName)) {
    console.log(`⏭️  Skipping (quality loss): ${fileName}`);
    return;
  }

  // Skip already compressed files
  if (inputPath.includes('-draco')) {
    console.log(`⏭️  Skipping (already Draco): ${fileName}`);
    return;
  }

  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(path.dirname(inputPath), `${baseName}-draco${ext}`);

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSize = inputStats.size;

    console.log(`🔄 Compressing: ${path.basename(inputPath)}...`);

    // Use gltf-transform to apply Draco compression
    execSync(
      `npx gltf-transform draco "${inputPath}" "${outputPath}"`,
      { stdio: 'pipe' }
    );

    const outputStats = fs.statSync(outputPath);
    const outputSize = outputStats.size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(
      `✨ ${path.basename(inputPath)} → ${path.basename(outputPath)} ` +
      `(${formatBytes(inputSize)} → ${formatBytes(outputSize)}, -${savings}%)`
    );
  } catch (error) {
    console.error(`❌ Error compressing ${inputPath}:`, error.message);
  }
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
    } else if (/\.(glb|gltf)$/i.test(file) && !file.includes('-draco')) {
      await compressModel(filePath);
    }
  }
}

console.log('🎮 Starting 3D model Draco compression...\n');
await processDirectory(MODELS_DIR);
console.log('\n✅ Model compression complete!');
console.log('\n📝 Note: Update your model imports to use -draco.glb files.');
console.log('   Also ensure Draco decoder is configured in useGLTF.');
