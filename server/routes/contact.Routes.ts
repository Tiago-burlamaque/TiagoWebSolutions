import { Router } from "express";
import { contactController, healthController } from "../controllers/contact.Controller.js";

const router = Router();

router.get("/health", healthController);
router.post("/contact", contactController);

export default router;
