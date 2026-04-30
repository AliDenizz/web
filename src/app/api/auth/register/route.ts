import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://185-231-111-90.sslip.io/api";

export async function POST(request: Request) {
  try {
    const { role, ...userData } = await request.json();
    
    const endpoint = role === "driver" ? "/auth/register/driver/" : "/auth/register/passenger/";

    // Call the external API
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.detail || "Kayıt başarısız." }, { status: res.status });
    }

    // Set httpOnly cookies
    const cookieStore = await cookies();
    cookieStore.set("access", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });
    
    cookieStore.set("refresh", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    cookieStore.set("role", role, {
      httpOnly: false, // Accessible by client for UI logic
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
