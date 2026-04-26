import { Router } from "express";
import { contactController, healthController } from "../controllers/contact.controller.js";

const router = Router();

router.get("/health", healthController);
router.post("/contact", contactController);

export default router;
