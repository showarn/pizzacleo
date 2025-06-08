import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("Inloggningsförsök med email:", email);

    if (!email || !password) {
      console.log("Fel: saknas email eller lösenord");
      return NextResponse.json({ error: "Email och lösenord krävs" }, { status: 400 });
    }

    const result = await pool.query(
      "SELECT id, email, password_hash, role FROM users WHERE email = $1",
      [email]
    );
    console.log("Databasresultat:", result.rows);

    const user = result.rows[0];

    if (!user) {
      console.log("Fel: användare finns ej");
      return NextResponse.json({ error: "Felaktig email eller lösenord" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      console.log("Fel: lösenord stämmer inte");
      return NextResponse.json({ error: "Felaktig email eller lösenord" }, { status: 401 });
    }

    console.log("Inloggning lyckades för användare:", user.email);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
    console.log("JWT-token skapad:", token);

    const response = NextResponse.json({ message: "Inloggning lyckades" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
    });
    console.log("Cookie med JWT-token satt");

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internt serverfel" }, { status: 500 });
  }
}
