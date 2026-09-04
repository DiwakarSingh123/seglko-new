import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://diwakarsinghdd111:Diwakar%401234@ac-rpnu8kb-shard-00-00.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-01.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-02.evpsohq.mongodb.net:27017/seglko?ssl=true&replicaSet=atlas-13rpm1-shard-0&authSource=admin&appName=CodingAdda';

await mongoose.connect(MONGODB_URI);
const Institution = mongoose.model('Institution', new mongoose.Schema({}, { strict: false }));

const updates = [
  { short: 'SSITM', title: 'Shivdan Singh Institute of Technology and Management', url: 'https://ssitm.in/', image: '/best-engineering-and-management-college-in-aligarh-shivdan-singh-institute-of-technology-and-management-saroj-educational-group.webp' },
  { short: 'SITM',  title: 'Saroj Institute of Technology and Management', url: 'https://sitmlko.org/', image: '/best-engineering-and-management-college-in-lucknow-saroj-institute-of-technology-and-management-saroj-educational-group.webp' },
  { short: 'SCL',   title: 'Saroj College of Law', url: '/scl/', image: '/best-law-college-in-lucknow-saroj-college-of-law-saroj-educational-group.webp' },
  { short: 'SCP',   title: 'Saroj College of Pharmacy', url: '/scp/', image: '/best-pharmacy-college-in-lucknow-saroj-college-of-pharmacy-saroj-educational-group.webp' },
  { short: 'SCEP',  title: 'Saroj College of Engineering and Polytechnic', url: '/scep/', image: '/best-engineering-and-polytechnic-college-in-lucknow-saroj-college-of-engineering-and-polytechnics-saroj-educational-group.webp' },
];

for (const u of updates) {
  await Institution.updateOne({ short: u.short }, { $set: { image: u.image, title: u.title, url: u.url }, $unset: { customImage: "" } });
  console.log(`Updated ${u.short} -> ${u.image}`);
}

await mongoose.disconnect();
console.log('Done!');
