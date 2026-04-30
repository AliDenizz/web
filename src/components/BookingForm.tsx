"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import dynamic from "next/dynamic";
import NakliyeOptions from "./booking/NakliyeOptions";
import YolYardimOptions from "./booking/YolYardimOptions";

// Dynamically import map to avoid SSR issues with Leaflet
const MapSelector = dynamic(() => import("./booking/MapSelector"), { ssr: false });

const DriverCard = ({ driver }: { driver: any }) => {
  if (!driver) return null;
  return (
    <div className="w-full bg-[var(--anthracite-2)] p-4 rounded border border-[var(--border)] mt-4 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="text-muted text-xs uppercase">Sürücü</span>
        <span className="text-white text-sm font-medium">{driver.first_name || 'Mehmet'} ★{driver.rating || '4.8'}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted text-xs uppercase">Araç</span>
        <span className="text-[var(--yellow)] text-sm font-bold">{driver.vehicle?.plate || '34 ABC 123'}</span>
      </div>
    </div>
  );
};

export default function BookingForm() {
  const [service, setService] = useState("taksi");
  const [subService, setSubService] = useState<string | null>(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [user, setUser] = useState<{ id: number; first_name: string; role?: string; approval_status?: string; vehicle?: any; service_category?: string } | null>(null);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [pickupCoords, setPickupCoords] = useState<{lat: number, lng: number} | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<{lat: number, lng: number} | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD'>('CASH');
  
  // Timing State
  const [timeType, setTimeType] = useState<'now' | 'scheduled'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    // Kurye harici nakliye ise sadece rezervasyon
    if (service === 'nakliye' && subService !== 'kurye' && subService !== null) {
      setTimeType('scheduled');
    }
  }, [service, subService]);

  useEffect(() => {
    // Check if user is logged in
    axios.get("/api/auth/me")
      .then((res) => {
        setUser(res.data);
        // If passenger, check for active booking
        if (res.data && res.data.role !== 'driver') {
          return axios.get("/api/bookings/request");
        }
      })
      .then((res) => {
        if (res && res.data) {
          setActiveBooking(res.data);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Poll for status updates if there's a pending booking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeBooking && activeBooking.status === 'PENDING') {
      interval = setInterval(() => {
        axios.get("/api/bookings/request")
          .then((res) => {
            if (res.data) {
              setActiveBooking(res.data);
            }
          })
          .catch(console.error);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeBooking]);

  const handleBooking = async () => {
    console.log("Booking requested with:", { pickup, dropoff, pickupCoords, dropoffCoords, service });
    
    if (!pickupCoords) {
      alert("Lütfen haritadan bir alış noktası seçin.");
      return;
    }

    setBookingLoading(true);
    try {
      const payload = {
        pickup_lat: pickupCoords.lat,
        pickup_lng: pickupCoords.lng,
        pickup_address: pickup,
        dropoff_lat: dropoffCoords?.lat || pickupCoords.lat,
        dropoff_lng: dropoffCoords?.lng || pickupCoords.lng,
        dropoff_address: dropoff || "Belirtilmedi",
        service_type_code: service === 'taksi' ? 'TAKSI_STANDARD' : 
                          service === 'nakliye' ? 'NAKLIYE_LIGHT' : 
                          service === 'yol-yardim' ? 'ROAD_ASSIST' : 'VIP_STANDARD',
        payment_method: paymentMethod,
        is_scheduled: timeType === 'scheduled',
        scheduled_date: timeType === 'scheduled' ? scheduledDate : null,
        scheduled_time: timeType === 'scheduled' ? scheduledTime : null
      };
      
      const response = await axios.post("/api/bookings/request", payload);

      if (response && response.data) {
        setActiveBooking(response.data);
      } else {
        alert("Sunucudan yanıt alınamadı.");
      }
    } catch (err: any) {
      const msg = (err && err.response && err.response.data && (err.response.data.error || err.response.data.detail)) || (err && err.message) || "Bilinmeyen bir hata oluştu";
      alert("Rezervasyon Hatası: " + msg);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!activeBooking) return;
    try {
      const res = await axios.post(`/api/bookings/${activeBooking.id}/cancel`);
      setActiveBooking(res.data);
    } catch (err: any) {
      alert("İptal işlemi başarısız.");
    }
  };

  const handleRate = async (stars: number) => {
    if (!activeBooking) return;
    try {
      const res = await axios.post(`/api/bookings/${activeBooking.id}/rate`, { stars });
      setActiveBooking(res.data);
      // Wait a bit, then redirect or clear
      setTimeout(() => {
        setActiveBooking(null);
      }, 2500);
    } catch (err: any) {
      alert("Puanlama kaydedilemedi.");
    }
  };

  const [estimate, setEstimate] = useState<{ estimated_fare: string; distance_km: number; duration_min: number } | null>(null);
  const [estimateLoading, setEstimateLoading] = useState(false);

  const fetchEstimate = async (pCoords: {lat:number,lng:number}, dCoords: {lat:number,lng:number}) => {
    setEstimateLoading(true);
    try {
      const res = await axios.post("/api/bookings/estimate", {
        pickup_lat: pCoords.lat,
        pickup_lng: pCoords.lng,
        dropoff_lat: dCoords.lat,
        dropoff_lng: dCoords.lng,
        service_type_code: service === 'taksi' ? 'TAKSI_STANDARD' :
                           service === 'nakliye' ? 'NAKLIYE_LIGHT' :
                           service === 'yol-yardim' ? 'ROAD_ASSIST' : 'VIP_STANDARD',
      });
      setEstimate(res.data);
    } catch {
      setEstimate(null);
    } finally {
      setEstimateLoading(false);
    }
  };

  const handleLocationSelect = (locs: { pickup: {lat: number, lng: number} | null, dropoff: {lat: number, lng: number} | null }) => {
    let currentPickup = pickupCoords;
    let currentDropoff = dropoffCoords;

    if (locs.pickup) {
      setPickupCoords(locs.pickup);
      setPickup(`${locs.pickup.lat.toFixed(4)}, ${locs.pickup.lng.toFixed(4)}`);
      currentPickup = locs.pickup;
    } else if (locs.pickup === null) {
      setPickupCoords(null);
      setPickup("");
      currentPickup = null;
    }
    
    if (locs.dropoff) {
      setDropoffCoords(locs.dropoff);
      setDropoff(`${locs.dropoff.lat.toFixed(4)}, ${locs.dropoff.lng.toFixed(4)}`);
      currentDropoff = locs.dropoff;
    } else if (locs.dropoff === null) {
      setDropoffCoords(null);
      setDropoff("");
      currentDropoff = null;
    }

    if (currentPickup && currentDropoff) {
      fetchEstimate(currentPickup, currentDropoff);
    } else {
      setEstimate(null);
    }
  };

  return (
    <section className="booking-section" id="rezervasyon">
      <div className="booking-inner">
        <div className="fade-up visible">
          <div className="section-tag">Online Rezervasyon</div>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>HEMEN<br />REZERVASYON<br />YAP</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Web üzerinden hızlı rezervasyon yap. Sürücün atandıktan sonra SMS ve e-posta ile bildirim alacaksın. API entegrasyonu sayesinde gerçek zamanlı fiyatlandırma.
          </p>

          <div className="features-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: 0 }}>
            <div className="feature-card">
              <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>🔒</div>
              <div className="feature-title" style={{ fontSize: "0.9rem" }}>Güvenli Ödeme</div>
              <div className="feature-desc" style={{ fontSize: "0.8rem" }}>SSL şifrelemeli ödeme</div>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>📍</div>
              <div className="feature-title" style={{ fontSize: "0.9rem" }}>Canlı Takip</div>
              <div className="feature-desc" style={{ fontSize: "0.8rem" }}>Aracını haritada izle</div>
            </div>
          </div>
        </div>

        <div className="booking-form-wrapper fade-up visible relative" id="bookingForm">
          
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <div className="text-[var(--yellow)] animate-pulse">Yükleniyor...</div>
            </div>
          ) : !user ? (
            /* AUTHENTICATION OVERLAY */
            <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <div className="w-16 h-16 bg-[rgba(245,197,24,0.1)] rounded-full flex items-center justify-center mb-4 border border-[rgba(245,197,24,0.2)]">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-bebas text-3xl tracking-widest text-white mb-2">GİRİŞ YAPIN</h3>
              <p className="text-[var(--muted)] text-sm mb-6 max-w-xs">
                Hizmet çağırmak veya profilinizi yönetmek için lütfen hesabınıza giriş yapın.
              </p>
              <Link href="/login" className="btn-book text-center w-full max-w-[240px] m-0 no-underline">
                &#9654; GİRİŞ YAP
              </Link>
            </div>
          ) : user.role === 'driver' ? (
            /* DRIVER VIEW (unchanged) */
            <div className="flex flex-col items-center justify-center p-6 min-h-[500px]">
              <div className="w-20 h-20 bg-[var(--anthracite-2)] rounded-full flex items-center justify-center mb-4 border-2 border-[var(--yellow)] overflow-hidden">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="font-bebas text-3xl tracking-widest text-white mb-1">{user.first_name} {user.last_name}</h3>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[var(--yellow)] text-xs font-bold tracking-widest uppercase bg-[var(--yellow)]/10 px-2 py-0.5 rounded">★ 4.9</span>
                <span className="text-muted text-[10px] tracking-widest uppercase">Puan</span>
              </div>

              <div className="w-full space-y-3 mb-8">
                <div className="flex justify-between items-center bg-[var(--anthracite-2)] p-3 rounded border border-[var(--border)]">
                  <span className="text-muted text-xs uppercase tracking-wider">Durum</span>
                  <span className={`text-xs font-bold ${user.approval_status === 'APPROVED' ? 'text-green-500' : 'text-[var(--yellow)] animate-pulse'}`}>
                    {user.approval_status === 'APPROVED' ? 'ONAYLANDI' : 'ONAY BEKLENİYOR'}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-[var(--anthracite-2)] p-3 rounded border border-[var(--border)]">
                  <span className="text-muted text-xs uppercase tracking-wider">Hizmet Alanı</span>
                  <span className="text-white text-xs font-medium uppercase tracking-wider">{user.service_category || 'Taksi'}</span>
                </div>
                <div className="flex justify-between items-center bg-[var(--anthracite-2)] p-3 rounded border border-[var(--border)]">
                  <span className="text-muted text-xs uppercase tracking-wider">Araç</span>
                  <span className="text-white text-xs font-medium">{user.vehicle?.plate || '34 ABC 123'}</span>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <Link href="/driver" className="btn-book text-center flex-1 m-0 no-underline text-xs py-3">
                  PANELİ AÇ
                </Link>
                <button className="btn-secondary flex-1 m-0 text-xs py-3 rounded-sm font-bebas tracking-widest hover:bg-white/5 transition-colors border border-[var(--border)]">
                  AYARLAR
                </button>
              </div>
            </div>
          ) : activeBooking ? (
            /* ACTIVE BOOKING VIEW */
            <div className="flex flex-col p-6 min-h-[500px]">
              <div className="form-title">
                {activeBooking.status === 'COMPLETED' ? 'YOLCULUK BİTTİ' : 
                 activeBooking.status === 'CANCELLED' ? 'İPTAL EDİLDİ' : 
                 'REZERVASYON DURUMU'}
              </div>
              <div className="form-subtitle">// Referans: #{activeBooking.id}</div>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                {activeBooking.status === 'PENDING' ? (
                  <>
                    <div className="w-16 h-16 border-4 border-[var(--yellow)] border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h3 className="font-bebas text-3xl text-white mb-2 tracking-widest">SÜRÜCÜ ARANIYOR</h3>
                    <p className="text-muted text-sm max-w-xs">En yakın müsait sürücümüz aranıyor, lütfen bekleyin...</p>
                  </>
                ) : activeBooking.status === 'ACCEPTED' ? (
                  <>
                    <div className="w-16 h-16 bg-[var(--yellow)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--yellow)]/20 animate-pulse">
                      <span className="text-2xl">🚖</span>
                    </div>
                    <h3 className="font-bebas text-3xl text-[var(--yellow)] mb-2 tracking-widest">SÜRÜCÜ YOLDA</h3>
                    <p className="text-muted text-sm max-w-xs mb-4">Sürücünüz bulunduğunuz noktaya doğru hareket halinde.</p>
                    <DriverCard driver={activeBooking.driver} />
                  </>
                ) : activeBooking.status === 'DRIVER_ARRIVED' ? (
                  <>
                    <div className="w-16 h-16 bg-[var(--orange)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--orange)]/20 animate-bounce">
                      <span className="text-2xl">📍</span>
                    </div>
                    <h3 className="font-bebas text-3xl text-[var(--orange)] mb-2 tracking-widest">SÜRÜCÜ GELDİ</h3>
                    <p className="text-muted text-sm max-w-xs mb-4">Sürücünüz biniş noktasında sizi bekliyor.</p>
                    <DriverCard driver={activeBooking.driver} />
                  </>
                ) : activeBooking.status === 'IN_PROGRESS' ? (
                  <>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
                      <span className="text-2xl animate-pulse">🛣️</span>
                    </div>
                    <h3 className="font-bebas text-3xl text-blue-400 mb-2 tracking-widest">YOLCULUK BAŞLADI</h3>
                    <p className="text-muted text-sm max-w-xs mb-4">Hedefinize doğru ilerliyorsunuz. İyi yolculuklar!</p>
                    <DriverCard driver={activeBooking.driver} />
                  </>
                ) : activeBooking.status === 'COMPLETED' ? (
                  <>
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                      <span className="text-2xl">🏁</span>
                    </div>
                    <h3 className="font-bebas text-3xl text-green-400 mb-2 tracking-widest">HEDEFE ULAŞILDI</h3>
                    <p className="text-muted text-sm max-w-xs mb-6">Yolculuğunuz tamamlandı. Bizi tercih ettiğiniz için teşekkür ederiz.</p>
                    
                    {!activeBooking.rating ? (
                      <div className="w-full bg-[var(--anthracite-2)] p-4 rounded border border-[var(--border)]">
                        <div className="text-xs text-[var(--yellow)] mb-3 font-bebas tracking-widest">SÜRÜCÜYÜ DEĞERLENDİRİN</div>
                        <div className="flex justify-center gap-2 mb-4">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => handleRate(star)} className="text-2xl hover:scale-110 transition-transform">
                              ⭐
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-muted">Yıldızlara tıklayarak puan verebilirsiniz.</p>
                      </div>
                    ) : (
                      <div className="text-sm text-green-500 bg-green-500/10 py-2 px-4 rounded">Değerlendirmeniz alındı! Ana sayfaya yönlendiriliyorsunuz...</div>
                    )}
                  </>
                ) : activeBooking.status === 'CANCELLED' ? (
                  <>
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                      <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="font-bebas text-3xl text-red-400 mb-2 tracking-widest">İPTAL EDİLDİ</h3>
                    <p className="text-muted text-sm max-w-xs mb-6">Yolculuk talebiniz iptal edilmiştir.</p>
                    <button className="btn-book" onClick={() => setActiveBooking(null)}>YENİ ÇAĞRI OLUŞTUR</button>
                  </>
                ) : null}
              </div>

              {(activeBooking.status === 'PENDING' || activeBooking.status === 'ACCEPTED' || activeBooking.status === 'DRIVER_ARRIVED') && (
                <div className="space-y-4">
                  <button 
                    className="btn-secondary w-full m-0 py-3 text-xs opacity-50 hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                    onClick={handleCancel}
                  >
                    YOLCULUĞU İPTAL ET
                  </button>
                  <p className="text-[10px] text-muted text-center leading-relaxed">
                    Sürücü yola çıktıktan sonra yapılan iptallerde ücret kesintisi olabilir.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* CUSTOMER VIEW (EXISTING FORM) */
            <div className="opacity-100">
              <div className="form-title">HİZMET ÇAĞIR</div>
              <div className="form-subtitle">// Hızlı ve güvenli işlem</div>

              <div className="service-tabs">
                <button className={`service-tab ${service === 'taksi' ? 'active' : ''}`} onClick={() => setService('taksi')}>Taksi</button>
                <button className={`service-tab ${service === 'nakliye' ? 'active' : ''}`} onClick={() => setService('nakliye')}>Nakliye</button>
                <button className={`service-tab ${service === 'yol-yardim' ? 'active' : ''}`} onClick={() => setService('yol-yardim')}>Yol Yardım</button>
                <button className={`service-tab ${service === 'vip' ? 'active' : ''}`} onClick={() => setService('vip')}>VIP</button>
              </div>

              {/* Dynamic Content based on Service */}
              {service === 'nakliye' && <NakliyeOptions onTypeChange={setSubService} />}
              {service === 'yol-yardim' && <YolYardimOptions />}

              <div className="form-group mt-6">
                <label className="form-label flex items-center justify-between">
                  <span>Konum Seçimi</span>
                  <span className="text-[var(--yellow)] text-xs bg-[rgba(245,197,24,0.1)] px-2 py-0.5 rounded">Harita Aktif</span>
                </label>
                <div className="mb-3">
                  <MapSelector onLocationSelect={handleLocationSelect} singlePointMode={service === 'yol-yardim'} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-500"></span>
                    <input type="text" className="form-input flex-1" value={pickup} onChange={(e) => { setPickup(e.target.value); calcPrice(); }} placeholder="Başlangıç noktası..." />
                  </div>
                  {service !== 'yol-yardim' && (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-500"></span>
                      <input type="text" className="form-input flex-1" value={dropoff} onChange={(e) => { setDropoff(e.target.value); calcPrice(); }} placeholder="Varış noktası..." />
                    </div>
                  )}
                </div>
              </div>

              {/* TIMING SELECTION */}
              {service !== 'yol-yardim' && (
                <div className="form-group mt-4">
                  <label className="form-label">Zaman Seçimi</label>
                  
                  {/* Nakliye → Evden Eve / Yük: SADECE Rezervasyon */}
                  {(service === 'nakliye' && subService !== 'kurye' && subService !== null) ? (
                    <div className="bg-[var(--anthracite-2)] p-3 rounded border border-[var(--border)]">
                      <div className="flex items-center gap-2 text-sm text-[var(--yellow)] mb-1">
                        <span>📅</span><span className="font-bebas tracking-widest">SADECE REZERVASYON</span>
                      </div>
                      <div className="text-xs text-muted mb-3">Evden Eve ve Yük Nakliyesi için önceden tarih seçmeniz gerekmektedir.</div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="date" className="form-input text-sm" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} />
                        <input type="time" className="form-input text-sm" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} />
                      </div>
                    </div>

                  /* Nakliye → Kurye: SADECE Hemen */
                  ) : (service === 'nakliye' && subService === 'kurye') ? (
                    <div className="flex items-center gap-3 bg-[var(--yellow)]/10 border border-[var(--yellow)] text-[var(--yellow)] py-3 px-4 rounded">
                      <span className="text-xl">⚡</span>
                      <div>
                        <div className="font-bebas tracking-widest">HEMEN TESLİMAT</div>
                        <div className="text-xs text-muted">Kurye hizmetinde rezervasyon seçeneği bulunmamaktadır.</div>
                      </div>
                    </div>

                  /* Taksi & VIP: Her İkisi */
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <button 
                          className={`flex items-center justify-center gap-1.5 py-2 border rounded transition-colors text-sm ${timeType === 'now' ? 'bg-[var(--yellow)]/10 border-[var(--yellow)] text-[var(--yellow)]' : 'bg-[var(--anthracite-2)] border-[var(--border)] text-muted hover:bg-white/5'}`}
                          onClick={() => setTimeType('now')}
                        >
                          <span>⚡</span>
                          <span className="font-bebas tracking-wider">HEMEN GELSİN</span>
                        </button>
                        <button 
                          className={`flex items-center justify-center gap-1.5 py-2 border rounded transition-colors text-sm ${timeType === 'scheduled' ? 'bg-[var(--yellow)]/10 border-[var(--yellow)] text-[var(--yellow)]' : 'bg-[var(--anthracite-2)] border-[var(--border)] text-muted hover:bg-white/5'}`}
                          onClick={() => setTimeType('scheduled')}
                        >
                          <span>📅</span>
                          <span className="font-bebas tracking-wider">REZERVASYON</span>
                        </button>
                      </div>
                      
                      {timeType === 'scheduled' && (
                        <div className="grid grid-cols-2 gap-3 bg-[var(--anthracite-2)] p-3 rounded border border-[var(--yellow)]/30 animate-fade-in">
                          <input type="date" className="form-input text-sm" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} />
                          <input type="time" className="form-input text-sm" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* PAYMENT METHOD SELECTION */}
              <div className="form-group mt-4">
                <label className="form-label">Ödeme Yöntemi</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button 
                    className={`flex items-center justify-center gap-1.5 py-2 border rounded transition-colors text-sm ${paymentMethod === 'CASH' ? 'bg-[var(--yellow)]/10 border-[var(--yellow)] text-[var(--yellow)]' : 'bg-[var(--anthracite-2)] border-[var(--border)] text-muted hover:bg-white/5'}`}
                    onClick={() => setPaymentMethod('CASH')}
                  >
                    <span>💵</span>
                    <span className="font-bebas tracking-wider">NAKİT</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center gap-1.5 py-2 border rounded transition-colors text-sm ${paymentMethod === 'CARD' ? 'bg-[var(--yellow)]/10 border-[var(--yellow)] text-[var(--yellow)]' : 'bg-[var(--anthracite-2)] border-[var(--border)] text-muted hover:bg-white/5'}`}
                    onClick={() => setPaymentMethod('CARD')}
                  >
                    <span>💳</span>
                    <span className="font-bebas tracking-wider">KART</span>
                  </button>
                </div>
                
                {paymentMethod === 'CARD' && (
                  <div className="bg-[var(--anthracite-2)] p-3 rounded border border-[var(--border)] animate-fade-in">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted">Kayıtlı Kartlar</span>
                      <button className="text-xs text-[var(--yellow)] hover:underline">+ Yeni Ekle</button>
                    </div>
                    <select className="form-select text-sm py-2">
                      <option>İş Kartım (**** 1234)</option>
                      <option>Şahsi Kart (**** 5678)</option>
                    </select>
                    <p className="text-[10px] text-muted mt-2">
                      Ödemeniz iyzico güvencesiyle 3D Secure altyapısı ile gerçekleşir. Sürücü atandığında tutar kartınızdan bloke edilir.
                    </p>
                  </div>
                )}
              </div>

              <div className="price-estimate mt-6">
                <div>
                  <div className="price-label">Tahmini Ücret</div>
                  <div className="price-note">
                    {estimateLoading ? 'Hesaplanıyor...' : 
                     estimate ? `${estimate.distance_km.toFixed(1)} km · ~${estimate.duration_min} dk` :
                     'Adres seçildiğinde hesaplanır'}
                  </div>
                </div>
                <div>
                  <div className="price-value">
                    {estimateLoading ? (
                      <div className="w-4 h-4 border-2 border-[var(--yellow)]/40 border-t-[var(--yellow)] rounded-full animate-spin"></div>
                    ) : estimate ? (
                      `${parseFloat(estimate.estimated_fare).toFixed(2)} ₺`
                    ) : (
                      '-- ₺'
                    )}
                  </div>
                </div>
              </div>

              <button 
                className="btn-book" 
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>&#9654; ONAYLA VE ÇAĞIR</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
