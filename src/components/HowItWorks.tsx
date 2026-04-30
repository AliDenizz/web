export default function HowItWorks() {
  return (
    <section className="section" style={{ background: 'var(--anthracite-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} id="nasil-calisir">
      <div className="section-header fade-up visible">
        <div className="section-tag">Nasıl Çalışır</div>
        <h2 className="section-title">4 ADIMDA<br />YOLCULUĞUNA BAŞLA</h2>
      </div>

      <div className="steps-grid fade-up visible">
        <div className="step-item">
          <div className="step-num">01</div>
          <div className="step-title">KONUMUNU BELİRLE</div>
          <p className="step-desc">Uygulamayı aç, mevcut konumun otomatik algılanır ya da adres gir.</p>
        </div>
        <div className="step-item">
          <div className="step-num">02</div>
          <div className="step-title">HİZMET SEÇ</div>
          <p className="step-desc">Taksi, nakliye, yol yardım veya VIP — ihtiyacına göre seç.</p>
        </div>
        <div className="step-item">
          <div className="step-num">03</div>
          <div className="step-title">ONAYLA & ÖDE</div>
          <p className="step-desc">Fiyatı gör, onayla. Nakit, kart veya dijital ödeme seçenekleri.</p>
        </div>
        <div className="step-item">
          <div className="step-num">04</div>
          <div className="step-title">TAKİP ET</div>
          <p className="step-desc">Aracı canlı haritada izle, sürücünle iletişime geç, güvenle ulaş.</p>
        </div>
      </div>
    </section>
  );
}
