import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db();
const institutions = await db.collection('institutions').find({}, { projection: { title: 1, short: 1, image: 1 } }).toArray();
console.log(JSON.stringify(institutions, null, 2));
await client.close();
