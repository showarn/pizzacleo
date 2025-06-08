import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "superhemlig_nyckel"; // sätt en riktig hemlighet i .env

export function signJwt(payload: object, options = {}) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h", ...options });
  console.log("signJwt: token skapad:", token);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log("verifyJwt: token verifierad, payload:", payload);
    return payload;
  } catch (error) {
    console.log("verifyJwt: verifiering misslyckades:", error);
    return null;
  }
}
