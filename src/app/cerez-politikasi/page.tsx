import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <main>
      <Navbar />
      <div className="section" style={{ paddingTop: "12rem" }}>
        <div className="section-tag">Yasal Bilgilendirme</div>
        <h1 className="section-title">ÇEREZ<br />POLİTİKASI</h1>
        
        <div style={{ marginTop: "4rem", maxWidth: "900px", color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.8" }}>
          <p className="mb-6">
            DirectGo olarak, web sitemizi ziyaret ettiğinizde deneyiminizi geliştirmek için çerezler kullanıyoruz.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Çerez Nedir?</h2>
          <p className="mb-4">
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Hangi Çerezleri Kullanıyoruz?</h2>
          <ul className="list-disc pl-6 space-y-4 mb-6">
            <li><strong>Zorunlu Çerezler:</strong> Sitemizin temel fonksiyonlarının çalışması için gereklidir (örneğin giriş yapma).</li>
            <li><strong>Performans Çerezleri:</strong> Ziyaretçilerimizin siteyi nasıl kullandığını anlamamıza yardımcı olur.</li>
            <li><strong>Fonksiyonel Çerezler:</strong> Dil tercihlerinizi veya konum bilgilerinizi hatırlar.</li>
          </ul>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
          <p className="mb-4">
            Tarayıcı ayarlarınız üzerinden çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz. Ancak çerezleri devre dışı bırakmak sitemizdeki bazı özelliklerin çalışmasını engelleyebilir.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
