import type { Context, MiddlewareHandler, Next } from "hono";
import type { z } from "zod";

/**
 * Middleware of validation with Zod
 * @param schema - Zod validation schema
 * @returns Middleware handler that validates the request body
 */
export function validate<T extends z.ZodType>(schema: T): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const result = schema.safeParse(body);
      
      if (!result.success) {
        const errors = result.error.format();
        return c.json({
          error: "Datos inválidos",
          details: errors
        }, 400);
      }
      
      c.set("zod", result.data);
      await next();
    } catch (error) {
      return c.json({
        error: "Error al procesar la solicitud",
        message: error instanceof Error ? error.message : "Error desconocido"
      }, 500);
    }
  };
} 