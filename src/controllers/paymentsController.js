import { prisma } from "../prisma.js";

export const getPayments = async (req, res) => {

  try {
    const payments = await prisma.payment.findMany()
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching payments" });
  }
};


/*export const getPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    let { year, month } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const now = new Date();

    // Valores por defecto si no se pasan en la query
    year = year ? Number(year) : now.getFullYear();
    month = month ? Number(month) : now.getMonth() + 1;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const payments = await prisma.payment.findMany({
      where: {
        userId: Number(userId),
        date: {
          gte: startDate,
          lt: endDate
        }
      }
    });
    console.log('getPaymentsByUserId',payments)

    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching payments by userId" });
  }
};*/



export const getPaymentsByUserAndDate = async (req, res) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Si faltan mes o año, devolvemos todo del usuario
    if (!year || !month) {
      const payments = await prisma.payment.findMany({
        where: { userId: Number(userId) },
      });
      return res.json(payments);
    }

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 1);
    const payments = await prisma.payment.findMany({
      where: {
        userId: Number(userId),
        date: {
          gte: startDate,
          lt: endDate
        }
      },
      orderBy: {
        date: "asc", // 👈 acá manda la fecha, no createdAt
      },
    });
    res.json(payments);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error filtering payments" });
  }
};

export const getPaymentsByUserAndYear = async (req, res) => {
  try {
    const { userId, year } = req.params;

    if (!userId || !year) {
      return res.status(400).json({ error: "userId and year are required" });
    }

    const yearNum = Number(year);
    const startDate = new Date(yearNum, 0, 1);
    const endDate = new Date(yearNum + 1, 0, 1);

    const payments = await prisma.payment.findMany({
      where: {
        userId: Number(userId),
        isDeleted: false,
        date: {
          gte: startDate,
          lt: endDate,
        }
      },
      orderBy: {
        date: "asc"
      }
    });
    res.json(payments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching annual payments" });
  }
};




export const createPayment = async (req, res) => {
  console.log('create', req.body)
  try {
    const {
      description,
      amount,
      date,
      isPaid,
      paymentMethod,
      receipt,
      userId,
    } = req.body;

    if (
      !userId ||
      !description ||
      !amount ||
      !date ||
      typeof isPaid !== "boolean"
    ) {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }

    const payment = await prisma.payment.create({
      data: {
        description,
        amount: Number(amount),
        date: new Date(date),
        isPaid,
        paymentMethod: isPaid ? paymentMethod : null,
        receipt: isPaid ? receipt : null,
        userId: Number(userId),
      },
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating payment" });
  }
};




export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, isPaid } = req.body;

    const updated = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        description,
        amount: Number(amount),
        date: new Date(date),
        isPaid: Boolean(isPaid)
      }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating payment" });
  }
};

export const markAsDonePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        isPaid: true
      }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating payment" });
  }
};

export const deletePayment = async (req, res) => {
  console.log('deleting', req.body)
  try {
    const { id } = req.params;

    const updated = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting payment" });
  }
};
