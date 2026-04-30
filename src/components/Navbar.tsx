"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    axios.get("/api/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav>
        <Link href="/" className="logo">
          <span className="logo-dot"></span>DirectGo
        </Link>
        <ul className="nav-links">
          <li><Link href="/#hizmetler">Hizmetler</Link></li>
          <li><Link href="/#nasil-calisir">Nasıl Çalışır</Link></li>
          <li><Link href="/#uygulama">Uygulama</Link></li>
          <li><Link href="/#rezervasyon">Fiyatlar</Link></li>
          <li>
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'driver' && (
                  <Link href="/driver" className="text-[var(--yellow)] text-sm font-bold tracking-wider uppercase border border-[var(--yellow)]/30 px-3 py-1 rounded hover:bg-[var(--yellow)]/10 transition-colors">
                    Sürücü Paneli
                  </Link>
                )}
                <span className="text-white text-sm font-medium tracking-wider uppercase flex items-center gap-2">
                  {user.role === 'driver' && <span className="bg-[var(--yellow)] text-black text-[10px] px-1 rounded font-bold">SÜRÜCÜ</span>}
                  MERHABA, {user.first_name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-muted hover:text-white text-sm font-medium tracking-wider uppercase transition-colors"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="text-muted hover:text-white text-sm font-medium tracking-wider uppercase transition-colors"
              >
                Üye Ol / Giriş
              </Link>
            )}
          </li>
          <li>
            {user && user.role === 'driver' ? (
              <Link href="/driver" className="nav-cta">Sürücü Paneli</Link>
            ) : (
              <Link href="/#rezervasyon" className="nav-cta">Taksi Çağır</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
