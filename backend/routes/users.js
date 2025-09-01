// backend/routes/users.js
const express = require('express');
const router = express.Router();
const Produk = require('../models/Produk'); // Pastikan path ini benar

// @route   GET api/users
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  // Logika untuk mengambil semua produk
  try {
    const produk = await Produk.find({});
    res.json(produk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);

    if (!produk) {
      return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    }

    res.json(produk);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;