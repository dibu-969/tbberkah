const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

// Hubungkan ke database
connectDB();

// Middleware untuk mengizinkan CORS dan parsing JSON
app.use(cors());
app.use(express.json());

// Tangani permintaan preflight (OPTIONS)
app.options('*', cors()); // Tambahkan baris ini

// Definisikan rute API
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server backend berjalan di port ${PORT}`));