import Link from 'next/link';
import React from 'react';

function Beranda() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Selamat Datang di Toko Berkah!</h1>
      <p>Tekan tombol di bawah untuk melihat daftar produk.</p>
      
      {/* ⬇️ PERBAIKAN: Menggunakan <Link> di-style seperti tombol ⬇️ */}
      <Link 
        href="/beranda" 
        style={buttonStyle} // Menerapkan styling tombol langsung ke Link
      >
        Lihat Produk Sekarang
      </Link>
    </div>
  );
}

export default Beranda;

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    // Styling tambahan agar <Link> bertingkah seperti tombol
    textDecoration: 'none', 
    display: 'inline-block' // Penting agar style padding bekerja
};