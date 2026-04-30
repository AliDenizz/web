"use client";

export default function Services() {
  const openBooking = (service: string) => {
    const bookingSection = document.getElementById("rezervasyon");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
      // In a real app we might set the service state here
    }
  };

  return (
    <section className="section" id="hizmetler">
      <div className="section-header fade-up visible">
        <div className="section-tag">Hizmetlerimiz</div>
        <h2 className="section-title">NE İSTERSEN,<br />NE ZAMAN İSTERSEN</h2>
      </div>

      <div className="services-grid fade-up visible">
        <div className="service-card" onClick={() => openBooking('taksi')}>
          <div className="service-num">01</div>
          <div className="service-icon icon-taxi">🚖</div>
          <div className="service-name">TAKSİ</div>
          <p className="service-desc">Profesyonel sürücüler, klimali araçlar. Şehir içi her noktaya hızlı ve güvenli ulaşım. İstanbul, Ankara, İzmir ve daha fazlası.</p>
          <div className="service-arrow">→</div>
        </div>

        <div className="service-card" onClick={() => openBooking('nakliye')}>
          <div className="service-num">02</div>
          <div className="service-icon icon-move">📦</div>
          <div className="service-name">NAKLİYE</div>
          <p className="service-desc">Ev, ofis veya eşya taşımacılığı için deneyimli ekip ve geniş araç filosu. Sigortalı taşıma garantisi ile huzurlu bir taşınma deneyimi.</p>
          <div className="service-arrow">→</div>
        </div>

        <div className="service-card" onClick={() => openBooking('yol-yardim')}>
          <div className="service-num">03</div>
          <div className="service-icon icon-road">🔧</div>
          <div className="service-name">YOL YARDIM</div>
          <p className="service-desc">Arıza, lastik patlaması veya yakıt bitmesi durumlarında 30 dakikada yanınızdayız. 7/24 destek, çekici ve teknik yardım.</p>
          <div className="service-arrow">→</div>
        </div>

        <div className="service-card" onClick={() => openBooking('vip')}>
          <div className="service-num">04</div>
          <div className="service-icon icon-vip">✦</div>
          <div className="service-name">VIP TAŞIMA</div>
          <p className="service-desc">Lüks araçlar, özel şoförler. Havalimanı karşılamaları, kurumsal toplantılar ve özel etkinlikler için premium ulaşım deneyimi.</p>
          <div className="service-arrow">→</div>
        </div>
      </div>
    </section>
  );
}
