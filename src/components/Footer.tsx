export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo">
            <span className="logo-dot"></span>DirectGo
          </a>
          <p className="footer-desc" style={{ marginTop: "1rem" }}>
            Antalya merkezli ulaşım teknolojisi şirketi. Taksi, nakliye, yol yardım ve VIP taşımacılıkta güvenilir çözüm ortağınız.
          </p>
          <div style={{ marginTop: "1.5rem", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
            ☎ 0850 XXX XX XX
          </div>
        </div>

        <div>
          <div className="footer-col-title">Hizmetler</div>
          <ul className="footer-links">
            <li><a href="/#hizmetler">Taksi</a></li>
            <li><a href="/#hizmetler">Nakliye</a></li>
            <li><a href="/#hizmetler">Yol Yardım</a></li>
            <li><a href="/#hizmetler">VIP Taşıma</a></li>
            <li><a href="#">Kurumsal</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Şirket</div>
          <ul className="footer-links">
            <li><a href="/hakkimizda">Hakkımızda</a></li>
            <li><a href="/register?role=driver">Sürücü Ol</a></li>
            <li><a href="#">Kariyer</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="/iletisim">İletişim</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Yasal</div>
          <ul className="footer-links">
            <li><a href="/gizlilik-politikasi">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-kosullari">Kullanım Koşulları</a></li>
            <li><a href="/cerez-politikasi">Çerez Politikası</a></li>
            <li><a href="/kvkk">KVKK Aydınlatma Metni</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2026 DirectGo Teknoloji A.Ş. — Tüm hakları saklıdır.</div>
        <div className="footer-badges">
          <div className="badge">ISO 9001</div>
          <div className="badge">SSL Secured</div>
          <div className="badge">KVKK Uyumlu</div>
        </div>
      </div>
    </footer>
  );
}
