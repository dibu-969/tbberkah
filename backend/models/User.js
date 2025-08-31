const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    jenis: { // New property
        type: String
    },
    harga: { // New property
        type: Number
    },
    image_url: { // New property
        type: String
    }
}, { collection: 'PRODUK' }); // This line is crucial

module.exports = mongoose.model('User', UserSchema);