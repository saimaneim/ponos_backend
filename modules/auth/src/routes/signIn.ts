import { Hono } from "hono";
import signInController from "@/controllers/signIn";

const signInRouter = new Hono();
signInRouter.post("/", signInController);
export default signInRouter;
