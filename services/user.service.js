const pool = require("./../postgres");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM public."user" WHERE true', (err, res) => {
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

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.pool.query(
        'SELECT * FROM public."user" WHERE user_email = $1',
        [email],
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

  createUser(dataForUser) {
    const { name, email, role, password, pointSale } = dataForUser;
    console.log(dataForUser);
    return new Promise((resolve, reject) => {
      this.pool.query(
        'INSERT INTO public."user"(user_name, user_email, user_role, user_password, point_sale_id) VALUES($1,$2,$3,$4,$5)',
        [name, email, role, password, pointSale],
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
