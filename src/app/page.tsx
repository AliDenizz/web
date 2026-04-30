import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import BookingForm from "@/components/BookingForm";
import Features from "@/components/Features";
import AppSection from "@/components/AppSection";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      
      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          <span className="ticker-item">TAKSİ <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">NAKLİYE <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">YOL YARDIM <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">VIP TAŞIMA <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">7/24 AKTİF <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">ANTALYA <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">TAKSİ <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">NAKLİYE <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">YOL YARDIM <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">VIP TAŞIMA <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">7/24 AKTİF <span className="ticker-sep">✦</span></span>
          <span className="ticker-item">ANTALYA <span className="ticker-sep">✦</span></span>
        </div>
      </div>

      <Services />
      <HowItWorks />
      <BookingForm />
      <Features />
      <AppSection />
      <Footer />

      <StatusBar />
    </>
  );
}
