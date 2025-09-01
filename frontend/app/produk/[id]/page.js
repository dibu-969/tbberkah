'use client'; 

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// Correct the path for the CSS file
import './DetailProduk.css'; 

function DetailProduk() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [selectedMacam, setSelectedMacam] = useState(null);
  const [loading, setLoading] = useState(true);

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