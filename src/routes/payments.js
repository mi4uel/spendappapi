import { Router } from "express";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByUserAndDate,
  getPaymentsByUserAndYear,
  markAsDonePayment
} from "../controllers/paymentsController.js";

const router = Router();

router.get("/", getPayments);
router.get("/user/:userId/:year/:month", getPaymentsByUserAndDate)
router.get("/user/:userId/:year", getPaymentsByUserAndYear)
router.post("/create", createPayment);
router.put("/:id", updatePayment);
router.put("/mark_as_done/:id", markAsDonePayment);
router.delete("/:id", deletePayment);

export default router;
