"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DriverDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("PENDING"); // In a real app, this comes from user data
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/auth/me")
      .then((res) => {
        setUser(res.data);
        // Assuming the backend returns is_driver or similar
        // For now we assume if they are on this page, they should be a driver
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you'd upload this to a server
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert("Fotoğraf başarıyla yüklendi. Onay süreci başlatıldı.");
    }, 1500);
  };

  if (loading) return <div className="min-h-screen bg-[#1a1c1e] flex items-center justify-center text-white">Yükleniyor...</div>;

  return (
    <>
      <Navbar />
      <main className="section" style={{ paddingTop: "10rem", minHeight: "100vh" }}>
        <div className="section-header">
          <div className="section-tag">Sürücü Paneli</div>
          <h1 className="section-title">HOS GELDİN,<br />{user?.first_name?.toUpperCase()}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="booking-form-wrapper">
            <div className="form-title">ONAY DURUMU</div>
            <div className="flex items-center gap-4 mt-4">
              <div className={`w-4 h-4 rounded-full ${status === 'APPROVED' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
              <div className="text-xl font-bebas tracking-wider">
                {status === 'APPROVED' ? 'ONAYLANDI' : 'ONAY BEKLENİYOR'}
              </div>
            </div>
            <p className="text-muted text-sm mt-4 leading-relaxed">
              Hesabınız şu anda inceleniyor. Belgeleriniz onaylandıktan sonra sistem üzerinden hizmet vermeye başlayabilirsiniz.
            </p>
            
            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded">
              <div className="text-orange-500 font-bold text-sm mb-2">ÖNEMLİ NOT</div>
              <p className="text-xs text-muted leading-relaxed">
                Sürüş başlatmak, gelen talepleri kabul etmek ve diğer tüm aksiyonlar için lütfen **DirectGo Sürücü** mobil uygulamasını indirin.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors">APP STORE</a>
                <a href="#" className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors">GOOGLE PLAY</a>
              </div>
            </div>
          </div>

          <div className="booking-form-wrapper">
            <div className="form-title">BELGE VE FOTOĞRAF YÜKLE</div>
            <div className="form-subtitle">// Kaydınızı tamamlamak için gerekli belgeleri yükleyin</div>
            
            <div className="space-y-6 mt-6">
              <div className="form-group">
                <label className="form-label">Profil Fotoğrafı</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-[var(--yellow)] transition-colors cursor-pointer">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                  <div className="text-2xl mb-2">📸</div>
                  <div className="text-xs text-muted">Tıklayın veya fotoğrafı buraya sürükleyin</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label text-[10px]">Ehliyet</label>
                  <div className="relative border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[var(--yellow)] transition-colors cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                    <div className="text-sm">📄</div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label text-[10px]">Ruhsat</label>
                  <div className="relative border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[var(--yellow)] transition-colors cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                    <div className="text-sm">📄</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label text-[10px]">Adli Sicil</label>
                  <div className="relative border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[var(--yellow)] transition-colors cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                    <div className="text-sm">📑</div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label text-[10px]">İkametgah</label>
                  <div className="relative border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[var(--yellow)] transition-colors cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                    <div className="text-sm">🏠</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label text-[10px]">SRC / Psikoteknik</label>
                <div className="relative border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-[var(--yellow)] transition-colors cursor-pointer">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={uploading} />
                  <div className="text-sm">🎫 Sertifikaları yükleyin</div>
                </div>
              </div>
              
              {uploading && (
                <div className="text-center text-[var(--yellow)] text-xs animate-pulse">
                  Yükleniyor...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
