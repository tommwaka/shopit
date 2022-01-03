import express from 'express'
import {
	createProduct,
	fetchProduct,
	deleteProduct,
	updateProduct,
	fetchAllProducts,
} from "../controllers/productController";
import { adminAuthorization } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", adminAuthorization, createProduct);
router.get("/:id", fetchProduct);
router.get("/", fetchAllProducts);
router.put("/:id", adminAuthorization, updateProduct);
router.delete("/:id", adminAuthorization, deleteProduct);

export default router