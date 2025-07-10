import { Hono } from "hono";
import verifyAccountController from "@/controllers/verifyAccount";

const verifyRouter = new Hono();

verifyRouter.post("/verify", verifyAccountController);

export default verifyRouter;
