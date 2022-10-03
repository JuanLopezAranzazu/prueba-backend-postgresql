require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const handleErrors = require("./middleware/handleErrors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const authRouter = require("./routes/auth.router");
const saleRouter = require("./routes/sale.router");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sales", saleRouter);

app.use(handleErrors);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
