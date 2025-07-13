import { Hono } from "hono";
import signUpController from "@/controllers/signUp";

const signUpRouter = new Hono();
signUpRouter.post("/", signUpController);
export default signUpRouter;
