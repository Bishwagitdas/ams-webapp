const router =require("express").Router();
const connection = require('../../connection');

router.get('/getCustomer', (req, res) => {
    connection.query('SELECT * FROM Customer', (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({message: "Failed to fetch all users"});
      }
  
      res.status(200).json({send: "ok", data: results});
    });
  });
  router.get('/getSingleCustomer/:id', (req, res) => {
    const CustomerID = req.params.id;
  
    connection.query('SELECT * FROM customer WHERE CustomerID = ?', [CustomerID], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(404).json({message: "Customer fetch failed"});
      }
      if (results.length === 0){
        return res.status(404).json({message: "Customer not found"});
      }
  
      res.status(200).json(results[0]);
    });
  });
  module.exports = router;