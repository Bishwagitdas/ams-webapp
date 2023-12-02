const util = require('util');  // Import the util module

// Convert the query method to a Promise
const router = require("express").Router();
const connection = require('../../connection');
const query = util.promisify(connection.query).bind(connection);

router.get("/getCustomerID", async (req, res) => {
    try {
      const EncryptedID = req.query.EncryptedID;

      // console.log(customerName);
  
      if (!EncryptedID) {
        return res.status(400).json({ error: "Customer name is required" });
      }
  
      // Use the connection pool to query the database
      const [rows] = await query(
        "SELECT CustomerID FROM Customer WHERE EncryptedID = ?",
        EncryptedID
      );

      //  console.log(rows)
        
      if (rows === undefined) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      const customerID = rows.CustomerID;

      // console.log(customerID);
      res.status(200).json({ customerID });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });

module.exports = router;
