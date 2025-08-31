const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users
// @desc    Mendapatkan semua pengguna
// @access  Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users
// @desc    Menambahkan pengguna baru
// @access  Public
router.post('/', async (req, res) => {
    const { nama, email } = req.body;
    try {
        const newUser = new User({
            nama,
            email
        });
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;