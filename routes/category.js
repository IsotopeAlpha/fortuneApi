import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categories.js";


const router = express.Router();

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategories);

export default router;