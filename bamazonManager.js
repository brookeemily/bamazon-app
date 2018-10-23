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
        switch (answer.menu) {
        // If a manager selects View Products for Sale
        case "View Products for Sale":
            console.log("Here are the products we have for sale!");
            // Run view products function
            viewProducts();
            break;
        
        case "View Low Inventory":
        viewLowInventory ();
        break;

        case "Add to Inventory":
        addInventory();
        break;
    
        case "Add New Product":
        addNewProduct();
        break;
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
        helloManager();
    }


    // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

function viewLowInventory() {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
            for (var i = 0; i < results.length; i++) {
                console.log("These are the items that are low in stock...")
                console.log("Item ID: " + results[i].item_id + " | Product Name: " +  results[i].product_name + " | Quantity in Stock " + results[i].stock_quantity);
            }
        });
    }
    

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
 // query the database for all items being auctioned
 connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "addInventory",
          type: "rawlist",
          choices: function() {
            var choiceArray2 = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray2.push("Product Name: " + results[i].product_name + " | Current Stock: " + results[i].stock_quantity);
            }
            return choiceArray2;
          },
          message: "Which item would you like to add inventory to?"
        },
        {
          name: "howManyToAdd",
          type: "input",
          message: "How many would you like to add?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem2;
        for (var i = 0; i < results.length; i++) {
          if (("Product Name: " + results[i].product_name + "Current Stock: " + results[i].stock_quantity) === answer.addInventory) {
            chosenItem2 = results[i];
            console.log(chosenItem2);
          }
        }

        // update stock of the chosen item
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (chosenItem2.stock_quantity + parseInt(answer.howManyToAdd))
              },
              {
                item_id: chosenItem2.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("You have successfully updated your stock!");
            helloManager();
            });
      });
  });
}

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
function addNewProduct() {
    // prompt for info about the item being put up for auction
  inquirer
  .prompt([
    {
      name: "newItemName",
      type: "input",
      message: "What is the item that you'd like to sell on Bamazon?"
    },
    {
      name: "newItemStock",
      type: "input",
      message: "How many do you have for sale?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "newItemPrice",
      type: "input",
      message: "What is the selling price of this product?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
        name: "newItemDepartment",
        type: "input",
        message: "What department is this item sold in?"
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.newItemName,
        stock_quantity: answer.newItemStock,
        price: answer.newItemPrice,
        department_name: answer.newItemDepartment
      },
      function(err) {
        if (err) throw err;
        console.log("You have added your new product to Bamazon!");
        // re-prompt the user for if they want to bid or post
        helloManager();
      }
    );
  });
}
