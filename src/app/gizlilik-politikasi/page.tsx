import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <div className="section" style={{ paddingTop: "12rem" }}>
        <div className="section-tag">Güvenliğiniz Önceliğimiz</div>
        <h1 className="section-title">GİZLİLİK<br />POLİTİKASI</h1>
        
        <div style={{ marginTop: "4rem", maxWidth: "900px", color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.8" }}>
          <p className="mb-6">
            DirectGo olarak, kullanıcılarımızın gizliliğine saygı duyuyoruz. Bu Gizlilik Politikası, web sitemizi ve mobil uygulamalarımızı kullandığınızda bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Toplanan Bilgiler</h2>
          <p className="mb-4">
            Hizmetlerimizi kullandığınızda aşağıdaki bilgileri toplayabiliriz:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Konum Bilgileri:</strong> Size en yakın sürücüyü bulmak ve yolculuk takibi için GPS verilerinizi kullanırız.</li>
            <li><strong>İletişim Bilgileri:</strong> Ad, e-posta ve telefon numaranız hesap yönetimi için gereklidir.</li>
            <li><strong>Ödeme Bilgileri:</strong> Kart bilgileriniz tarafımızca saklanmaz, iyzico güvencesiyle işlenir.</li>
            <li><strong>Cihaz Bilgileri:</strong> Uygulama performansını iyileştirmek için IP adresi ve cihaz modeli gibi teknik veriler.</li>
          </ul>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Veri Güvenliği</h2>
          <p className="mb-4">
            Verileriniz SSL sertifikalı sunucularımızda şifrelenmiş olarak saklanır. Sürücülerimiz sadece yolculuk esnasında gerekli olan sınırlı bilgilere (ad ve konum) erişebilir.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Çerezler (Cookies)</h2>
          <p className="mb-4">
            Web sitemizde kullanıcı deneyimini artırmak amacıyla çerezler kullanılmaktadır. Çerez ayarlarınızı tarayıcınız üzerinden dilediğiniz zaman değiştirebilirsiniz.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
