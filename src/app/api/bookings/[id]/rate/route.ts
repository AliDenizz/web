import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://185-231-111-90.sslip.io/api";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Oturum açılmadı." }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${API_BASE}/bookings/${params.id}/rate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        stars: body.stars || 5,
        tags: [],
        comment: ""
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.detail || "Puanlama başarısız." }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

