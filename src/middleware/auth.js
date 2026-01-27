export const authMiddleware = (req, res, next) => {
  const fakeUser = {
    id: 1,
    name: "Admin User",
    role: "admin"
  };

  req.user = fakeUser;
  next();
};
