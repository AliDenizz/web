export default function AppSection() {
  return (
    <section className="app-section" id="uygulama">
      <div className="app-glow"></div>

      <div className="app-content fade-up visible">
        <div className="section-tag">Mobil Uygulama</div>
        <h2 className="section-title" style={{ marginBottom: "1rem" }}>CEBİNDE<br />TAŞI</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "400px", marginBottom: "1rem" }}>
          iOS ve Android uygulamalarımızı indir. Canlı harita, anlık bildirimler, kayıtlı adresler ve daha fazlası ile ulaşımını kolaylaştır.
        </p>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "2rem", color: "var(--yellow)", letterSpacing: "2px" }}>50K+</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px" }}>İndirme</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "2rem", color: "var(--yellow)", letterSpacing: "2px" }}>4.9★</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px" }}>App Store</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "2rem", color: "var(--yellow)", letterSpacing: "2px" }}>4.8★</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Google Play</div>
          </div>
        </div>

        <div className="app-stores">
          <a href="#" className="store-btn">
            <span className="store-btn-icon">🍎</span>
            <div className="store-btn-text">
              <small>App Store'dan indir</small>
              <strong>iPhone & iPad</strong>
            </div>
          </a>
          <a href="#" className="store-btn">
            <span className="store-btn-icon">▶</span>
            <div className="store-btn-text">
              <small>Google Play'den indir</small>
              <strong>Android</strong>
            </div>
          </a>
        </div>
      </div>

      {/* EXACT MOCKUP FROM SCREENSHOT */}
      <div className="phone-mockup">
        <div className="phone-notch"></div>
        <div className="phone-screen bg-[#1a1c1e] p-5 pt-12 flex flex-col h-full font-sans relative">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 bg-[var(--orange)] rounded-full animate-pulse"></span>
            <div className="text-[var(--yellow)] font-[family-name:var(--font-bebas-neue)] text-lg tracking-[3px]">DirectGo</div>
          </div>
          <div className="text-[#648493] text-xs font-mono mb-4">Sürücü atandı · 2.3 km</div>
          
          {/* Map Grid Area */}
          <div className="flex-1 relative mb-4 mt-2 overflow-hidden rounded-xl border border-white/5 bg-[#16181a]">
            <svg className="w-full h-full" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
              {/* Base Grid Pattern */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.05"/>
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Stylized City Roads */}
              <g stroke="white" strokeWidth="1.5" opacity="0.1" fill="none">
                <path d="M0 80 L200 80 M0 160 L200 160 M0 240 L200 240" />
                <path d="M60 0 L60 300 M140 0 L140 300" />
                <path d="M0 120 Q100 120 200 220" strokeDasharray="4 4" />
              </g>
              
              {/* Animated Route Path */}
              <path 
                d="M60 210 L140 95" 
                stroke="var(--yellow)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none" 
                strokeDasharray="200"
                strokeDashoffset="0"
                className="animate-[dash_3s_linear_infinite]"
                filter="url(#glow)"
              />

              {/* Pickup Marker (Yellow) */}
              <circle cx="60" cy="210" r="6" fill="#f5c518" filter="url(#glow)" />
              <circle cx="60" cy="210" r="10" fill="none" stroke="#f5c518" strokeWidth="1" opacity="0.3" />

              {/* Dropoff Marker (Orange) */}
              <g transform="translate(140, 95)">
                <circle cx="0" cy="0" r="15" fill="#ff6b2b" opacity="0.1">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="8" fill="#ff6b2b" filter="url(#glow)" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#ff6b2b" strokeWidth="1" opacity="0.4" />
              </g>
            </svg>
            
            {/* Map Labels */}
            <div className="absolute top-2 left-2 bg-[#1a1c1e]/60 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] text-white/40 uppercase tracking-tighter">Kadıköy, İstanbul</div>
          </div>

          {/* Bottom Card */}
          <div className="bg-[#1f2225] rounded-2xl p-4 border border-[#2d3135] shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#648493] text-xs">Sürücü</span>
              <span className="text-white text-sm font-medium">Ahmet K. ★4.9</span>
            </div>
            <div className="h-[1px] bg-[#2d3135] w-full mb-3"></div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#648493] text-xs">Araç</span>
              <span className="text-white text-sm">34 AKA 034</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#648493] text-xs">Tahmini Varış</span>
              <span className="text-[#f5c518] font-bold text-sm">4 dk</span>
            </div>
            
            <button className="w-full bg-[#f5c518] text-[#1a1c1e] font-bold py-3 rounded-lg text-sm tracking-wider">
              SÜRÜCÜYÜ ARA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
