import { Router } from "express";
import { getCheeses } from "./controller/cheese";
import { createOrder, getOrders } from "./controller/order";
import healthCheck from "./controller/healthCheck";

const router = Router();

router.get("/api/", healthCheck);
router.get("/api/cheeses", getCheeses);

router.get("/api/orders", getOrders);
router.post("/api/orders", createOrder);

export default router;
