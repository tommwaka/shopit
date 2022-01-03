import express from 'express'
import {
	createOrder,
	deleteOrder,
	fetchIncome,
	fetchUserOrders,
	updateOrder,
} from "../controllers/orderController";
import {
	adminAuthorization,
	tokenAuthorization,
	verifyToken,
} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/find/:userId", tokenAuthorization, fetchUserOrders);
router.post("/", verifyToken, createOrder);
router.put("/:id", adminAuthorization, updateOrder);
router.delete("/:id", adminAuthorization, deleteOrder);
router.get("/income", adminAuthorization, fetchIncome);

export default router