const util = require('util');  // Import the util module

// Convert the query method to a Promise
const router = require("express").Router();
const connection = require('../connection');
const query = util.promisify(connection.query).bind(connection);

//`http://localhost:4000/maintable/getAllInfo?CustomerID=${getID}`

router.get(`/getAllInfo`, async (req, res) => {
    const CustomerID = req.query.CustomerID;
    if (!CustomerID) {
        return res.status(400).json({ error: "Customer name is required" });
      }
    try{
        const rows = await query(
            "SELECT * FROM MainTable WHERE CustomerID = ?",
            CustomerID
        );

        console.log(rows);
        if (rows.length === 0 ) return res.status(404).json({ error: "Customer not found" });

        res.status(200).json({rows});
    } catch (err){
        console.error('Error in API:',err);
        res.status(500).json({ error: "An error occurred" });
    }
})

module.exports = router;