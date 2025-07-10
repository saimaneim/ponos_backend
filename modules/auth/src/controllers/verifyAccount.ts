import type { Context } from "hono";
import { UserModel } from "@/schemas/user";
import { getRequiredEnv } from "@/services/getEnv";
import { verifyJWT } from "@/services/jwt";
import { connectRedis } from "@/services/redis";

export default async function verifyAccountController(c: Context) {
	try {
		const { token } = await c.req.json();
		const decoded = verifyJWT({ token, secret: getRequiredEnv("JWT_SECRET") });
		if (!decoded) return c.json({ error: "Token inválido" }, 400);

		const client = await connectRedis({
			host: getRequiredEnv("REDIS_HOST"),
			port: parseInt(getRequiredEnv("REDIS_PORT")),
		});
		const tokenExists = await client.get(token);
		if (!tokenExists) return c.json({ error: "Token inválido" }, 400);
		const user = await UserModel.findById(tokenExists);
		if (!user) return c.json({ error: "Usuario no encontrado" }, 400);

		if (user.isActive) return c.json({ error: "Cuenta ya verificada" }, 400);

		user.isActive = true;
		await user.save();

		return c.json({ message: "Cuenta verificada exitosamente" }, 200);
	} catch (error) {
		console.log(error);
	}
}
