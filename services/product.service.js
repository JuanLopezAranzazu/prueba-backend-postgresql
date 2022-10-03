const pool = require("./../postgres");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.pool.query(
        'SELECT * FROM public."product" WHERE true',
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res.rows);
            resolve(res.rows);
          }
        }
      );
    });
  }

  getOneProduct(productId) {
    console.log(productId);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'SELECT * FROM public."product" WHERE product_id = $1',
        [productId],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res.rows[0]);
            resolve(res.rows[0]);
          }
        }
      );
    });
  }

  createProduct(dataForProduct) {
    const { name, price, stock, category } = dataForProduct;
    console.log(dataForProduct);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."product"(product_name, product_price, product_stock, category_id) VALUES($1,$2,$3,$4)',
        [name, price, stock, category],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  }

  updateProduct(productId, dataForProduct) {
    const { name, price, stock, category } = dataForProduct;
    console.log(productId, dataForProduct);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'UPDATE public."product" SET product_name = $1, product_price = $2, product_stock = $3, category_id = $4 WHERE product_id = $5',
        [name, price, stock, category, productId],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  }
}

module.exports = UserService;
