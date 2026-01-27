import { prisma } from "../prisma.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // verificar si existe
    const exists = await prisma.user.findUnique({
      where: { email }
    });

    if (exists) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const user = await prisma.user.create({
      data: { name, email, password, role }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando usuario" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Contraseña incorrecta" });
  }
  res.json({
    message: "Login exitoso",
    user
  });
  } catch (error) {
    console.log({error})
    return res.json({error})
  }

}


export const getProfile = async (req, res) => {
  try {
    const user = req.user; // viene del middleware
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo perfil" });
  }
};
