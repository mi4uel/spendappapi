import { PrismaClient, Role } from "@prisma/client";
import { users } from "./seed-content-users.ts";

const prisma = new PrismaClient();

export async function seedUsers() {
  await prisma.user.createMany({
    data: users.map((u) => ({
      ...u,
      role: u.role as Role,
    })),
    skipDuplicates: true,
  });

  console.log("✅ Users seeded");
}
