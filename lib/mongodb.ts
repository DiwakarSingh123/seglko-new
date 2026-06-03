import mongoose from 'mongoose';
import { setServers } from 'node:dns/promises';

// Force DNS lookup to use public DNS resolvers (Google / Cloudflare) to prevent querySrv lookups failing on local/ISP DNS
try {
  setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr: any) {
  console.warn('Could not set custom DNS servers in mongodb.ts:', dnsErr.message);
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let cached = (global as any).mongoose || { conn: null, promise: null };
(global as any).mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
      .then((m) => m)
      .catch((err) => {
        cached.promise = null; // Clear cached promise on failure to allow retries
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // Clear on await failure too
    throw err;
  }
  return cached.conn;
}
