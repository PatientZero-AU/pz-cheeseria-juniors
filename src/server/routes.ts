import { Router } from "express";
import { getCheeses } from "./controller/cheese";
import healthCheck from "./controller/healthCheck";

const router = Router();

router.get("/api/", healthCheck);
router.get("/api/cheeses", getCheeses);

export default router;
