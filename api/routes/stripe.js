import express from "express";
import { makePayment } from "../controllers/stripeController";

const router = express.Router();

router.post("/payment", makePayment);

export default router;
