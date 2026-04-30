export default function Features() {
  return (
    <section className="section fade-up visible">
      <div className="section-header">
        <div className="section-tag">Neden DirectGo?</div>
        <h2 className="section-title">FARKIMIZ<br />BELLİ</h2>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <div className="feature-title">Sigortalı Sürücüler</div>
          <p className="feature-desc">Tüm sürücülerimiz kimlik doğrulamalı, sigortalı ve düzenli olarak denetlenmektedir.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <div className="feature-title">Anlık Bağlantı</div>
          <p className="feature-desc">Yapay zeka destekli eşleştirme sistemi ile en yakın sürücüyü saniyeler içinde bulur.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <div className="feature-title">Çoklu Ödeme</div>
          <p className="feature-desc">Nakit, kredi kartı, banka kartı ve dijital cüzdanlar ile ödeme yapabilirsiniz.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <div className="feature-title">Canlı Takip</div>
          <p className="feature-desc">Aracınızı haritada gerçek zamanlı takip edin. Sürücü bilgileri ve iletişim tek ekranda.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <div className="feature-title">Şeffaf Fiyat</div>
          <p className="feature-desc">Gizli ücret yok. Yolculuktan önce kesin fiyatınızı görün, onaylayın.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <div className="feature-title">7/24 Destek</div>
          <p className="feature-desc">Gün veya gece, her sorununuz için canlı destek hattımız her zaman aktif.</p>
        </div>
      </div>
    </section>
  );
}
