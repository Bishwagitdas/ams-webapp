const util = require('util');  // Import the util module

// Convert the query method to a Promise
const router = require("express").Router();
const connection = require("../../../connection");
const query = util.promisify(connection.query).bind(connection);

router.get("/getDiffRateID", async (req, res) => {
    try {
      const customerID = req.query.customerID;

      // console.log(customerName);
  
      if (!customerID) {
        return res.status(400).json({ error: "Customer ID is required" });
      }
  
      // Use the connection pool to query the database
      const [rows] = await query(
        "SELECT DiffRateID FROM DiffRate WHERE CustomerID = ?",
        customerID
      );

      console.log(rows)
        
      if (rows.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      const DiffRateID = rows.DiffRateID;

      console.log(DiffRateID);
      res.status(200).json({ DiffRateID });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  router.get("/getDiffRates",async(req,res)=>{
    connection.query('SELECT CustomerID,DiffRateID FROM diffrate', (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({message: "Failed to fetch Diffrates"});
      }
  
      res.status(200).json({send: "ok", data: results});
    });
  })

module.exports = router;
