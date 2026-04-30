import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KvkkPage() {
  return (
    <main>
      <Navbar />
      <div className="section" style={{ paddingTop: "12rem" }}>
        <div className="section-tag">Yasal Bilgilendirme</div>
        <h1 className="section-title">KVKK AYDINLATMA<br />METNİ</h1>
        
        <div style={{ marginTop: "4rem", maxWidth: "900px", color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.8" }}>
          <p className="mb-6">
            <strong style={{ color: "var(--white)" }}>DirectGo Teknoloji A.Ş.</strong> ("Şirket") olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Şirket olarak ürün ve hizmetlerimizden faydalanan kişiler dahil, Şirket ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")'na uygun olarak işlenerek, muhafaza edilmesine büyük önem vermekteyiz.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">1. Veri Sorumlusu</h2>
          <p className="mb-4">
            KVKK uyarınca, kişisel verileriniz; veri sorumlusu olarak DirectGo Teknoloji A.Ş. tarafından aşağıda açıklanan kapsamda işlenebilecektir.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">2. Kişisel Verilerin İşlenme Amacı</h2>
          <p className="mb-4">
            Toplanan kişisel verileriniz, Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, ürün ve hizmetlerimizin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi, Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini amaçlarıyla işlenmektedir.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
          <p className="mb-4">
            Toplanan kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda; iş ortaklarımıza, tedarikçilerimize, hissedarlarımıza, kanunen yetkili kamu kurumlarına ve özel kişilere, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
          </p>

          <h2 className="font-bebas text-2xl text-white mt-10 mb-4 tracking-wider">4. Kişisel Veri Sahibinin Hakları</h2>
          <p className="mb-4">
            Kişisel veri sahibi olarak KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahip olduğunuzu bildiririz:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
            <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
            <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.</li>
          </ul>

          <div style={{ marginTop: "4rem", padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px", border: "1px solid var(--border)" }}>
            <p style={{ fontStyle: "italic", fontSize: "0.85rem" }}>
              Bu aydınlatma metni en son 27 Nisan 2026 tarihinde güncellenmiştir. Sorularınız için <strong>kvkk@directgo.com.tr</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
