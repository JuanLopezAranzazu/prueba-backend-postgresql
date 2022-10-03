const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");

const userRouter = require("express").Router();
const userService = new UserService();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { name, email, role, password, pointSale } = body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const dataForUser = {
      name,
      email,
      role,
      password: passwordHash,
      pointSale,
    };
    const savedUser = await userService.createUser(dataForUser);

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
