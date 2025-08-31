const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Mongoose model for the 'PRODUK' collection

// @route   GET /api/users
// @desc    Mendapatkan semua produk
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await User.find(); // Change variable name to 'products'
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users
// @desc    Menambahkan produk baru
// @access  Public
router.post('/', async (req, res) => {
    // These properties must match the data in your database
    const { nama, jenis, harga, image_url } = req.body;
    try {
        const newProduct = new User({
            nama,
            jenis,
            harga,
            image_url
        });
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;