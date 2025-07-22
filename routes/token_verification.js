import express from "express";
import { confirmEmail, sendEmailToken } from "../controllers/verify_email.js";

const router = express.Router();

router.post("/", sendEmailToken);
router.get("/:email/:token", confirmEmail);

export default router;