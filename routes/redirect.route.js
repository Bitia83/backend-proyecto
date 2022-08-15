import { Router } from "express";
import { redirectLink } from "../controller/redirect.controller.js";
const router = Router();

router.get("/:nanoLink", redirectLink);

export default router;