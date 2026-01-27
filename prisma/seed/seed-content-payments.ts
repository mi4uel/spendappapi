import type { Prisma } from "@prisma/client";

export const payments: Prisma.PaymentCreateManyInput[] = [
  {
    description: "Tarjeta Brubank",
    amount: 152006.21,
    date: new Date("2026-02-06"),
    isPaid: false,
  },
  {
    description: "Abogado",
    amount: 500000.0,
    date: new Date("2026-02-06"),
    isPaid: false,
  },
  {
    description: "Alimentos",
    amount: 839000.0,
    date: new Date("2026-02-06"),
    isPaid: false,
  },
  {
    description: "Prestamo Uala",
    amount: 80452.1,
    date: new Date("2026-02-05"),
    isPaid: false,
  },
  {
    description: "Medife",
    amount: 300000.0,
    date: new Date("2026-02-10"),
    isPaid: false,
  },
  {
    description: "Monotributo",
    amount: 314832.7,
    date: new Date("2026-02-20"),
    isPaid: false,
  },
  {
    description: "Tarjeta Galicia",
    amount: 570426.26,
    date: new Date("2026-02-02"),
    isPaid: false,
  },
  {
    description: "Psicologa",
    amount: 90000.0,
    date: new Date("2026-02-04"),
    isPaid: false,
  },
  {
    description: "David",
    amount: 108666.0,
    date: new Date("2026-02-04"),
    isPaid: false,
  },
  {
    description: "Gimnasio",
    amount: 35000.0,
    date: new Date("2026-02-06"),
    isPaid: false,
  },
  {
    description: "Youtube",
    amount: 4600.0,
    date: new Date("2026-02-08"),
    isPaid: false,
  },
  {
    description: "Tarjeta Naranja",
    amount: 38450.08,
    date: new Date("2026-02-10"),
    isPaid: false,
  },
  {
    description: "Compras",
    amount: 200700.0,
    date: new Date("2026-02-07"),
    isPaid: false,
  },
  {
    description: "Prestamo Galicia",
    amount: 144000.0,
    date: new Date("2026-02-12"),
    isPaid: false,
  },
  {
    description: "Jubilacion",
    amount: 390000.0,
    date: new Date("2026-02-07"),
    isPaid: false,
  },
  {
    description: "Gptax",
    amount: 49000.0,
    date: new Date("2026-02-14"),
    isPaid: false,
  },
  {
    description: "Verisure",
    amount: 81097.2,
    date: new Date("2026-02-17"),
    isPaid: false,
  }
];
