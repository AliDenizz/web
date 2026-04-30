"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Hero() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg-lines"></div>
      <div className="hero-bg-glow"></div>

      <div className="hero-tag">
        <span className="logo-dot"></span>
        7/24 Aktif Hizmet · Antalya
      </div>

      <h1>
        HER<br />
        <span className="accent">YOLDA</span><br />
        <span className="accent-orange">YANINDA</span>
      </h1>

      <p className="hero-desc">
        Taksi, nakliye, yol yardım ve VIP taşımacılık hizmetleri — tek uygulama, tek numara. Saniyeler içinde çağır, güvenle ulaş.
      </p>

      <div className="hero-buttons">
        {user && user.role === 'driver' ? (
          <Link href="/driver" className="btn-primary">
            &#9654; Sürücü Paneli
          </Link>
        ) : (
          <a href="#rezervasyon" className="btn-primary">
            &#9654; Hemen Taksi Çağır
          </a>
        )}
        <a href="#uygulama" className="btn-secondary">
          &#8659; Uygulamayı İndir
        </a>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-number">12K+</div>
          <div className="stat-label">Aktif Kullanıcı</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.9</div>
          <div className="stat-label">Ortalama Puan</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">3dk</div>
          <div className="stat-label">Ortalama Bekleme</div>
        </div>
      </div>

      {/* HERO SVG ART */}
      <svg className="hero-car-art" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="120" width="380" height="100" rx="20" stroke="#f5c518" strokeWidth="3"/>
        <rect x="100" y="80" width="240" height="70" rx="14" stroke="#f5c518" strokeWidth="2"/>
        <circle cx="140" cy="230" r="35" stroke="#ff6b2b" strokeWidth="3"/>
        <circle cx="360" cy="230" r="35" stroke="#ff6b2b" strokeWidth="3"/>
        <circle cx="140" cy="230" r="18" fill="#ff6b2b" opacity="0.3"/>
        <circle cx="360" cy="230" r="18" fill="#ff6b2b" opacity="0.3"/>
        <rect x="160" y="85" width="80" height="60" rx="8" stroke="#f5c518" strokeWidth="1.5" opacity="0.5"/>
        <rect x="260" y="85" width="70" height="60" rx="8" stroke="#f5c518" strokeWidth="1.5" opacity="0.5"/>
        <line x1="0" y1="255" x2="500" y2="255" stroke="#f5c518" strokeWidth="1" opacity="0.2"/>
        <rect x="60" y="148" width="60" height="24" rx="4" fill="#f5c518" opacity="0.15"/>
        <text x="90" y="165" fill="#f5c518" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.6">34 AKA 0</text>
      </svg>
    </section>
  );
}
