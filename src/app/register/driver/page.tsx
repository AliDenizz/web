"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DriverRegistrationPage() {
  const [step, setStep] = useState(1);
  
  // Step 1: Basic
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("taksi");

  // Step 2: IBAN
  const [iban, setIban] = useState("TR");

  // Step 3: Vehicle
  const [plaka, setPlaka] = useState("");
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [modelYili, setModelYili] = useState("");
  const [renk, setRenk] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "10rem", paddingBottom: "4rem" }}>
        
        {step === 1 && (
          <div className="booking-form-wrapper" style={{ width: "100%", maxWidth: "500px" }}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[var(--yellow)] rounded-2xl flex items-center justify-center text-[var(--anthracite)] text-3xl">
                🚕
              </div>
            </div>
            <div className="form-title" style={{ textAlign: "center", fontSize: "2rem" }}>Sürücü Olun</div>
            <div className="form-subtitle" style={{ textAlign: "center" }}>DirectGo sürücü hesabı oluşturun</div>

            <div className="bg-[rgba(245,197,24,0.05)] border border-[rgba(245,197,24,0.2)] rounded-lg p-4 flex gap-3 mt-6 mb-6">
              <div className="text-[var(--yellow)]">ⓘ</div>
              <div className="text-[var(--muted)] text-sm">Kayıt sonrası hesabınız yönetici onayına gönderilecektir.</div>
            </div>

            <form onSubmit={handleNextStep}>
              <div className="form-group">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">👤</span>
                  <input required type="text" className="bg-transparent border-none text-white outline-none w-full" placeholder="Ad" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
              </div>
              
              <div className="form-group mt-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">👤</span>
                  <input required type="text" className="bg-transparent border-none text-white outline-none w-full" placeholder="Soyad" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="form-group mt-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--muted)]">🇹🇷 +90</span>
                  <input required type="tel" className="bg-transparent border-none text-white outline-none w-full" placeholder="Telefon Numarası" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="form-group mt-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">🔒</span>
                  <input required type="password" className="bg-transparent border-none text-white outline-none w-full" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              <div className="form-group mt-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">🧰</span>
                  <select className="bg-transparent border-none text-[var(--muted)] outline-none w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="taksi">Taksi</option>
                    <option value="nakliye">Nakliye</option>
                    <option value="yol-yardim">Yol Yardım</option>
                    <option value="vip">VIP Taşıma</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[var(--yellow)] text-[var(--anthracite)] font-bold py-4 rounded-xl mt-6 hover:brightness-110 transition-all flex justify-center items-center gap-2">
                Devam Et →
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="booking-form-wrapper" style={{ width: "100%", maxWidth: "500px" }}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[var(--yellow)] rounded-full flex items-center justify-center text-[var(--anthracite)] text-3xl">
                🏛️
              </div>
            </div>
            <div className="form-title" style={{ textAlign: "center", fontSize: "2rem" }}>IBAN bilgini ekle</div>
            <div className="text-[var(--muted)] text-center text-sm mb-6">
              Kazançlarını alabilmen için IBAN bilgin gerekli.<br/>Bu ekranı kapatmadan önce IBAN'ını kaydet.
            </div>

            <form onSubmit={handleNextStep}>
              <div className="form-group bg-[var(--anthracite-2)] p-4 rounded-xl border border-[var(--border)]">
                <label className="text-xs text-[var(--muted)] mb-2 block">IBAN</label>
                <input 
                  required 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-[var(--yellow)] text-white text-lg outline-none pb-2" 
                  value={iban} 
                  onChange={(e) => setIban(e.target.value)} 
                />
                {iban.length !== 26 && <div className="text-red-500 text-xs mt-2">ⓘ IBAN TR ile başlamalı ve 26 karakter olmalı.</div>}
                
                <button type="submit" className="w-full bg-[var(--yellow)] text-[var(--anthracite)] font-bold py-3 rounded-lg mt-6 hover:brightness-110 transition-all">
                  Kaydet ve Devam Et
                </button>
              </div>

              <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded-lg p-4 flex gap-3 mt-6 mb-6">
                <div className="text-[var(--yellow)]">ⓘ</div>
                <div className="text-[var(--muted)] text-xs leading-relaxed">
                  Kart ödemeli yolculuklardan kazandığın para doğrudan senin IBAN'ına yatırılır. Bu yüzden giriş yapmadan önce IBAN'ını eklemen gerekiyor.
                </div>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="booking-form-wrapper" style={{ width: "100%", maxWidth: "500px" }}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 border-2 border-[var(--yellow)] rounded-full flex items-center justify-center text-[var(--yellow)] text-3xl">
                +
              </div>
            </div>
            <div className="form-title" style={{ textAlign: "center", fontSize: "2rem" }}>Araç Ekle</div>
            <div className="text-[var(--muted)] text-center text-sm mb-6">Sürüşe başlamak için araç bilgilerinizi girin</div>

            <form onSubmit={handleNextStep}>
              <div className="form-group mb-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">🎫</span>
                  <input required type="text" className="bg-transparent border-none text-white outline-none w-full uppercase" placeholder="Plaka *" value={plaka} onChange={(e) => setPlaka(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">🚘</span>
                  <input required type="text" className="bg-transparent border-none text-white outline-none w-full" placeholder="Marka (örn: Dacia)" value={marka} onChange={(e) => setMarka(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">🚙</span>
                  <input required type="text" className="bg-transparent border-none text-white outline-none w-full" placeholder="Model (örn: Lodgy)" value={model} onChange={(e) => setModel(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">📅</span>
                  <input required type="number" className="bg-transparent border-none text-white outline-none w-full" placeholder="Model Yılı (örn: 2022)" value={modelYili} onChange={(e) => setModelYili(e.target.value)} />
                </div>
              </div>
              <div className="form-group mb-6">
                <div className="flex bg-[var(--anthracite-2)] rounded-lg border border-[var(--border)] p-3 gap-3 items-center">
                  <span className="text-[var(--yellow)]">🎨</span>
                  <input required type="text" className="bg-transparent border-none text-white outline-none w-full" placeholder="Renk" value={renk} onChange={(e) => setRenk(e.target.value)} />
                </div>
              </div>

              <button type="submit" className="w-full bg-[var(--yellow)] text-[var(--anthracite)] font-bold py-4 rounded-xl hover:brightness-110 transition-all">
                Aracı Kaydet
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="booking-form-wrapper" style={{ width: "100%", maxWidth: "500px", padding: 0, backgroundColor: "transparent", border: "none" }}>
            <div className="bg-[var(--anthracite-2)] rounded-2xl p-6 border border-[var(--border)] mb-8">
              <h3 className="text-white text-xl font-medium mb-4">Hoş Geldin, {firstName || "Sürücü"}</h3>
              <p className="text-[var(--muted)] text-sm mb-4">Sürücü hesabınız başarıyla oluşturuldu. Ancak sürüş alabilmeniz için aşağıdaki belgeleri tamamlayıp yönetici onayından geçmeniz gerekmektedir.</p>
              <div className="bg-[rgba(245,197,24,0.1)] text-[var(--yellow)] px-4 py-2 rounded-lg text-sm font-medium border border-[rgba(245,197,24,0.2)]">
                Durum: Onay Bekliyor
              </div>
            </div>

            <h3 className="text-white text-lg font-medium mb-4 px-2">Sürücü Ortağı Gereklilikleri</h3>
            
            <div className="flex flex-col gap-2">
              <div className="bg-[var(--anthracite-2)] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--border)] transition-colors">
                <div>
                  <div className="text-white font-medium">Sürücü Belgesi - Ön Yüz</div>
                  <div className="text-[var(--orange)] text-sm font-medium">Eksik</div>
                </div>
                <div className="text-[var(--muted)]">›</div>
              </div>
              <div className="bg-[var(--anthracite-2)] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--border)] transition-colors">
                <div>
                  <div className="text-white font-medium">Adli Sicil Kaydı</div>
                  <div className="text-[var(--orange)] text-sm font-medium">Eksik</div>
                </div>
                <div className="text-[var(--muted)]">›</div>
              </div>
              <div className="bg-[var(--anthracite-2)] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--border)] transition-colors">
                <div>
                  <div className="text-white font-medium">Profil Fotoğrafı</div>
                  <div className="text-[var(--orange)] text-sm font-medium">Eksik</div>
                </div>
                <div className="text-[var(--muted)]">›</div>
              </div>
              <div className="bg-[var(--anthracite-2)] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--border)] transition-colors">
                <div>
                  <div className="text-white font-medium">Sürücü Kartı</div>
                  <div className="text-[var(--orange)] text-sm font-medium">Eksik</div>
                </div>
                <div className="text-[var(--muted)]">›</div>
              </div>
              <div className="bg-[var(--anthracite-2)] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-[var(--border)] transition-colors">
                <div>
                  <div className="text-white font-medium">Sağlık Raporu</div>
                  <div className="text-[var(--orange)] text-sm font-medium">Eksik</div>
                </div>
                <div className="text-[var(--muted)]">›</div>
              </div>
            </div>
          </div>
        )}

      </section>
      <Footer />
    </>
  );
}
