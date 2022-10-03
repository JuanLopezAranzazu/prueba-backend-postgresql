CREATE TABLE "point_sale"
(
  point_sale_id SERIAL NOT NULL,
  point_sale_city CHARACTER VARYING(255) NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (point_sale_id)
);

CREATE TABLE "user"
(
  user_id SERIAL NOT NULL,
  user_name CHARACTER VARYING(255) NOT NULL,
  user_role CHARACTER VARYING(255) NOT NULL,
  user_email CHARACTER VARYING(255) NOT NULL,
  user_password CHARACTER VARYING(255) NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	point_sale_id INTEGER NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT "fk_point_sale_id" FOREIGN KEY (point_sale_id)
  REFERENCES "point_sale" (point_sale_id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
  NOT VALID
);

CREATE TABLE "category"
(
  category_id SERIAL NOT NULL,
  category_name CHARACTER VARYING(255) NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (category_id)
);

CREATE TABLE "product"
(
  product_id SERIAL NOT NULL,
  product_name CHARACTER VARYING(255) NOT NULL,
  product_price DECIMAL NOT NULL,
  product_stock INTEGER NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	category_id INTEGER NOT NULL,
  PRIMARY KEY (product_id),
  CONSTRAINT "fk_category_id" FOREIGN KEY (category_id)
  REFERENCES "category" (category_id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
  NOT VALID
);
