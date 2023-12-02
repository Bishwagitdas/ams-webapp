const util = require('util');
const router = require('express').Router();
const connection = require('../connection');

// Convert the query method to a Promise
const query = util.promisify(connection.query).bind(connection);

router.get('/getMainTable', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM MainTable');

    console.log(rows);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error in API:', err);
    res.status(500).json({ error: `An error occurred: ${err.message}` });
  }
});

module.exports = router;
