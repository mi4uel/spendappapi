import bcrypt from "bcrypt";

export const users = await Promise.all([
  {
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "ADMIN",
    isDeleted: false,
  },
  {
    name: "Miguel",
    email: "mi4uel@gmail.com",
    password: "mvidelaControlgastos1993$",
    role: "ADMIN",
    isDeleted: false,
  },
  {
    name: "Invitado",
    email: "guest@example.com",
    password: "guest123",
    role: "EDITOR",
    isDeleted: false,
  },
].map(async (u) => ({
  ...u,
  password: await bcrypt.hash(u.password, 10),
})));
