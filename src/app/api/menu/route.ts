import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import fallbackMenuItems from "@/data/menuData";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, ingredients, price, group_name as "group", calories, protein, carbs, fat
       FROM menu_items
       ORDER BY group_order, display_order`
    );

    if (!result.rows.length) {
      throw new Error("Tom databas");
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Databasfel, fallback till statisk meny:", error);
    return NextResponse.json(fallbackMenuItems);
  }
}
