import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://diwakarsinghdd111:Diwakar%401234@ac-rpnu8kb-shard-00-00.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-01.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-02.evpsohq.mongodb.net:27017/seglko?ssl=true&replicaSet=atlas-13rpm1-shard-0&authSource=admin&appName=CodingAdda';

await mongoose.connect(MONGODB_URI);
const Program = mongoose.model('Program', new mongoose.Schema({}, { strict: false }));

const updates = [
  { slug: 'mtech',  image: '/M-tech.jpeg' },
  { slug: 'btech',  image: '/B-tech.jpeg' },
  { slug: 'bpharm', image: '/B-pharma.jpeg' },
  { slug: 'mpharm', image: '/M-pharma.jpeg' },
  { slug: 'dpharm', image: '/D-pharma.jpeg' },
];

for (const u of updates) {
  await Program.updateOne({ slug: u.slug }, { $set: { image: u.image } });
  console.log(`Updated ${u.slug} -> ${u.image}`);
}

await mongoose.disconnect();
console.log('Done!');
