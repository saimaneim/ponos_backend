import { Hono } from "hono";
import connect from "@/database/connect";
import authRouter from "@/routes/authRouter";
import { cors } from "hono/cors";
import { getRequiredEnv } from "@/utils/getEnv";

const app = new Hono();

app.use("*", async (c, next) => {
	try {
		await connect();
		await next();
	} catch (error) {
		console.error("Database connection error:", error);
		return c.json({ error: "Service unavailable" }, 503);
	}
});

app.use("*", cors({
		origin: getRequiredEnv("FRONTEND_URL"),
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
	}),
);

app.route("/auth", authRouter);

export default app;
