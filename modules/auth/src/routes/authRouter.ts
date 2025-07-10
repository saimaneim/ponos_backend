import { Hono } from "hono";
import signInRouter from "@/routes/signIn";
import signUpRouter from "@/routes/signUp";
import verifyRouter from "@/routes/verifyAccount";

const rootRouter = new Hono();

rootRouter.route("/auth/signIn", signInRouter);
rootRouter.route("/auth/verify", verifyRouter);
rootRouter.route("/auth/signUp", signUpRouter);

export default rootRouter;
