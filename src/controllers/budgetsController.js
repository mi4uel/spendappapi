import { prisma } from "../prisma.js";

/*export const getBudgetByUserYearAndMonth = async (req, res) => {
    console.log(req.params)
  try {
    const { userId, year, month } = req.params;

    if (!userId || !year || !month) {
      return res.status(400).json({ error: "userId, year and month are required" });
    }

    const budget = await prisma.budget.findUnique({
      where: {
        userId_year_month: {
          userId: Number(userId),
          year: Number(year),
          month: Number(month),
        },
      },
    });
    console.log({budget})

    // 👈 esto es intencional
    // si no hay presupuesto todavía, devolvemos null
    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching budget" });
  }
};*/


export const getBudgetsByUserAndYear = async (req, res) => {

    console.log(req.params)
  try {
    const { userId, year } = req.params;

    if (!userId || !year) {
      return res.status(400).json({ error: "userId and year are required" });
    }

    const budgets = await prisma.budget.findMany({
      where: {
        userId: Number(userId),
        year: Number(year),
      },
      orderBy: { month: "asc" },
    });

    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching budgets" });
  }
};


export const upsertBudget = async (req, res) => {
    console.log(req.body)
  try {
    const { userId, year, month, amount } = req.body;

    if (!userId || !year || !month || amount == null) {
      return res.status(400).json({
        error: "userId, year, month and amount are required",
      });
    }

    const budget = await prisma.budget.upsert({
      where: {
        userId_year_month: {
          userId: Number(userId),
          year: Number(year),
          month: Number(month),
        },
      },
      update: {
        amount: Number(amount),
      },
      create: {
        userId: Number(userId),
        year: Number(year),
        month: Number(month),
        amount: Number(amount),
      },
    });

    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error upserting budget" });
  }
};