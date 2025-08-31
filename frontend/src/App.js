import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Pastikan URL API sudah benar
                const response = await axios.get('https://nama-proyek-backend-mu.vercel.app/api/users');
                // Simpan data dari respons ke dalam state 'products'
                setProducts(response.data);
            } catch (error) {
                console.error("Gagal mengambil data produk:", error);
            }
        };
        
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Daftar Produk</h1>
            {products.length > 0 ? (
                <ul>
                    {/* Iterasi setiap produk dan tampilkan di list */}
                    {products.map(product => (
                        <li key={product._id}>
                            <strong>Nama:</strong> {product.nama} <br />
                            <strong>Jenis:</strong> {product.jenis} <br />
                            <strong>Harga:</strong> Rp{product.harga} <br />
                            <img src={product.image_url} alt={product.nama} style={{ maxWidth: '100px' }} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Tidak ada produk ditemukan.</p>
            )}
        </div>
    );
}

export default App;