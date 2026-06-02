// seed-gallery.mjs
// Run: node seed-gallery.mjs
// This uploads all existing frontend images to Cloudinary + saves to MongoDB

import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ─────────────────────────────────────────────────
cloudinary.config({
  cloud_name: 'docmem71d',
  api_key: '817155411327787',
  api_secret: '78YR7YGJdyzUX1k80ZNOqAENIS0',
});

const MONGODB_URI = 'mongodb+srv://diwakarsinghdd111:Diwakar%401234@codingadda.evpsohq.mongodb.net/seglko?retryWrites=true&w=majority';

// ── Gallery Schema ──────────────────────────────────────────
const gallerySchema = new mongoose.Schema({
  title: String,
  category: String,
  url: String,
  publicId: String,
  description: String,
}, { timestamps: true });

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

// ── All images from ExploreMore.jsx ────────────────────────
const IMAGES_DIR = path.join(__dirname, 'seg', 'src', 'assets', 'images');

const galleryData = [
  // Campus Views
  { file: 'seg.jpeg',           title: 'Welcome to SEG',         category: 'Campus Views',  description: 'Where dreams take shape' },
  { file: 'building1.webp',     title: 'Main Academic Block',    category: 'Campus Views',  description: 'Our main campus building' },
  { file: 'saroj institue.jpeg',title: 'Saroj Institute',        category: 'Campus Views',  description: 'Saroj Educational Group campus' },
  { file: 'ssitm.jpeg',         title: 'SSITM Campus',           category: 'Campus Views',  description: 'Shivdan Singh Institute of Technology' },
  { file: 'building14.webp',    title: 'Campus Block',           category: 'Campus Views',  description: 'Academic infrastructure' },

  // Library
  { file: 'library5.webp',      title: 'Resource Center',        category: 'Library',       description: 'Library and knowledge hub' },
  { file: 'library1 (2).webp',  title: 'Reading Zone',           category: 'Library',       description: 'Peaceful study environment' },
  { file: 'library3.webp',      title: 'Study Hall',             category: 'Library',       description: 'Quiet reading area' },
  { file: 'library4.webp',      title: 'Knowledge Hub',          category: 'Library',       description: 'Books and resources' },
  { file: 'library1.webp',      title: 'Library Collection',     category: 'Library',       description: 'Vast collection of books' },
  { file: 'booksimg.jpeg',      title: 'Book Collection',        category: 'Library',       description: 'Extensive library resources' },

  // Computer Labs
  { file: 'computer-lab5.webp', title: 'High-Tech Computer Lab', category: 'Computer Labs', description: 'Modern computing infrastructure' },
  { file: 'computer-lab3.webp', title: 'Programming Lab',        category: 'Computer Labs', description: 'Skill development workshop' },
  { file: 'computer-lab4.webp', title: 'IT Lab',                 category: 'Computer Labs', description: 'Advanced computing facilities' },
  { file: 'computer.webp',      title: 'Smart Classroom',        category: 'Computer Labs', description: 'Technology-enabled learning' },

  // Transport
  { file: 'transport1.webp',    title: 'Campus Bus Fleet',       category: 'Transport',     description: 'Safe and reliable transport' },

  // Sports
  { file: 'sports-meet-10.webp',title: 'Annual Sports Meet',     category: 'Sports',        description: 'Celebrating athletic excellence' },
  { file: 'sports-meet-10.jpeg',title: 'Sports Day',             category: 'Sports',        description: 'Students in action' },

  // Gallery (Events/Happenings)
  { file: 'hapen1.jpeg',        title: 'Campus Event',           category: 'Gallery',       description: 'College events and activities' },
  { file: 'hapen2.jpeg',        title: 'Farewell Event',         category: 'Gallery',       description: 'Jashn-e-Riwayat celebration' },
  { file: 'HappeningsImage1.jpg',title: 'Hackathon 2026',        category: 'Gallery',       description: 'INNOVATE BHARAT 2026' },
  { file: 'eventImg9.jpeg',     title: 'Cultural Fest',          category: 'Gallery',       description: 'Belliatus Cultura 2026' },
];

// ── Main Seed Function ──────────────────────────────────────
async function seed() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB connected');

  // Clear existing gallery data
  await Gallery.deleteMany({});
  console.log('🗑️  Cleared existing gallery data');

  let success = 0;
  let failed = 0;

  for (const item of galleryData) {
    const filePath = path.join(IMAGES_DIR, item.file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${item.file} — skipping`);
      failed++;
      continue;
    }

    try {
      process.stdout.write(`📤 Uploading: ${item.file}...`);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'seglko-gallery',
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });

      await Gallery.create({
        title: item.title,
        category: item.category,
        description: item.description,
        url: result.secure_url,
        publicId: result.public_id,
      });

      console.log(` ✅ Done → ${result.secure_url.slice(0, 60)}...`);
      success++;
    } catch (err) {
      console.log(` ❌ Failed: ${err.message}`);
      failed++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Uploaded: ${success} images`);
  console.log(`❌ Failed:   ${failed} images`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await mongoose.disconnect();
  console.log('🔌 MongoDB disconnected. Done!');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
