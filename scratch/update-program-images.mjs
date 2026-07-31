import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://diwakarsinghdd111:Diwakar%401234@ac-rpnu8kb-shard-00-00.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-01.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-02.evpsohq.mongodb.net:27017/seglko?ssl=true&replicaSet=atlas-13rpm1-shard-0&authSource=admin&appName=CodingAdda';

await mongoose.connect(MONGODB_URI);
const Program = mongoose.model('Program', new mongoose.Schema({}, { strict: false }));

const updates = [
  { slug: 'mtech',  image: '/top-best-m-tech-course-saroj-educational-group.webp' },
  { slug: 'btech',  image: '/top-best-b-tech-ai-ml-course-saroj-educational-group.webp' },
  { slug: 'bpharm', image: '/top-best-b-pharm-course-saroj-educational-group.webp' },
  { slug: 'mpharm', image: '/top-best-m-pharm-course-saroj-educational-group.webp' },
  { slug: 'dpharm', image: '/top-best-d-pharm-course-saroj-educational-group.webp' },
];

for (const u of updates) {
  await Program.updateOne({ slug: u.slug }, { $set: { image: u.image } });
  console.log(`Updated ${u.slug} -> ${u.image}`);
}

await mongoose.disconnect();
console.log('Done!');
