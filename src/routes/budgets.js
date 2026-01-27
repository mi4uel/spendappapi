import { Router } from "express";
import { getBudgetsByUserAndYear, upsertBudget } from "../controllers/budgetsController.js";

const router = Router();


router.get("/:userId/:year", getBudgetsByUserAndYear);
router.post("/", upsertBudget);

export default router;
