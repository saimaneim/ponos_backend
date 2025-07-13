import { Hono } from "hono";
import verifyAccountController from "@/controllers/verifyAccount";

const verifyRouter = new Hono();

verifyRouter.post("/", verifyAccountController);

export default verifyRouter;
