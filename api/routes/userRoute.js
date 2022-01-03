import express from 'express'
import {
	updateUser,
	deleteUser,
	fetchUser,
	fetchAllUsers,
	fetchStats,
} from "../controllers/userController.js";
import {
	adminAuthorization,
	tokenAuthorization,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/find/:id", adminAuthorization, fetchUser);
router.get("/", adminAuthorization, fetchAllUsers);
router.put("/:id", tokenAuthorization, updateUser);
router.delete("/:id", tokenAuthorization, deleteUser);
router.get("/stats", adminAuthorization, fetchStats);

export default router