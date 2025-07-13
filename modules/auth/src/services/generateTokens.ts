import { signJWT } from "@/services/jwt";
import { getRequiredEnv } from "@/utils/getEnv";

export function generateTokens(payload: object) {
  const secret = getRequiredEnv("JWT_SECRET");

  const accessToken = signJWT({
    payload,
    secret,
    expiresIn: "1h",
  });

  const refreshToken = signJWT({
    payload,
    secret,
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}
