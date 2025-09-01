// app/produk/[id]/page.js

'use client'; 

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './DetailProduk.css'; // Path CSS mungkin perlu disesuaikan
import axios from 'axios';

function DetailProduk() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [selectedMacam, setSelectedMacam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduk = async () => {
      try {
        // Gunakan variabel lingkungan dari .env.local
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/produk/${id}`);
        const data = res.data;
        
        setProduk(data);
        if (data.macam && data.macam.length > 0) {
          setSelectedMacam(data.macam[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!produk) {
    return <p>Produk tidak ditemukan</p>;
  }

  const displayImage = selectedMacam ? selectedMacam.image_url : produk.image_url;
  const displayHarga = selectedMacam ? selectedMacam.Harga : produk.Harga;

  return (
    <div className="detail-container">
      <div className="detail-left">
        <img src={displayImage} alt={produk.nama} className="detail-image" />
      </div>
      <div className="detail-right">
        <h2 className="detail-title">{produk.nama || 'Nama tidak ada'}</h2>
        <p className="detail-price">Harga: Rp {displayHarga?.toLocaleString() || '-'}</p>
        {produk.macam && produk.macam.length > 0 && (
          <div className="detail-options">
            {produk.macam.map((item, index) => (
              <button
                key={index}
                className={`detail-button ${selectedMacam?.ukuran === item.ukuran ? 'active' : ''}`}
                onClick={() => setSelectedMacam(item)}
              >
                {item.ukuran}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailProduk;