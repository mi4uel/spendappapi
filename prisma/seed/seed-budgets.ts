import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedBudgets() {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!admin) {
    throw new Error("Admin user not found");
  }

  const START_YEAR = 2024;
  const END_YEAR = new Date().getFullYear();
  const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1); 

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    for (const month of MONTHS) {
      await prisma.budget.upsert({
        where: {
          userId_year_month: {
            userId: admin.id,
            year,
            month,
          },
        },
        update: {
          amount: 3_000_000,
        },
        create: {
          userId: admin.id,
          year,
          month,
          amount: 3_000_000,
        },
      });
    }
  }

  console.log("✅ Budgets seeded from 2024 with $3.000.000 per month");
}
