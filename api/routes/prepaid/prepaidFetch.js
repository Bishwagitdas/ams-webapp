const router =require("express").Router();
const connection = require('../../connection');

router.get('/getPrepaidTable/:MonthName/:CustomerID', (req, res) => {
    const MonthName = req.params.MonthName;
    const CustomerID = req.params.CustomerID;
   // console.log(CustomerID);
    // Use a parameterized query to prevent SQL injection
    const query = `SELECT * FROM Prepaidorder WHERE MonthName = ? AND CustomerID = ?`;
    connection.query(query, [MonthName,CustomerID], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch entries for the selected month" });
        }

        res.status(200).json({ send: "ok", data: results });
    });
});


  module.exports = router;