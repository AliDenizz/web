"use client";
import { useState, useEffect } from "react";

interface NakliyeOptionsProps {
  onTypeChange?: (type: string | null) => void;
}

export default function NakliyeOptions({ onTypeChange }: NakliyeOptionsProps) {
  const [nakliyeTuru, setNakliyeTuru] = useState<string | null>(null);
  const [aracTipi, setAracTipi] = useState("Orta");
  const [yuklenme, setYuklenme] = useState(0);
  const [indirilme, setIndirilme] = useState(0);
  const [yuklenmeAsansor, setYuklenmeAsansor] = useState(false);
  const [indirilmeAsansor, setIndirilmeAsansor] = useState(false);

  useEffect(() => {
    if (onTypeChange) onTypeChange(nakliyeTuru);
  }, [nakliyeTuru, onTypeChange]);

  if (!nakliyeTuru) {
    return (
      <div className="mt-4">
        <label className="form-label text-white text-lg mb-4">Hangi tür nakliye?</label>
        <div className="flex flex-col gap-3">
          <button onClick={() => setNakliyeTuru("evden-eve")} className="flex items-center gap-4 bg-[var(--anthracite-2)] border border-[var(--border)] p-4 rounded-lg text-left hover:border-[var(--yellow)] transition-colors">
            <div className="w-12 h-12 bg-[rgba(245,197,24,0.1)] text-[var(--yellow)] flex items-center justify-center rounded-md text-xl">🏠</div>
            <div className="flex-1">
              <div className="text-white font-semibold text-lg">Evden Eve Nakliyat</div>
              <div className="text-[var(--muted)] text-sm">Ev eşyası taşıma, kat & asansör bilgisiyle</div>
            </div>
            <div className="text-[var(--yellow)]">›</div>
          </button>
          
          <button onClick={() => setNakliyeTuru("yuk")} className="flex items-center gap-4 bg-[var(--anthracite-2)] border border-[var(--border)] p-4 rounded-lg text-left hover:border-[var(--yellow)] transition-colors">
            <div className="w-12 h-12 bg-[rgba(245,197,24,0.1)] text-[var(--yellow)] flex items-center justify-center rounded-md text-xl">🚚</div>
            <div className="flex-1">
              <div className="text-white font-semibold text-lg">Yük Nakliyesi</div>
              <div className="text-[var(--muted)] text-sm">Ticari yük, mobilya ve eşya taşımacılığı</div>
            </div>
            <div className="text-[var(--yellow)]">›</div>
          </button>

          <button onClick={() => setNakliyeTuru("kurye")} className="flex items-center gap-4 bg-[var(--anthracite-2)] border border-[var(--border)] p-4 rounded-lg text-left hover:border-[var(--yellow)] transition-colors">
            <div className="w-12 h-12 bg-[rgba(245,197,24,0.1)] text-[var(--yellow)] flex items-center justify-center rounded-md text-xl">🛵</div>
            <div className="flex-1">
              <div className="text-white font-semibold text-lg">Şehir İçi Kurye</div>
              <div className="text-[var(--muted)] text-sm">Hızlı paket ve belge teslimatı</div>
            </div>
            <div className="text-[var(--yellow)]">›</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setNakliyeTuru(null)} className="text-[var(--muted)] text-xl hover:text-white">←</button>
        <span className="text-[var(--yellow)] font-semibold text-lg">
          {nakliyeTuru === 'evden-eve' ? 'Evden Eve Nakliyat' : nakliyeTuru === 'yuk' ? 'Yük Nakliyesi' : 'Şehir İçi Kurye'}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        {["Küçük", "Orta", "Büyük"].map(tip => (
          <button 
            key={tip}
            onClick={() => setAracTipi(tip)}
            className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-lg border transition-colors ${aracTipi === tip ? 'border-[var(--yellow)] bg-[rgba(245,197,24,0.05)] text-[var(--yellow)]' : 'border-[var(--border)] bg-[var(--anthracite-2)] text-[var(--muted)]'}`}
          >
            <span className="text-2xl">{tip === 'Küçük' ? '🏍️' : tip === 'Orta' ? '🚐' : '🚛'}</span>
            <span className="text-sm">{tip}</span>
          </button>
        ))}
      </div>

      <div className="bg-[var(--anthracite-2)] border border-[var(--border)] rounded-lg p-4 mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[var(--muted)]">↑ Yüklenme</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[var(--anthracite)] rounded-md px-2 py-1">
              <button onClick={() => setYuklenme(Math.max(0, yuklenme - 1))} className="text-[var(--yellow)] px-2 text-lg">−</button>
              <span className="text-white w-4 text-center">{yuklenme}</span>
              <button onClick={() => setYuklenme(yuklenme + 1)} className="text-[var(--yellow)] px-2 text-lg">+</button>
            </div>
            <button 
              onClick={() => setYuklenmeAsansor(!yuklenmeAsansor)}
              className={`text-xs px-2 py-1.5 rounded-md border transition-colors ${yuklenmeAsansor ? 'bg-[var(--yellow)] border-[var(--yellow)] text-[var(--anthracite)] font-bold' : 'bg-transparent border-[var(--border)] text-[var(--muted)]'}`}
            >
              🏢 Asansör
            </button>
          </div>
        </div>
        
        <div className="h-[1px] w-full bg-[var(--border)]"></div>

        <div className="flex items-center justify-between">
          <span className="text-[var(--muted)]">↓ İndirilme</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[var(--anthracite)] rounded-md px-2 py-1">
              <button onClick={() => setIndirilme(Math.max(0, indirilme - 1))} className="text-[var(--yellow)] px-2 text-lg">−</button>
              <span className="text-white w-4 text-center">{indirilme}</span>
              <button onClick={() => setIndirilme(indirilme + 1)} className="text-[var(--yellow)] px-2 text-lg">+</button>
            </div>
            <button 
              onClick={() => setIndirilmeAsansor(!indirilmeAsansor)}
              className={`text-xs px-2 py-1.5 rounded-md border transition-colors ${indirilmeAsansor ? 'bg-[var(--yellow)] border-[var(--yellow)] text-[var(--anthracite)] font-bold' : 'bg-transparent border-[var(--border)] text-[var(--muted)]'}`}
            >
              🏢 Asansör
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
