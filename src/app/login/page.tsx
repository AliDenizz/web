"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { phone, password });
      if (res.data.user?.role === "driver") {
        router.push("/driver");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Giriş başarısız.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "12rem" }}>
        <div className="booking-form-wrapper" style={{ width: "100%", maxWidth: "480px" }}>
          <div className="form-title" style={{ textAlign: "center", fontSize: "2.5rem" }}>GİRİŞ YAP</div>
          <div className="form-subtitle" style={{ textAlign: "center" }}>// Yolculuğa kaldığın yerden devam et</div>

          <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
            <div className="form-group">
              <label className="form-label">Telefon Numarası</label>
              <input 
                type="tel" 
                required 
                className="form-input" 
                placeholder="+905..." 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Şifre</label>
              <input 
                type="password" 
                required 
                className="form-input" 
                placeholder="Şifrenizi girin"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {error && <div style={{ color: "var(--orange)", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}

            <button type="submit" className="btn-book">
              GİRİŞ YAP
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.85rem", color: "var(--muted)" }}>
            Hesabınız yok mu?{" "}
            <Link href="/register" style={{ color: "var(--yellow)", fontWeight: 600, textDecoration: "none" }}>
              Kayıt Ol
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
