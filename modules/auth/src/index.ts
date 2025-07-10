import { Hono } from "hono";
import connect from "@/database/connect";
import Router from "@/routes/authRouter";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.use("*", async (c, next) => {
	try {
		await connect();
		await next();
	} catch (error) {
		console.error("Database connection error:", error);
		return c.json({ error: "Service unavailable" }, 503);
	}
});

app.route("/", Router);

export default app;
