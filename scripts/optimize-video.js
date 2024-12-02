import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputVideo = join(__dirname, '../public/videos/FRANKENBERG ALICANTE (1).mp4');
const outputDir = join(__dirname, '../public/videos/optimized');
const outputVideo = join(outputDir, 'hero.mp4');
const outputVideoMobile = join(outputDir, 'hero-mobile.mp4');

async function ensureDirectoryExists() {
  try {
    await fs.access(outputDir);
  } catch {
    await fs.mkdir(outputDir, { recursive: true });
  }
}

async function optimizeVideo() {
  console.log('🔄 Creating directories...');
  await ensureDirectoryExists();

  console.log('🔄 Optimizing desktop version...');
  // Desktop version: 1080p, higher quality settings
  await execAsync(`ffmpeg -i "${inputVideo}" -vf "scale=1920:1080" -c:v libx264 -crf 18 -preset veryslow -c:a aac -b:a 192k -movflags +faststart "${outputVideo}"`);
  
  console.log('🔄 Optimizing mobile version...');
  // Mobile version: 720p, slightly higher quality
  await execAsync(`ffmpeg -i "${inputVideo}" -vf "scale=1280:720" -c:v libx264 -crf 20 -preset veryslow -c:a aac -b:a 128k -movflags +faststart "${outputVideoMobile}"`);

  console.log('✨ Video optimization complete!');
}

optimizeVideo().catch(console.error);
