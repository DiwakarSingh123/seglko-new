import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'docmem71d',
  api_key: '817155411327787',
  api_secret: '78YR7YGJdyzUX1k80ZNOqAENIS0'
});

const images = [
  { name: 'engineering', file: 'seg/src/assets/images/engineerging.webp' },
  { name: 'management', file: 'seg/src/assets/images/management.jpg' },
  { name: 'computer', file: 'seg/src/assets/images/computer.webp' },
  { name: 'diploma', file: 'seg/src/assets/images/diploma.jpg' },
  { name: 'pharmacy', file: 'seg/src/assets/images/pharmacy.jpg' }
];

async function run() {
  for (const img of images) {
    try {
      const fullPath = path.resolve(img.file);
      console.log(`Uploading ${img.name} from ${fullPath}...`);
      const result = await cloudinary.uploader.upload(fullPath, {
        folder: 'programs'
      });
      console.log(`Uploaded ${img.name}: ${result.secure_url}`);
    } catch (error) {
      console.error(`Failed to upload ${img.name}:`, error);
    }
  }
}

run();
