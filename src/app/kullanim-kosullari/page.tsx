import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <div className="section" style={{ paddingTop: "12rem" }}>
        <div className="section-tag">Yasal Sözleşme</div>
        <h1 className="section-title">KULLANIM<br />KOŞULLARI</h1>
        
        <div style={{ marginTop: "4rem", maxWidth: "900px", color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.8" }}>
          <p className="mb-6">
            Lütfen DirectGo platformunu kullanmadan önce bu kullanım koşullarını dikkatlice okuyunuz. Sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Hizmet Kapsamı</h2>
          <p className="mb-4">
            DirectGo, yolcularla sürücüleri buluşturan bir teknoloji platformudur. DirectGo, taşıma hizmetini bizzat vermez; lisanslı sürücülerin taleplerinizi karşılamasını sağlar.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Kullanıcı Sorumlulukları</h2>
          <p className="mb-4">
            Kullanıcılar, kayıt sırasında verdikleri bilgilerin doğruluğundan sorumludur. Hesap güvenliği kullanıcıya aittir. Hizmet alırken yasalara ve genel ahlak kurallarına uygun davranılması zorunludur.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">İptal ve İade</h2>
          <p className="mb-4">
            Sürücü atandıktan sonra yapılan iptallerde, platform politikasına göre belirli bir iptal ücreti yansıtılabilir. Bu ücretler uygulama üzerinden şeffaf bir şekilde paylaşılır.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">Değişiklikler</h2>
          <p className="mb-4">
            DirectGo, bu koşulları dilediği zaman güncelleme hakkını saklı tutar. Güncel koşullar web sitesinde yayınlandığı an itibarıyla yürürlüğe girer.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
