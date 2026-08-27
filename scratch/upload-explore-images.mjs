import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually load .env.local then .env
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) process.env[match[1].trim()] ??= match[2].trim().replace(/^['"](.*)['"]$/, '$1');
    }
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const gallerySchema = new mongoose.Schema({
  title: String,
  category: String,
  url: String,
  publicId: String,
  description: String,
}, { timestamps: true });

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

// Category assignment based on filename
function getCategory(filename) {
  const name = filename.toLowerCase();
  if (name.includes('tcs')) return 'Sports';
  if (name.includes('whatsapp')) return 'Gallery';
  return 'Campus Views';
}

function getTitle(filename) {
  const name = filename.toLowerCase();
  if (name.includes('tcs')) return 'TCS Expert Session';
  if (name.includes('whatsapp')) return 'Campus Life';
  if (name.includes('saroj')) return 'Saroj Educational Group';
  return 'Campus View';
}

const IMAGES_DIR = path.resolve(__dirname, '../seg/public/Explore-more');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const files = fs.readdirSync(IMAGES_DIR).filter(f =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  console.log(`Found ${files.length} images to upload`);

  let success = 0, failed = 0;

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const category = getCategory(file);
    const title = getTitle(file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'seglko-gallery',
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });

      await Gallery.create({
        title,
        category,
        url: result.secure_url,
        publicId: result.public_id,
        description: '',
      });

      console.log(`✅ ${file} → ${category}`);
      success++;
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone! ✅ ${success} uploaded, ❌ ${failed} failed`);
  await mongoose.disconnect();
}

main();
