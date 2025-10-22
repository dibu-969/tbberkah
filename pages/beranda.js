// pages/index.js

import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari API');
        }
        return res.json();
      })
      .then((data) => {
        // Asumsi data.data adalah array produk
        setItems(data.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Memuat data produk...</div>;
  if (error) return <div>Terjadi Error: {error}</div>;
  if (!items || items.length === 0) return <div>Tidak ada produk ditemukan.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Aplikasi Next.js + MongoDB (Data Produk)</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {items.map((item) => (
          <div key={item._id} style={productCardStyle}>
            {/* Menampilkan Gambar */}
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt={item.nama} 
                style={imageStyle}
                // Jika Anda menggunakan Next.js Image component, gunakan <Image> di sini
              />
            )}
            
            {/* Menampilkan Nama */}
            <h3>{item.nama}</h3>
            
            {/* Menampilkan Jenis (Jika ada) */}
            {item.jenis && <p>Jenis: **{item.jenis}**</p>}
            
            {/* Menampilkan Harga (KODE YANG BENAR) */}
            <p style={{ fontWeight: 'bold', color: 'green' }}>
                Harga: Rp
                {item.Harga 
                    ? parseFloat(item.Harga).toLocaleString('id-ID') 
                    : 'N/A'
                }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline Styles (untuk tampilan sederhana)
const productCardStyle = {
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  maxHeight: '150px',
  objectFit: 'contain', // memastikan gambar tidak terdistorsi
  marginBottom: '10px'
};