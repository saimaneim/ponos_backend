import { Hono } from "hono";
import forgotPasswordController from "@/controllers/forgotPassword";

const forgotPasswordRouter = new Hono();

forgotPasswordRouter.post("/", forgotPasswordController);

export default forgotPasswordRouter;
