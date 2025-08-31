const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

// Hubungkan ke database
connectDB();

// Middleware untuk mengizinkan CORS dan parsing JSON
const corsOptions = {
    origin: 'https://tbberkah-twqx.vercel.app',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Definisikan rute API
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server backend berjalan di port ${PORT}`));