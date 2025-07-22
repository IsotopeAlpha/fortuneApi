import express from "express";
import { createMToken, deleteMToken, getMToken, getMTokenByEmail, getMTokens, updateMToken } from "../controllers/message_tokens.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createMToken);

router.put("/:id", updateMToken);

router.delete("/:id", verifyAdmin, deleteMToken);

router.get('/:id', getMToken);

router.post('/email', getMTokenByEmail);

router.get('/', getMTokens);

export default router;