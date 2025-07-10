import { Hono } from "hono";
import forgotPasswordController from "@/controllers/forgotPassword";
import signInController from "@/controllers/signIn";

const signInRouter = new Hono();

signInRouter.post("/", signInController);
signInRouter.post("/forgotPassword", forgotPasswordController);

export default signInRouter;
