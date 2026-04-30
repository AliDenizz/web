"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("passenger"); // "passenger" or "driver"
  const [serviceCategory, setServiceCategory] = useState("taksi");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // The API route /api/auth/register will forward this to the actual external backend
      await axios.post("/api/auth/register", { 
        phone, 
        password, 
        first_name: firstName, 
        last_name: lastName,
        role,
        service_category: role === "driver" ? serviceCategory : undefined
      });
      
      if (role === "driver") {
        router.push("/driver");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Kayıt başarısız.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "12rem" }}>
        <div className="booking-form-wrapper" style={{ width: "100%", maxWidth: "540px" }}>
          <div className="form-title" style={{ textAlign: "center", fontSize: "2.5rem" }}>ÜYE OL</div>
          <div className="form-subtitle" style={{ textAlign: "center" }}>// DirectGo ailesine katıl</div>

          <div className="service-tabs" style={{ marginTop: "2rem" }}>
            <button 
              type="button"
              className={`service-tab ${role === "passenger" ? "active" : ""}`}
              onClick={() => setRole("passenger")}
            >
              Müşteri
            </button>
            <button 
              type="button"
              className={`service-tab ${role === "driver" ? "active" : ""}`}
              onClick={() => setRole("driver")}
            >
              Sürücü
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ad</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="Adınız" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Soyad</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="Soyadınız" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
            </div>

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
                placeholder="Şifreniz"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {role === "driver" && (
              <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "2px", border: "1px dashed var(--border)" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--yellow)", fontWeight: 600, marginBottom: "1rem", fontFamily: "var(--font-bebas-neue)", letterSpacing: "1px" }}>SÜRÜCÜ DETAYLARI</div>
                
                <div className="form-group">
                  <label className="form-label">Hizmet Kategorisi</label>
                  <select 
                    className="form-input" 
                    style={{ fontSize: "0.85rem", background: "var(--anthracite-2)" }}
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                  >
                    <option value="taksi">Taksi</option>
                    <option value="nakliye">Nakliye</option>
                    <option value="yol-yardim">Yol Yardım</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Profil Fotoğrafı</label>
                  <input type="file" className="form-input" style={{ fontSize: "0.75rem" }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ehliyet / Ruhsat</label>
                  <input type="file" className="form-input" style={{ fontSize: "0.75rem" }} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Adli Sicil Kaydı</label>
                    <input type="file" className="form-input" style={{ fontSize: "0.75rem" }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">İkametgah</label>
                    <input type="file" className="form-input" style={{ fontSize: "0.75rem" }} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">SRC / Psikoteknik</label>
                    <input type="file" className="form-input" style={{ fontSize: "0.75rem" }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Banka Hesap (IBAN)</label>
                    <input type="text" className="form-input" placeholder="TR..." style={{ fontSize: "0.75rem" }} />
                  </div>
                </div>
              </div>
            )}

            {error && <div style={{ color: "var(--orange)", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}

            <button type="submit" className="btn-book">
              KAYIT OL
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.85rem", color: "var(--muted)" }}>
            Zaten üye misiniz?{" "}
            <Link href="/login" style={{ color: "var(--yellow)", fontWeight: 600, textDecoration: "none" }}>
              Giriş Yap
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
