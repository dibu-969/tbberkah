const mongoose = require('mongoose');

// Ganti URI ini dengan URI MongoDB-mu
const mongoURI = 'mongodb+srv://fqhindra07:wahyunii@cluster0.ygayshk.mongodb.net/TBBERKAH?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB berhasil terhubung...');
    } catch (err) {
        console.error(err.message);
        // Keluar dari proses jika koneksi gagal
        process.exit(1);
    }
};

module.exports = connectDB;