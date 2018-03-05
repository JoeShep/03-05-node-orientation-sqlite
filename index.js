const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("acme.sqlite");
const { customers } = require("./customers");
const { orders } = require("./orders");

db.run("DROP TABLE IF EXISTS customers");
db.run("DROP TABLE IF EXISTS orders");

// Create tables and their schema
db.run(
  "CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, address TEXT)"
);

db.run(
  "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, orderDate TEXT, amount DECIMAL, customerId INTEGER)"
);

// Insert data into the tables
orders.forEach(({ orderDate, amount, customerId }) => {
  db.run(
    `INSERT INTO orders VALUES (null, "${orderDate}", ${amount}, ${customerId})`
  );
});

customers.forEach(({ firstName, lastName, address }) => {
  db.run(
    `INSERT INTO customers VALUES (null, "${firstName}", "${lastName}", "${address}")`
  );
});

// Query the db
// setTimeout(() => {
//   db.all(
//     `SELECT orderDate, amount
//   FROM orders o
//   JOIN customers c
//   ON o.customerId = c.id
//   WHERE c.id = 2`,
//     (err, data) => {
//       if (err) {
//         return console.log("Dang", err.toString());
//       }
//       console.log("all orders placed by a cust with id of 2", data);
//     }
//   );
// }, 1500);

setTimeout(() => {
  db.each(
    `SELECT orderDate, amount
  FROM orders o
  JOIN customers c
  ON o.customerId = c.id
  WHERE c.id = 2`,
    (err, data) => {
      if (err) {
        return console.log("Dang", err.toString());
      }
      console.log("an order placed by a cust with id of 2", data);
    }
  );
}, 1500);
