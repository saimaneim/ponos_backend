import type { Context } from "hono";
import { getRequiredEnv } from "@/utils/getEnv";
import type { RateLimitStore } from "@/types/rateLimiter";

const store: RateLimitStore = {};

/**
 * @description Rate limiter middleware
 * @param {Context} c - The context object
 * @param {() => Promise<void>} next - The next middleware function
 * @returns {Promise<void>} - A promise that resolves to void
 */
export const rateLimiter =  (c: Context, next: () => void) => {
	const clientId =
		c.req.header("x-client-id") ||
		c.req.header("cf-connecting-ip") ||
		"anonymous";

	const currentTime = Date.now();
	const windowStart =
		currentTime - Number(getRequiredEnv("RATE_LIMIT_WINDOW_MS"));

	if (!store[clientId] || store[clientId].resetTime < windowStart) {
		store[clientId] = {
			count: 0,
			resetTime: currentTime,
		};
	}

	store[clientId].count += 1;

	if (
		store[clientId].count > Number(getRequiredEnv("RATE_LIMIT_MAX_REQUESTS"))
	) {
		const resetIn = Math.ceil(
			(store[clientId].resetTime +
				Number(getRequiredEnv("RATE_LIMIT_WINDOW_MS")) -
				currentTime) /
				1000,
		);

		c.header("Retry-After", resetIn.toString());
		c.header(
			"X-RateLimit-Limit",
			Number(getRequiredEnv("RATE_LIMIT_MAX_REQUESTS")).toString(),
		);
		c.header("X-RateLimit-Remaining", "0");
		c.header(
			"X-RateLimit-Reset",
			(
				store[clientId].resetTime + getRequiredEnv("RATE_LIMIT_WINDOW_MS")
			).toString(),
		);

		return c.json(
			{
				error: "Too many requests",
				message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
			},
			429,
		);
	}

	c.header(
		"X-RateLimit-Limit",
		Number(getRequiredEnv("RATE_LIMIT_MAX_REQUESTS")).toString(),
	);
	c.header(
		"X-RateLimit-Remaining",
		(
			Number(getRequiredEnv("RATE_LIMIT_MAX_REQUESTS")) - store[clientId].count
		).toString(),
	);
	c.header(
		"X-RateLimit-Reset",
		(
			store[clientId].resetTime + getRequiredEnv("RATE_LIMIT_WINDOW_MS")
		).toString(),
	);

	next();
};
