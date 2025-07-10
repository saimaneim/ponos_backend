import type { Context } from "hono";
import { UserModel } from "@/schemas/user";
import { generateCookie } from "@/services/generateCookies";
import { getRequiredEnv } from "@/services/getEnv";
import { signJWT } from "@/services/jwt";

export default async function signInController(c: Context) {
	try {
		const fields = await c.req.json();
		const requiredFields = ["email", "password"];

		for (const field of requiredFields) {
			if (!fields[field])
				return c.json({ error: `${field} es requerido` }, 400);
		}

		const user = await UserModel.findEmail(fields.email, { password: 1 });
		if (!user) return c.json({ error: "Usuario no encontrado" }, 404);

		const isPasswordValid = await user.comparePassword(fields.password);
		if (!isPasswordValid)
			return c.json({ error: "Contraseña incorrecta" }, 401);

		const payload = {
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		};

		const accessToken = signJWT({
			payload,
			secret: getRequiredEnv("JWT_SECRET"),
			expiresIn: "1h",
		});
		const refreshToken = signJWT({
			payload,
			secret: getRequiredEnv("JWT_SECRET"),
			expiresIn: "7d",
		});

		generateCookie({
			c,
			name: "refreshToken",
			value: refreshToken,
			expiresIn: 604800,
		});

		return c.json({ message: "Inicio de sesión exitoso", accessToken });
	} catch (error) {
		console.log(error);
		return c.json({ error: "Error al iniciar sesión" }, 500);
	}
}
