const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();

const UserService = require("./../services/user.service");
const userService = new UserService();

authRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;

    console.log(body);
    const user = await userService.getUserByEmail(email);
    console.log("entro", user);

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, user.user_password);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });
    }

    const userForToken = {
      id: user.user_id,
      name: user.user_name,
      role: user.user_role,
    };

    console.log(userForToken);

    const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.send({
      name: user.user_name,
      email: user.user_email,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
