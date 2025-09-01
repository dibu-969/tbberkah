// pages/produk/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './DetailProduk.css'; // Assuming you have this CSS file

function DetailProduk() {
  const router = useRouter();
  const { id } = router.query;
  const [produk, setProduk] = useState(null);
  const [selectedMacam, setSelectedMacam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before fetching

    const fetchProduk = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/produk/${id}`);
        const data = await res.json();
        setProduk(data);
        if (data.macam && data.macam.length > 0) {
          setSelectedMacam(data.macam[0]); // automatically select the first 'macam'
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

  // Determine the image and price to display
  const displayImage = selectedMacam ? selectedMacam.image_url : produk.image_url;
  const displayHarga = selectedMacam ? selectedMacam.Harga : produk.Harga;

  return (
    <div className="detail-container">
      {/* Image section on the left */}
      <div className="detail-left">
        {/*
          In Next.js, it's recommended to use the `next/image` component
          for automatic optimization. For this example, we'll stick with
          the standard `img` tag for a direct conversion.
        */}
        <img src={displayImage} alt={produk.nama} className="detail-image" />
      </div>

      {/* Info section on the right */}
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