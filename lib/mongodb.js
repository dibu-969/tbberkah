import { MongoClient } from 'mongodb';

// Pastikan MONGODB_URI ada
const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // Dalam pengembangan, gunakan variabel global agar koneksi tidak berulang saat hot-reloading
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Dalam produksi (di Vercel), tidak perlu variabel global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// clientPromise adalah koneksi yang di-*cache*
export default clientPromise;