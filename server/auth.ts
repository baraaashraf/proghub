import { JwtObject } from "../shared/src/types";
import jwt from "jsonwebtoken";

export function signJwt(obj: JwtObject): string {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: '15d',
  });
}
// Throws on bad tokens
export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Missing JWT secret");
    process.exit();
  }
  return secret;
}
