import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { setServers } from 'dns/promises';

try { setServers(['8.8.8.8', '1.1.1.1']); } catch {}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: 'docmem71d',
  api_key: '817155411327787',
  api_secret: '78YR7YGJdyzUX1k80ZNOqAENIS0',
});

const MONGODB_URI = 'mongodb+srv://diwakarsinghdd111:Diwakar%401234@codingadda.evpsohq.mongodb.net/seglko?retryWrites=true&w=majority';

const institutions = [
  {
    title: 'Shivdan Singh Institute of Technology and Management',
    code: '007', tag: 'ENGINEERING', short: 'SSITM',
    date: { day: '01', month: 'JAN', year: '2001' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Engineering, management and computer applications programs with strong industry tie-ups and research focus.',
    url: 'https://ssitm.in/',
    category: 'Engineering', type: 'Engineering',
    estd: 2001, programs: 10, students: 3000,
    location: 'Lucknow, UP', status: 'Active', affiliation: 'AKTU',
    color: 'from-blue-500 to-blue-700',
    localImage: path.resolve(__dirname, '../seg/src/assets/images/ssitm.jpeg'),
  },
  {
    title: 'Saroj Institute of Technology and Management',
    code: '123', tag: 'ENGINEERING', short: 'SITM',
    date: { day: '01', month: 'JAN', year: '2002' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Premier engineering and management institute offering a wide range of technical and professional programs.',
    url: 'https://seglko.org/',
    category: 'Engineering', type: 'Engineering',
    estd: 2002, programs: 12, students: 4000,
    location: 'Lucknow, UP', status: 'Active', affiliation: 'AKTU',
    color: 'from-indigo-500 to-indigo-700',
    localImage: path.resolve(__dirname, '../seg/src/assets/images/saroj institue.jpeg'),
  },
  {
    title: 'Saroj College of Law',
    code: 'BCI Approved', tag: 'LAW', short: 'SCL',
    date: { day: '01', month: 'JAN', year: '2005' },
    approval: 'Approved by Bar Council of India and affiliated to AKTU, Lucknow.',
    description: 'Dedicated law college providing quality legal education approved by the Bar Council of India.',
    url: 'https://seglko.org/',
    category: 'Law', type: 'Law',
    estd: 2005, programs: 3, students: 800,
    location: 'Lucknow, UP', status: 'Active', affiliation: 'BCI / AKTU',
    color: 'from-amber-500 to-amber-700',
    localImage: path.resolve(__dirname, '../seg/src/assets/images/college of law.avif'),
  },
  {
    title: 'Saroj College of Pharmacy',
    code: '2031', tag: 'PHARMACY', short: 'SCP',
    date: { day: '01', month: 'JAN', year: '2003' },
    approval: 'Approved by Pharmacy Council of India and affiliated to AKTU, Lucknow.',
    description: 'Offering B.Pharm and D.Pharm programs with state-of-the-art pharmaceutical labs and experienced faculty.',
    url: 'https://seglko.org/',
    category: 'Pharmacy', type: 'Pharmacy',
    estd: 2003, programs: 2, students: 600,
    location: 'Lucknow, UP', status: 'Active', affiliation: 'PCI / AKTU',
    color: 'from-emerald-500 to-emerald-700',
    localImage: path.resolve(__dirname, '../seg/src/assets/images/pharmacy.jpg'),
  },
  {
    title: 'Saroj College of Engineering and Polytechnic',
    code: 'SCEP', tag: 'POLYTECHNIC', short: 'SCEP',
    date: { day: '01', month: 'JAN', year: '2004' },
    approval: 'Approved by AICTE and affiliated to AKTU, Lucknow.',
    description: 'Polytechnic and engineering diploma programs designed to produce skilled technical professionals.',
    url: 'https://seglko.org/',
    category: 'Polytechnic', type: 'Polytechnic',
    estd: 2004, programs: 8, students: 1500,
    location: 'Lucknow, UP', status: 'Active', affiliation: 'AKTU',
    color: 'from-violet-500 to-violet-700',
    localImage: path.resolve(__dirname, '../seg/src/assets/images/building1.webp'),
  },
];

const institutionSchema = new mongoose.Schema({
  title: String, code: String, tag: String, short: String,
  date: mongoose.Schema.Types.Mixed, approval: String,
  description: String, url: String, image: String,
  category: String, type: String, estd: Number, programs: Number,
  students: Number, location: String, status: String,
  affiliation: String, color: String, customImage: String,
}, { timestamps: true });

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const Institution = mongoose.models.Institution || mongoose.model('Institution', institutionSchema);

  // Clear existing institutions
  await Institution.deleteMany({});
  console.log('Cleared existing institutions');

  for (const inst of institutions) {
    const { localImage, ...data } = inst;

    console.log(`Uploading image for ${inst.short}...`);
    let imageUrl = '';
    try {
      const result = await cloudinary.uploader.upload(localImage, {
        folder: 'institutions',
        public_id: inst.short.toLowerCase(),
        overwrite: true,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      });
      imageUrl = result.secure_url;
      console.log(`  ✓ ${inst.short}: ${imageUrl}`);
    } catch (err) {
      console.error(`  ✗ Failed to upload ${inst.short}:`, err.message);
    }

    await Institution.create({ ...data, image: imageUrl, customImage: imageUrl });
    console.log(`  ✓ Saved ${inst.title} to DB`);
  }

  console.log('\nDone! All institutions seeded.');
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
