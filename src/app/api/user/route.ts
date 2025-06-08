// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Ej inloggad" }, { status: 401 });
    }

    const payload = verifyJwt(token);

    if (!payload) {
      return NextResponse.json({ error: "Ogiltig token" }, { status: 401 });
    }

    // Payload är typ any, här plockar vi ut vad vi behöver
    const { id, email, role } = payload as { id: number; email: string; role: string };

    return NextResponse.json({ id, email, role });
  } catch (error) {
    console.error("Fel i /api/user:", error);
    return NextResponse.json({ error: "Internt serverfel" }, { status: 500 });
  }
}
