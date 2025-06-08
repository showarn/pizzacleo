import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

type JwtPayload = {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export async function PUT(request: NextRequest) {
  try {
    // Hämta token från cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Ingen token" }, { status: 401 });
    }

    const user = verifyJwt(token) as JwtPayload | null;

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Ej behörig" }, { status: 403 });
    }

    const menuItems: { id: number; price: string | number }[] = await request.json();

    if (!Array.isArray(menuItems)) {
      return NextResponse.json({ error: "Felaktigt format" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      for (const item of menuItems) {
        const priceNumber = Number(item.price);
        if (
          typeof item.id !== "number" ||
          isNaN(priceNumber) ||
          priceNumber < 0
        ) {
          throw new Error("Invalid data");
        }
        await client.query("UPDATE menu_items SET price = $1 WHERE id = $2", [
          priceNumber,
          item.id,
        ]);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    return NextResponse.json({ message: "Priser uppdaterade" });
  } catch (error) {
    console.error("Fel vid uppdatering av priser:", error);
    return NextResponse.json(
      { error: "Kunde inte uppdatera priser" },
      { status: 500 }
    );
  }
}
