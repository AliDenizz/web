import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://185-231-111-90.sslip.io/api";

export async function GET() {
  try {
    // Ping the services endpoint to check if the backend is alive
    const res = await fetch(`${API_BASE}/services/`, {
      next: { revalidate: 30 }
    });

    if (res.ok) {
      return NextResponse.json({
        status: "ACTIVE",
        system_status: "Sistem Aktif"
      });
    }
  } catch (_) {
    // Backend unreachable
  }

  return NextResponse.json({
    status: "DEGRADED",
    system_status: "Bağlantı Kontrol Ediliyor"
  });
}
