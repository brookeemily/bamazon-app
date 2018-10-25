DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT(5) NOT NULL,
    product_sales DECIMAL(7, 2)  NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NOT NULL,
    over_head_costs DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (department_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES("toothbrush", "beauty & health", 5.39, 100, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES("basketball", "sports & outdoors", 15.00, 40, 1000 );

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES("Joyce Manor LP", "music", 25, 20, 15000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES("super rare beanie baby", "toys, kids & baby", 999.99, 2, 90000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("toys, kids & baby", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("sports & outdoors", 5000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("beauty & health", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("music", 5000);


USE bamazon;
SELECT * FROM products;

SELECT * FROM departments;
