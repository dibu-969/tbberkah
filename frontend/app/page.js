'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Perhatian: Gunakan URL lokal untuk pengembangan
        const API_URL = 'https://tbberkah-vrmx.vercel.app';
        const response = await axios.get(`${API_URL}/api/users`);
      
        setProducts(response.data);
        setProducts(response.data);
      } catch (err) {
        setError('Gagal mengambil data produk.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Memuat data...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Daftar Produk</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id} style={{ marginBottom: '20px' }}>
              <strong>Nama:</strong> {product.nama} <br />
              <strong>Jenis:</strong> {product.jenis} <br />
              <strong>Harga:</strong> Rp{product.harga} <br />
              {product.image_url && (
                <img src={product.image_url} alt={product.nama} style={{ maxWidth: '100px' }} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada produk ditemukan.</p>
      )}
    </div>
  );
}