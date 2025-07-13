import { z } from "zod";

/**
 * Schema of validation for sign in
 */
export const signInSchema = z.object({
  email: z.email({ message: "Correo electrónico inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

/**
 * Schema of validation for sign up
 */
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es requerido" }),
  lastName: z.string().min(1, { message: "El apellido es requerido" }),
  email: z.email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .refine((val) => /[A-Z]/.test(val), { 
      message: "La contraseña debe tener al menos una letra mayúscula" 
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "La contraseña debe tener al menos un número" 
    }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

/**
 * Schema of validation for forgot password
 */
export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Correo electrónico inválido" }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

/**
 * Schema of validation for verify account
 */
export const verifyAccountSchema = z.object({
  token: z.string().min(1, { message: "Token inválido" }),
});

export type VerifyAccountSchema = z.infer<typeof verifyAccountSchema>; 