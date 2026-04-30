import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://185-231-111-90.sslip.io/api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const access = cookieStore.get("access")?.value;

    if (!access) {
      return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 401 });
    }

    // Call the external API
    const res = await fetch(`${API_BASE}/auth/me/`, {
      headers: {
        "Authorization": `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Yetkisiz erişim." }, { status: res.status });
    }

    const data = await res.json();
    const role = cookieStore.get("role")?.value;
    
    // Enrich with mock data for driver demo
    const enrichedData = {
      ...data,
      role: role || (data.is_driver ? 'driver' : 'passenger'),
      approval_status: role === 'driver' ? 'PENDING' : undefined,
      vehicle: role === 'driver' ? { plate: '34 ABC 123', model: 'Fiat Egea' } : undefined
    };
    
    return NextResponse.json(enrichedData);
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
