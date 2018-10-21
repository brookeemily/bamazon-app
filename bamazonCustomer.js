
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
    // console.log(results);
    // console.log(results.item[0]);
    // for (var i = 0; i < results.length; i++) {
    //                     console.log(results[i].item_id);
                        // console.log(results[0].item_id);

        //                 choiceArray.push(results[i].product_name);
        //                 choiceArray.push(results[i].department_name);
        //                 choiceArray.push(results[i].price);
        //             }
    // start inquirer prompt
    inquirer
    .prompt([
        {

        name: "choice",
        type: "rawlist",
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
                // choiceArray.push(results[i].product_name);
                // choiceArray.push(results[i].department_name);
                // choiceArray.push(results[i].price);
            }
            return choiceArray;
        }
    }
    ])
    .then(function() {
    console.log("hi!");
    });
});
}


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.




