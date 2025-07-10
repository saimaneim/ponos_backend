import type { Context } from "hono";
import { UserModel } from "@/schemas/user";
import { generateCookie } from "@/services/generateCookies";
import { getRequiredEnv } from "@/services/getEnv";
import { signJWT } from "@/services/jwt";
import { createTransporter, sendEmail } from "@/services/mailer";
import { connectRedis } from "@/services/redis";

export default async function signupController(c: Context) {
	try {
		const fields = await c.req.json();
		const user = await UserModel.findEmail(fields.email, {});
		if (user) return c.json({ error: "Este email ya está en uso" }, 400);

		const newUser = await UserModel.create(fields);

		const payload = {
			id: newUser._id,
			email: newUser.email,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
		};

		const accessToken = signJWT({
			payload,
			secret: getRequiredEnv("JWT_SECRET"),
		});
		const refreshToken = signJWT({
			payload,
			secret: getRequiredEnv("JWT_SECRET"),
			expiresIn: "7d",
		});

		const temporalToken = signJWT({
			payload,
			secret: getRequiredEnv("JWT_SECRET"),
			expiresIn: "2m",
		});
		const redisClient = await connectRedis({
			host: getRequiredEnv("REDIS_HOST"),
			port: parseInt(getRequiredEnv("REDIS_PORT")),
		});
		await redisClient.set(temporalToken, newUser._id as string);

		const transporter = await createTransporter({
			user: getRequiredEnv("EMAIL_USER"),
			pass: getRequiredEnv("EMAIL_PASS"),
		});
		await sendEmail({
			to: newUser.email,
			subject: "Bienvenido a nuestra aplicación",
			text: `
            <h1>Bienvenido a nuestra aplicación</h1>
            <p>Para verificar tu cuenta, por favor haz click en el siguiente enlace:</p>
            <a href="${getRequiredEnv("FRONTEND_URL")}/verify?token=${temporalToken}">Verificar cuenta</a>
        `,
			user: getRequiredEnv("EMAIL_USER"),
			transporter,
		});

		generateCookie({
			c,
			name: "refreshToken",
			value: refreshToken,
			expiresIn: 604800,
		});
		return c.json({ message: "Usuario creado exitosamente", accessToken });
	} catch (error) {
		console.log(error);
		return c.json({ error: "Error al crear el usuario" }, 500);
	}
}
