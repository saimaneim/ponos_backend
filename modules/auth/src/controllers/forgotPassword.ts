import type { Context } from "hono";
import { UserModel } from "@/schemas/user";
import { getRequiredEnv } from "@/services/getEnv";
import { signJWT } from "@/services/jwt";
import { createTransporter, sendEmail } from "@/services/mailer";
import { connectRedis } from "@/services/redis";

export default async function forgotPasswordController(c: Context) {
	try {
		const { email } = await c.req.json();
		const user = await UserModel.findEmail(email, {});
		if (!user) return c.json({ error: "Usuario no encontrado" }, 400);

		const userId = user._id?.toString() || "";
		if (!userId) return c.json({ error: "ID de usuario inválido" }, 500);

		const token = signJWT({
			payload: userId,
			secret: getRequiredEnv("JWT_SECRET") as string,
			expiresIn: "1h",
		});
		const redisClient = await connectRedis({
			host: getRequiredEnv("REDIS_HOST"),
			port: parseInt(getRequiredEnv("REDIS_PORT")),
		});
		await redisClient.set(token, userId);
		const transporter = await createTransporter({
			user: getRequiredEnv("EMAIL_USER"),
			pass: getRequiredEnv("EMAIL_PASS"),
		});
		await sendEmail({
			to: user.email,
			subject: "Recuperación de contraseña",
			text: `
            <h1>Recuperación de contraseña</h1>
            <p>Para recuperar tu contraseña, haz click en el siguiente enlace: <a href="${getRequiredEnv("FRONTEND_URL")}/reset-password?token=${token}">Recuperar contraseña</a></p>
            `,
			user: getRequiredEnv("EMAIL_USER"),
			transporter,
		});
		return c.json({ message: "Correo enviado" }, 200);
	} catch (error) {
		console.log(error);
	}
}
