# bamazon-app

### What is Bamazon?
Bamazon is an Amazon-like storefront application. Bamazon is a Javascript application that uses inquirer and cli-table to collect and display Bamazon's data to the user.  All of Bamazon's data is stored in a MySQL database that is referenced & updated depending on user input. 

### How does Bamazon Work?
Bamazon has three components: Bamazon Customer, Bamazon Manager, and Bamazon Supervisor


##### Bamazon Customer
Bamazon Customer allows the user to order items from the Bamazon database. 
> ``` node bamazonCustomer.js ```

Running bamazonCustomer.js will bring up the "Welcome to Bamazon" page where the user will be presented with the items currently in stock along with their item IDs and prices.
![Image of Terminal](https://i.imgur.com/IlKUB7C.png)

To select what item they would like to purchase, the user must enter the item ID that corresponds to the item they'd like to buy.
![Image of Terminal](https://i.imgur.com/hKlXEq2.png)

After selecting an item, the user will be asked how many units of the item they would like to purchase.
![Image of Terminal](https://i.imgur.com/j17dITp.png)

If the order is successful, Bamazon will tell the user that they have placed their order & will display the price of their order.
![Image of Terminal](https://i.imgur.com/bDTkBGs.png)

If the order is unsuccessful, Bamazon will let the user know & prompt them to restart the ordering process.
![Image of Terminal](https://i.imgur.com/CtoFTlz.png)

#### Bamazon Manager
Bamazon Manager allows the user to manage the Bamazon database. 
> ``` node bamazonManager.js ```

Running bamazonManager.js will bring up the "Welcome, Bamazon Manager" page where the user will be presented with the four manager functions. The Bamazon Manager can view products for sale, view items with low inventory, restock items, and add new products to the store.
![Image of Terminal](https://i.imgur.com/kvvdSWM.png)

If the user selects "View Products for Sale", the application will display all of the current products along with their ID, price, and quantity in stock.
![Image of Terminal](https://i.imgur.com/nl40PXW.png)

If the user selects "View Low Inventory"... 
![Image of Terminal](https://i.imgur.com/KtB8wf8.png)
Using the MySQL database, the application will display any products that have less than 5 units in stock.
![Image of Terminal](https://i.imgur.com/x8zq06G.png)

If the user selects "Add to Inventory"...
![Image of Terminal](https://i.imgur.com/L104RvY.png)

They will be prompted to select the item & how many units of the item they'd like to restock
![Image of Terminal](https://i.imgur.com/Nq4wvOJ.png)

The Bamazon Manager application will update the MySQL database and confirm that the stock has been updated
![Image of Terminal](https://i.imgur.com/KYmgiqg.png)

If the user selects "Add New Product..."
![Image of Terminal](https://i.imgur.com/LUQQMRm.png)

The user will be prompted to enter all of the product's information
![Image of Terminal](https://i.imgur.com/pmhHwaE.png)

The Bamazon MAnager application will update the MySQL database and confirm that the new item has been added to the store.
![Image of Terminal](https://i.imgur.com/AjGUS3I.png)

#### Bamazon Supervisor
Bamazon Supervisor allows the user to supervise the Bamazon database.
> ``` node bamazonSupervisor.js ```

Running bamazonSupervisor.js will bring up the "Welcome, Bamazon Supervisor" page where the user will be presented with the two supervisor functions. The Bamazon Manager can view each department's profits and can add a new department to the store
![Image of Terminal](https://i.imgur.com/XM2cjwb.png)

If the user selects "Create New Department", they will be prompted to enter the name of the department and the overhead costs of the department
![Image of Terminal](https://i.imgur.com/CSc2l9j.png)

The Bamazon Supervisor application will confirm that the new department has been created & will update the Bamazon databse
![Image of Terminal](https://i.imgur.com/IJSottP.png)

The Bamazon Supervisor can also View Products Sales by Department...
![Image of Terminal](https://i.imgur.com/PTIlSKY.png)
This function combines Bamazon's product information & department information to display the department ID, department name, department's overhead costs, product sales, and total profits.
The application uses an npm package called "cli-table" to display the data.

