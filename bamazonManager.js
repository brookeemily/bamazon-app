// include required packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    
    port: 3306,
    
    user: "root",
    password: "password",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    helloManager();
});

// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


// Running this application will first display all of the items available for sale...
//Include the ids, names, and prices of products for sale.

function helloManager() {
    // START INQUIRER   
    inquirer
    // START PROMPT
    .prompt([
        // WHAT ITEM DO YOU WANT?
        {
            name: "menu",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Welcome, Bamazon Manager. What would you like to do?"
        }
    ])
    .then(function(answer) {
        // If a manager selects View Products for Sale
        if (answer.menu === "View Products for Sale") {
            console.log("Here are the products we have for sale!");
            // Run view products function
            viewProducts();
        }
    });
}

function viewProducts() { 
// call the data from the products table in the bamazon database
// the app should list every available item: the item IDs, names, prices, and quantities.
connection.query("SELECT * FROM products", function(err, results) {
            for (var i = 0; i < results.length; i++) {
                console.log("Item ID: " + results[i].item_id + " | Product Name: " +  results[i].product_name + " | Price: " + "$" + results[i].price + " | Quantity in Stock " + results[i].stock_quantity);
            }
        });
    }