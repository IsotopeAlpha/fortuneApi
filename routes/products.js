import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct,  updateProduct, uploadCloudinaryPic } from "../controllers/products.js";


const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.post("/product-image", uploadCloudinaryPic);
router.delete("/product-image", deleteProduct);

export default router;