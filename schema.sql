DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT(5) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("toothbrush", "beauty & health", 5.39, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("basketball", "sports & outdoors", 15.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("tent", "sports & outdoors", 95.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("super rare beanie baby", "toys, kids & baby", 999.99, 2);

USE bamazon;
SELECT * FROM products;
