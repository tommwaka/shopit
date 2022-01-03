import express from 'express'
import {
	clearCart,
	createCart,
	fetchAllCart,
	fetchUserCart,
} from "../controllers/cartController.js";
import {
	adminAuthorization,
	tokenAuthorization,
	verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/find/:userId", verifyToken, fetchUserCart);
router.get("/", adminAuthorization, fetchAllCart);
router.post("/", verifyToken, createCart);
router.put("/:id", tokenAuthorization, updateCart);
router.delete("/:id", tokenAuthorization, clearCart);

export default router