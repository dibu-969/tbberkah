// backend/models/Produk.js
const mongoose = require('mongoose');

// Definisi skema untuk 'macam' produk (misalnya, ukuran, warna)
const MacamSchema = new mongoose.Schema({
  ukuran: {
    type: String,
    required: true,
  },
  Harga: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

// Definisi skema utama untuk 'Produk'
const ProdukSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  jenis: {
    type: String,
    required: true,
  },
  Harga: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  macam: {
    type: [MacamSchema], // Ini akan menyimpan array dari MacamSchema
    default: [],
  },
}, { collection: 'PRODUK' }); // This line is crucial

// Buat model dari skema
module.exports = mongoose.model('Produk', ProdukSchema);