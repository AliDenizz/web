import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="section" style={{ paddingTop: "12rem" }}>
        <div className="section-tag">DirectGo Hikayesi</div>
        <h1 className="section-title">ULAŞIMDA YENİ<br />NESİL TEKNOLOJİ</h1>
        
        <div style={{ marginTop: "4rem", maxWidth: "800px", color: "var(--muted)", fontSize: "1.1rem", lineHeight: "1.8" }}>
          <p style={{ marginBottom: "2rem" }}>
            <strong style={{ color: "var(--white)" }}>DirectGo</strong>, ulaşım sektöründe dijital dönüşümü öncülemek ve kullanıcılarımıza en güvenli, en hızlı ve en ekonomik ulaşım çözümlerini sunmak amacıyla Antalya'da kurulmuş bir teknoloji şirketidir.
          </p>
          <p style={{ marginBottom: "2rem" }}>
            Geleneksel taksi hizmetlerini modern teknolojiyle birleştirerek başladığımız yolculuğumuza; nakliye, yol yardım ve VIP transfer gibi geniş bir yelpazede hizmet ekleyerek devam ediyoruz. Amacımız, sadece bir araç çağırma platformu olmak değil, şehir içi ve şehirler arası tüm lojistik ihtiyaçlarınızda güvenebileceğiniz bir yol arkadaşı olmaktır.
          </p>
          
          <div className="features-grid" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
            <div className="feature-card">
              <div className="feature-title">Vizyonumuz</div>
              <div className="feature-desc">Türkiye'nin her noktasında ulaşımı tek bir dokunuşla, herkes için erişilebilir ve güvenli kılmak.</div>
            </div>
            <div className="feature-card">
              <div className="feature-title">Misyonumuz</div>
              <div className="feature-desc">İleri teknoloji algoritmalarımızla sürücü ve yolcuları en verimli şekilde buluşturarak zaman ve maliyet tasarrufu sağlamak.</div>
            </div>
          </div>

          <h2 className="font-bebas text-4xl text-white mb-6 tracking-widest">NEDEN DIRECTGO?</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "1rem", display: "flex", gap: "12px" }}>
              <span style={{ color: "var(--yellow)" }}>✔</span>
              <span>7/24 Kesintisiz Hizmet ve Canlı Destek</span>
            </li>
            <li style={{ marginBottom: "1rem", display: "flex", gap: "12px" }}>
              <span style={{ color: "var(--yellow)" }}>✔</span>
              <span>Tamamen Yerli ve Milli Yazılım Altyapısı</span>
            </li>
            <li style={{ marginBottom: "1rem", display: "flex", gap: "12px" }}>
              <span style={{ color: "var(--yellow)" }}>✔</span>
              <span>Şeffaf Fiyatlandırma ve Güvenli Ödeme Seçenekleri</span>
            </li>
            <li style={{ marginBottom: "1rem", display: "flex", gap: "12px" }}>
              <span style={{ color: "var(--yellow)" }}>✔</span>
              <span>Denetlenmiş ve Eğitimli Sürücü Kadrosu</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
