"use client";
import { useState } from "react";

export default function YolYardimOptions() {
  const [hizmetTuru, setHizmetTuru] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const hizmetler = [
    { id: "lastik", ad: "Mobil Lastik", icon: "🛞" },
    { id: "anahtar", ad: "Mobil Anahtar", icon: "🔑" },
    { id: "cekici", ad: "Oto Çekici", icon: "🚜" },
    { id: "sarj", ad: "Mobil Şarj İstasyonu", icon: "⚡" }
  ];

  return (
    <div className="mt-4">
      <label className="flex items-center gap-2 form-label text-[var(--muted)] mb-3">
        <span className="text-[var(--yellow)]">⚠️</span> Hizmet türü
      </label>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {hizmetler.map(hizmet => (
          <button
            key={hizmet.id}
            onClick={() => setHizmetTuru(hizmet.id)}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${hizmetTuru === hizmet.id ? 'border-[var(--yellow)] text-[var(--yellow)] bg-[rgba(245,197,24,0.05)]' : 'border-[var(--border)] text-[var(--muted)] bg-[var(--anthracite-2)]'}`}
          >
            <span className="text-xl">{hizmet.icon}</span>
            <span className="text-sm font-medium">{hizmet.ad}</span>
          </button>
        ))}
      </div>

      <div className="bg-[var(--anthracite-2)] border border-[var(--border)] rounded-lg p-3">
        <textarea 
          placeholder="Not ekleyin (opsiyonel)" 
          className="w-full bg-transparent border-none text-[var(--white)] outline-none resize-none text-sm"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
