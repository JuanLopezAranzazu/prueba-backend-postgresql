const SaleService = require("../services/sale.service");
const saleRouter = require("express").Router();
const saleService = new SaleService();

const { checkRoles, verifyToken } = require("./../middleware/userExtractor");

saleRouter.get(
  "/",
  verifyToken,
  checkRoles("admin", "user"),
  async (req, res, next) => {
    try {
      const sales = await saleService.getSales();
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }
);

saleRouter.post(
  "/",
  verifyToken,
  checkRoles("admin", "user"),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { body } = req;
      const { productId, amount } = body;

      console.log(body);
      const dataForSale = {
        userId: id,
        productId,
        amount,
      };
      const savedSale = await saleService.createSale(dataForSale);

      res.status(201).json(savedSale);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = saleRouter;
