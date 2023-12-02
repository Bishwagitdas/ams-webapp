const mysql = require("mysql2");
const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Jamil-2358",
  database: "scs_erp",
  // connectTimeout:10
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});
module.exports = connection;
