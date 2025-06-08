import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

export async function GET() {
  try {
    const res = await pool.query(`SELECT value FROM settings WHERE key = 'show_nutrition'`);
    if (!res.rows.length) {
      return NextResponse.json({ showNutrition: false });
    }
    return NextResponse.json({ showNutrition: res.rows[0].value === "true" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ showNutrition: false });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Hämta token från cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Ingen token" }, { status: 401 });
    }

    const user = verifyJwt(token);

    if (!user || (user as any).role !== "admin") {
      return NextResponse.json({ error: "Ej behörig" }, { status: 403 });
    }

    const body = await request.json();
    const { showNutrition } = body;

    if (typeof showNutrition !== "boolean") {
      return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO settings (key, value) VALUES ('show_nutrition', $1)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [showNutrition.toString()]
    );

    return NextResponse.json({ success: true, showNutrition });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
