const ProductService = require("../services/product.service");
const productRouter = require("express").Router();
const productService = new ProductService();

const { checkRoles, verifyToken } = require("./../middleware/userExtractor");

productRouter.get(
  "/",
  verifyToken,
  checkRoles("admin", "user"),
  async (req, res, next) => {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get(
  "/:id",
  verifyToken,
  checkRoles("admin", "user"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.getOneProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.post(
  "/",
  verifyToken,
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { name, price, stock, category } = body;

      const dataForProduct = {
        name,
        price,
        stock,
        category,
      };
      const savedProduct = await productService.createProduct(dataForProduct);

      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productRouter;
