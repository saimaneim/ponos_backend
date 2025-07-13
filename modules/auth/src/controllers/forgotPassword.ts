import type { Context } from "hono";
import { UserModel } from "@/schemas/user";
import { getRequiredEnv } from "@/utils/getEnv";
import { signJWT } from "@/services/jwt";
import { sendEmail } from "@/services/mailer";
import { connectRedis } from "@/services/redis";
import type { ForgotPasswordSchema } from "@/schemas/validation";

export default async function forgotPasswordController(c: Context) {
	try {
		const { email } = c.get("zod") as ForgotPasswordSchema;
		
		const user = await UserModel.findEmail(email, "");
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
		await sendEmail({
			to: user.email,
			subject: "Recuperación de contraseña",
			text: `
            <h1>Recuperación de contraseña</h1>
            <p>Para recuperar tu contraseña, haz click en el siguiente enlace: <a href="${getRequiredEnv("FRONTEND_URL")}/reset-password?token=${token}">Recuperar contraseña</a></p>
            `,
			user: getRequiredEnv("EMAIL_USER"),
		});
		return c.json({ message: "Correo enviado" }, 200);
	} catch (error) {
		console.log(error);
		return c.json({ error: "Error en la recuperación de contraseña" }, 500);
	}
}
