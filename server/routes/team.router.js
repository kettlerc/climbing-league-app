const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM team
    `;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
            console.log('result is:', result.rows);      
        }) .catch (err => {
            console.error('GET teams error', err);
            res.sendStatus(500)
        })
});

router.get('/userinfo', (req, res) => {
    const sqlQuery = `
        SELECT
	        "firstName",
	        "lastName",
            "flashLevel",
            "photo",
            "teamName"
        FROM "team"
        JOIN "user" ON "user"."teamId" = "team"."id";
    `;
    pool.query(sqlQuery)
        .then(result => {
            res.send(result.rows);
            console.log('user info:', result.rows);      
        }) .catch (err => {
            console.error('GET teams error', err);
            res.sendStatus(500)
        })
});

module.exports = router;