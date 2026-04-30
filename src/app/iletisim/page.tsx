import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="section" style={{ paddingTop: "12rem" }}>
        <div className="section-tag">Bize Ulaşın</div>
        <h1 className="section-title">HER ZAMAN<br />YANINIZDAYIZ</h1>
        
        <div className="booking-inner" style={{ marginTop: "4rem", gap: "4rem" }}>
          <div className="fade-up visible">
            <h2 className="font-bebas text-3xl text-white mb-6 tracking-widest">İLETİŞİM BİLGİLERİ</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[rgba(245,197,24,0.1)] rounded flex items-center justify-center flex-shrink-0 text-xl">📍</div>
                <div>
                  <div className="text-white font-bold mb-1">Genel Merkez</div>
                  <div className="text-muted text-sm leading-relaxed">
                    Muratpaşa, Teknoloji Plaza Kat:4<br />
                    Antalya, Türkiye
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[rgba(245,197,24,0.1)] rounded flex items-center justify-center flex-shrink-0 text-xl">📞</div>
                <div>
                  <div className="text-white font-bold mb-1">Müşteri Hizmetleri</div>
                  <div className="text-muted text-sm">0850 XXX XX XX</div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[rgba(245,197,24,0.1)] rounded flex items-center justify-center flex-shrink-0 text-xl">📧</div>
                <div>
                  <div className="text-white font-bold mb-1">E-posta</div>
                  <div className="text-muted text-sm">destek@directgo.com.tr</div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 border border-[var(--border)] bg-[var(--anthracite-2)] rounded">
              <h3 className="text-[var(--yellow)] font-bebas text-xl mb-2 tracking-widest">KURUMSAL İŞ BİRLİĞİ</h3>
              <p className="text-xs text-muted leading-relaxed">
                Şirketiniz için özel ulaşım çözümleri ve filo yönetimi hakkında bilgi almak için kurumsal@directgo.com.tr adresinden bize ulaşabilirsiniz.
              </p>
            </div>
          </div>

          <div className="booking-form-wrapper">
            <div className="form-title">İLETİŞİM FORMU</div>
            <div className="form-subtitle">// Mesajınızı bize iletin</div>
            
            <div className="form-group">
              <label className="form-label">Ad Soyad</label>
              <input type="text" className="form-input" placeholder="Adınız Soyadınız" />
            </div>
            <div className="form-group">
              <label className="form-label">E-posta</label>
              <input type="email" className="form-input" placeholder="e-posta@adresiniz.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Konu</label>
              <select className="form-select">
                <option>Destek Talebi</option>
                <option>Sürücü Başvurusu Hakkında</option>
                <option>Şikayet / Öneri</option>
                <option>Diğer</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mesajınız</label>
              <textarea className="form-input" rows={4} style={{ resize: "none" }} placeholder="Mesajınızı buraya yazın..."></textarea>
            </div>
            
            <button className="btn-book">GÖNDER</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
