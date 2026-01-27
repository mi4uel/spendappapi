import { PrismaClient } from "@prisma/client";
import { payments } from "./seed-content-payments.ts";

const prisma = new PrismaClient();

export async function seedPayments() {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!admin) throw new Error("Admin user not found");

  await prisma.payment.deleteMany({
    where: { userId: admin.id },
  });

  await prisma.payment.createMany({
    data: payments.map((p) => ({
      ...p,
      userId: admin.id,
    })),
  });

  console.log("✅ Payments seeded (Feb 2026)");
}
