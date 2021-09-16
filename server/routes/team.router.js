const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * FROM team
    `;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
            console.log('result is:', result.rows);      
        }) 
        .catch (err => {
            console.error('GET teams error', err);
            res.sendStatus(500)
        })
});



module.exports = router;