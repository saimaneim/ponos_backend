import { Hono } from "hono";
import signUpController from "@/controllers/signUp";

const signUpRouter = new Hono();
signUpRouter.post("/signUp", signUpController);
export default signUpRouter;
