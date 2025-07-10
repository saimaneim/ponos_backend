import type { Context } from "hono";

export interface IGenerateCookie {
	c: Context;
	name: string;
	value: string;
	expiresIn: number;
}
