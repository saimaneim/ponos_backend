import type { Context } from "hono";
import { generateCookie } from "@/services/generateCookie";

export function setAuthCookies(c: Context, refreshToken: string) {
  const SEVEN_DAYS = 60 * 60 * 24 * 7;
  generateCookie({
    c,
    name: "refreshToken",
    value: refreshToken,
    expiresIn: SEVEN_DAYS,
  });
}
