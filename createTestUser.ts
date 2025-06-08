import { Pool } from "pg";
import * as bcrypt from "bcryptjs";

async function createTestUser() {
  // Skapa pool med samma inställningar som i din app
  const pool = new Pool({
    host: process.env.DB_HOST || "innovobygg.duckdns.org",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "innovoadmin",
    password: process.env.DB_PASS || "pekkapreben1",
    database: process.env.DB_NAME || "pizzeriacleo",
    ssl: { rejectUnauthorized: false },
  });

  try {
    const email = "kawan-1975@hotmail.com";
    const password = "Cleopatra10!?"; // Ditt valda lösenord
    const role = "admin";

    // Generera hashat lösenord
    const password_hash = await bcrypt.hash(password, 10);

    // Rensa eventuell gammal testanvändare med samma email
    await pool.query("DELETE FROM users WHERE email = $1", [email]);

    // Lägg in ny användare
    await pool.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, $3)`,
      [email, password_hash, role]
    );

    console.log(`Testanvändare skapad: ${email} med lösenord '${password}'`);
  } catch (error) {
    console.error("Fel vid skapande av testanvändare:", error);
  } finally {
    await pool.end();
  }
}

createTestUser();
