import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://diwakarsinghdd111:Diwakar%401234@ac-rpnu8kb-shard-00-00.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-01.evpsohq.mongodb.net:27017,ac-rpnu8kb-shard-00-02.evpsohq.mongodb.net:27017/seglko?ssl=true&replicaSet=atlas-13rpm1-shard-0&authSource=admin&appName=CodingAdda';

await mongoose.connect(MONGODB_URI);
const Institution = mongoose.model('Institution', new mongoose.Schema({}, { strict: false }));

const all = await Institution.find({}, { short: 1, title: 1, image: 1 });
console.log(JSON.stringify(all.map(i => ({ id: i._id, short: i.short, title: i.title, image: i.image })), null, 2));

await mongoose.disconnect();
