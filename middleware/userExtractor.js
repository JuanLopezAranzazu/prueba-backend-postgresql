const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

const checkRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    const { user } = req;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { checkRoles, verifyToken };
