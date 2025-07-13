import type { Context } from "hono";
import { validateCredentials } from "@/services/validateCredentials";
import { generateTokens } from "@/services/generateTokens";
import { setAuthCookies } from "@/services/setAuthCookies";
import type { SignInSchema } from "@/schemas/validation";

export default async function signInController(c: Context) {
  try {
    const { email, password } = c.get("zod") as SignInSchema;

    let user;
    try {
      user = await validateCredentials(email, password);
    } catch (err) {
      if (err instanceof Error && err.message === "NOT_FOUND") {
        return c.json({ error: "Usuario no encontrado" }, 404);
      }
      if (err instanceof Error && err.message === "INVALID_PASSWORD") {
        return c.json({ error: "Contraseña incorrecta" }, 401);
      }
      throw err;
    }

    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const { accessToken, refreshToken } = generateTokens(payload);
    setAuthCookies(c, refreshToken);

    return c.json({ message: "Inicio de sesión exitoso", accessToken });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Error al iniciar sesión" }, 500);
  }
}
