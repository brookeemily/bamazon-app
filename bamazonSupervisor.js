// include required packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


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
    helloSupervisor();
});


// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


// Running this application will first display all of the items available for sale...
//Include the ids, names, and prices of products for sale.

function helloSupervisor() {
    // START INQUIRER   
    inquirer
    // START PROMPT
    .prompt([
        // WHAT ITEM DO YOU WANT?
        {
            name: "menu",
            type: "list",
            choices: ["View Products Sales by Department", "Create New Department"],
            message: "Welcome, Bamazon Supervisor. What would you like to do?"
        }
    ])
    .then(function(answer) {
        switch (answer.menu) {
        // If a manager selects View Products for Sale
        case "View Products Sales by Department":
            console.log("Here are the product sales by department....");
            // Run view products function
            viewSalesByDept();
            break;
        
        case "Create New Department":
        createNewDept ();
        break;
        }
    });
}


function viewSalesByDept() { 
    // instantiate
    var query = "SELECT * FROM departments INNER JOIN products ON (departments.department_name = products.department_name)"

    connection.query(query, function(err, results) {
        
    var table = new Table({
        head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
    });
            for (var i = 0; i < results.length; i++) {
            table.push(
                [results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].product_sales, ((results[i].product_sales) - (results[i].over_head_costs))],
                // [results[2].department_id, results[2].department_name, results[2].over_head_costs, results[2].product_sales, ((results[2].product_sales) - (results[2].over_head_costs))],
                // [results[3].department_id, results[3].department_name, results[3].over_head_costs, results[3].product_sales, ((results[3].product_sales) - (results[3].over_head_costs))],
                
            );
        }
            console.log(table.toString());
        // }
        });
        }
// Create New Department
    function createNewDept() {
    inquirer
  .prompt([
    {
        name: "addNewDept",
        type: "input",
        message: "What is the name of the new department?"
    },
    {
        name: "addOverheadCost",
        type: "input",
        message: "What is the overhead cost of this department?", 
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: answer.addNewDept,
       over_head_costs: answer.addOverheadCost
      },
      function(err) {
        if (err) throw err;
        console.log("You have added your new department to Bamazon!");
        // re-prompt the user for if they want to bid or post
        helloSupervisor();
      }
    );
  });
    }