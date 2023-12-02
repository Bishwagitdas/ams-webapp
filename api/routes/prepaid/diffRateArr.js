const util = require('util');  // Import the util module

// Convert the query method to a Promise
const router = require("express").Router();
const connection = require("../../connection");

router.get('/diffRateArr', (req, res) => {
    try{
        const CustomerID = req.query.CustomerID;

        // const query = 'SELECT * FROM DiffRate WHERE DiffRateID = ?',
        // diffRateID;
        connection.query('SELECT * FROM DiffRate WHERE CustomerID = ?',
        CustomerID, (err, results) => {
            if (err){
                console.log('Database query error: ' + err.message);
                res.status(500).json({ error: 'Database error' });
            } else {
                const weightsAndRates = [[], []];
                results.forEach((row) => {
                  for (let i = 1; i <= 5; i++) {
                    weightsAndRates[0].push(row[`tillW${i}`]);
                    weightsAndRates[1].push(row[`val${i}`]);
                  };
                });
                res.json(weightsAndRates);
            };
        }); 
    } catch (err){
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;