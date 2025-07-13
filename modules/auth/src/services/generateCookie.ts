import { setCookie } from "hono/cookie";
import type { IGenerateCookie } from "@/types/cookie";

export function generateCookie({
	c,
	name,
	value,
	expiresIn,
}: IGenerateCookie): ReturnType<typeof setCookie> {
	const cookie = setCookie(c, name, value, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		maxAge: expiresIn,
	});

	return cookie;
}
