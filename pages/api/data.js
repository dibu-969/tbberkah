// pages/api/data.js

import clientPromise from '../../lib/mongodb'; // Import koneksi yang sudah di-cache

export default async function handler(req, res) {
  // Pastikan metode yang digunakan adalah GET untuk mengambil data
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    
    // ⬇️ REVISI 1: Tentukan nama Database Anda 
    const db = client.db("TBBERKAH"); 
    
    // ⬇️ REVISI 2: Tentukan nama Koleksi (Collection) Anda
    const collection = db.collection("PRODUK"); 

    // Ambil semua dokumen dari koleksi
    const dataProduk = await collection.find({}).toArray();

    // Kirim data sebagai JSON response
    res.status(200).json({ status: 200, data: dataProduk });

  } catch (e) {
    console.error(e);
    // Kirim pesan error jika koneksi/query gagal
    res.status(500).json({ status: 500, error: 'Failed to fetch data from MongoDB' });
  }
}