
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
    welcomeToBamazon();
});



// Running this application will first display all of the items available for sale...
//Include the ids, names, and prices of products for sale.

function welcomeToBamazon() {
    // call the data from the products table in the bamazon database
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    // START INQUIRER   
    inquirer
    // START PROMPT
    .prompt([
        // WHAT ITEM DO YOU WANT?
        {
        name: "choice",
        type: "rawlist",
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name + " " + "$" + results[i].price);
            }

            return choiceArray;
        },
        message: "Welcome to Bamazon! Here are the items we have for sale today. Please type the ID of the product you would like to buy."
    },
    // HOW MANY DO YOU WANT?
        {
        name: "howMany",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }
    ])
    .then(function(answer) {
        console.log(answer.choice);
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
    // console.log(answer.howMany);
    // get the information for the item chosen
    var chosenItem;
    for (var i = 0; i < results.length; i++) {
        if ((results[i].product_name + " " + "$" + results[i].price)  === answer.choice) {
            chosenItem = results[i];
            console.log(chosenItem);
        }
    }
    // COMPARE HOW MANY THE PERSON WANTS TO BUY WITH THE STOCK LEFT

    // if enough items in stuck....
    if (chosenItem.stock_quantity >= parseInt(answer.howMany)) {
    // update the stock quantity in the database
    connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: (chosenItem.stock_quantity - parseInt(answer.howMany))
      },
      {
        item_id: chosenItem.item_id
      }
    ],
    function(error) {
      if (error) throw err;
      // Tell user that the order was successful...
      console.log("Order placed successfully! Your order costs: $" + (chosenItem.price * answer.howMany));
      // Go back to beginning
      welcomeToBamazon();
    }
  );
}
else {
  // Stock wasn't high enough :(
  console.log("Sorry we don't have enough items to complete your order :(. Please try again...");
  // restart!
  welcomeToBamazon();
}
});
});
    });
}
