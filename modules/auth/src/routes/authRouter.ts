import { Hono } from "hono";
import signInController from "@/controllers/signIn";
import signUpController from "@/controllers/signUp";
import verifyAccountController from "@/controllers/verifyAccount";
import forgotPasswordController from "@/controllers/forgotPassword";
import { validate } from "@/middleware/validate";
import { 
  signInSchema, 
  signUpSchema, 
  verifyAccountSchema, 
  forgotPasswordSchema 
} from "@/schemas/validation";

const authRouter = new Hono();

authRouter.post("/signIn", validate(signInSchema), signInController);
authRouter.post("/signUp", validate(signUpSchema), signUpController);
authRouter.post("/verify", validate(verifyAccountSchema), verifyAccountController);
authRouter.post("/forgotPassword", validate(forgotPasswordSchema), forgotPasswordController);
export default authRouter; 