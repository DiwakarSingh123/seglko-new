import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';

async function run() {
  const uri = 'mongodb+srv://diwakarsinghdd111:Diwakar%401234@codingadda.evpsohq.mongodb.net/seglko?retryWrites=true&w=majority';
  await mongoose.connect(uri);
  
  const schema = new mongoose.Schema({}, { strict: false });
  const Program = mongoose.model('Program', schema, 'programs');
  
  const programs = await Program.find();
  console.log('Existing programs count:', programs.length);
  console.log(JSON.stringify(programs, null, 2));
  
  mongoose.connection.close();
}

run();
