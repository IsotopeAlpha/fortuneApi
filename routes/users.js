import express from "express";
import {
  deleteUser,
  encrptPass,
  getUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/find", getUser);

router.post("/encrypt", encrptPass);

router.get("/:id", getUserById);

router.get("/", verifyAdmin, getUsers);

export default router;
