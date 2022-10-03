const pool = require("./../postgres");
const ProductService = require("./product.service");
const productService = new ProductService();

class SaleService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  getSales() {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM public."sale" WHERE true', (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(res.rows);
          resolve(res.rows);
        }
      });
    });
  }

  createSale(dataForSale) {
    const { userId, productId, amount } = dataForSale;
    console.log(dataForSale);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."sale"(user_id, product_id, sale_amount) VALUES($1,$2,$3)',
        [userId, productId, amount],
        async (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            const product = await productService.getOneProduct(productId);
            const { product_name, product_price, product_stock, category_id } =
              product;
            console.log(product);
            await productService.updateProduct(productId, {
              name: product_name,
              price: product_price,
              stock: product_stock - amount,
              category: category_id,
            });
            resolve(res);
          }
        }
      );
    });
  }
}

module.exports = SaleService;
