var mysql = require("mysql");
var inquirer = require("inquirer");
// var table = require("table");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Dovedov9",
    database: "bamazonManager_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer.prompt({
        name: "options",
        type: "list" ,
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer){
        if (answer.options === "View Products for Sale"){
            viewProducts();
        }
        else if(answer.options === "View Low Inventory"){
            viewInventory();
        }
        else if(answer.options === "Add to Inventory"){
            addInventory();
        }
        else if(answer.options === "Add New Product"){
            addProduct();
        } else{
            connection.end();
        }

    });
}

function viewProducts(){
    //query database for viewing all items
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
    });     
    start(); 
}

//function to view inventory with a quantity lower than 5
function viewInventory(){
      connection.query("SELECT name, quantity FROM products WHERE quantity <= 5", function(err, res) {
          if(err)throw err;
          console.log(res);
    });
    start();
  }

  function addProduct(){
      inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "What is the item you would like to submit?"
    },
    {
      name: "price",
      type: "input",
      message: "What is the price for this item?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to add?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer){
      //allows user to insert product after prompt
      connection.query(
          "INSERT INTO products SET ?" ,
          {
              name: answer.name,
              price: answer.price,
              quantity: answer.quantity,
          },
          function(err) {
              if (err) throw err;
              console.log("Your item has been added!");
              //re-prompt the user for if they want to add another product
              start();
          }
      );
  });
}

  function addInventory() {
      inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "What is the item you would like to update?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to add?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer){
      console.log("Updating product ...\n");
      connection.query(
        "UPDATE products SET quantity = ? WHERE name = ?",
        [
          {
              // id: answer.id,
              quantity: answer.quantity
              
          },
          answer.name
        ],
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
          // deleteProduct(answer);

          viewProducts();
        }
      );
      start();
      }) 
  }