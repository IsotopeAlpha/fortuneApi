import express from "express";
import { register, login, changePassword } from "../controllers/auth.js"

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/:id/:password', changePassword);

export default router;