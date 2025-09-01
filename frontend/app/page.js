'use client'; // This tells Next.js the component runs on the client

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Correct Link for Next.js
import axios from 'axios'; // Import Axios
import './App.css'; // Assuming you have this CSS file

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [jenis, setJenis] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = 'https://tbberkah-vrmx.vercel.app';
        const response = await axios.get(`${API_URL}/api/produk`);

        setProducts(response.data);
      } catch (err) {
        setError('Gagal mengambil data produk.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on name and category
  const filteredProducts = products.filter((item) => {
    // Use lowercase properties to match the database
    const matchesName = item.nama?.toLowerCase().includes(search.toLowerCase());
    const matchesJenis = jenis === 'Semua' || item.jenis === jenis;
    return matchesName && matchesJenis;
  });

  // Get a list of unique categories from the data
  const jenisList = ['Semua', ...new Set(products.map((item) => item.jenis))];

  if (loading) {
    return <p className="loading">Memuat data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="home-container">
      {/* Search and Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Cari produk berdasarkan nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="filter-select"
        >
          {jenisList.map((j, index) => (
            <option key={index} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="produk-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link key={item._id} href={`/produk/${item._id}`} className="produk-card-link">
              <div className="produk-card">
                <img src={item.image_url} alt={item.nama} className="produk-img" />
                <div className="produk-info">
                  <h3 className="produk-nama">{item.nama}</h3>
                  <p className="produk-harga">Rp {item.harga?.toLocaleString()}</p>
                  <span className="produk-detail">Klik untuk lihat detail</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-result">Produk tidak ditemukan</p>
        )}
      </div>
    </div>
  );
}