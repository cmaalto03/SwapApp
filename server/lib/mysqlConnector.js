// Load module
var mysql = require("mysql");
// Initialize pool
var pool = mysql.createPool({
  connectionLimit: 100,
  host: "swapapp.cbxst3z1494n.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "d8KV26Dt0WY1",
  database: "swappapp_data",
  debug: false,
});

//create mysql connection pool
var dbconnection = mysql.createPool(pool);

// Attempt to catch disconnects
dbconnection.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});
module.exports = pool;
