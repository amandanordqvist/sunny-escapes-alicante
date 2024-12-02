import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../src/assets/images');
const outputDir = join(__dirname, '../public/images/hero');

// Create output directory if it doesn't exist
async function ensureDirectoryExists() {
  try {
    await fs.access(outputDir);
  } catch {
    await fs.mkdir(outputDir, { recursive: true });
  }
}

// Optimize hero image
async function optimizeHeroImage() {
  const input = join(inputDir, 'hero.jpg');
  await sharp(input)
    .resize(1920, 1080, {
      fit: 'cover',
      position: 'center',
      withoutEnlargement: true
    })
    .webp({ quality: 85 })
    .toFile(join(outputDir, 'hero.webp'));
  console.log('✅ Hero image optimized');
}

// Run optimization
async function main() {
  try {
    console.log('🔄 Creating directories...');
    await ensureDirectoryExists();
    
    console.log('🔄 Starting image optimization...');
    await optimizeHeroImage();
    
    console.log('✨ Image optimized successfully!');
  } catch (err) {
    console.error('❌ Error optimizing images:', err);
    process.exit(1);
  }
}

main();
