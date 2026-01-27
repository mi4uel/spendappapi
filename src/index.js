import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payments.js";
import userRoutes from "./routes/users.js";
import budgetRoutes from "./routes/budgets.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/budgets", budgetRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
