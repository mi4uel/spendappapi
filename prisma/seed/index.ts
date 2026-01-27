import { seedUsers } from "./seed-users.ts";
import { seedPayments } from "./seed-payments.ts";


async function main() {
  await seedUsers();
  await seedPayments();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
