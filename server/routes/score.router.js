const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery =`
        SELECT
            "date",
            "climbGrade",
            "climbScore",
            "isSubmitted"
        FROM "scores"
        JOIN "user" on "scores"."climberId" = "user"."id"
        WHERE "climberId" = $1
        ORDER BY 
            "date";
    `;
    const sqlParams = [
        req.user.id
    ];
    pool.query(sqlQuery, sqlParams)
        .then(result => {
            res.send(result.rows);
            console.log('recent climbs:', result.rows);   
        })
        .catch (err => {
            console.error('GET recent climbs error', err);
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    sqlQuery=`
        INSERT INTO "scores"
        ("climbType", "climbGrade", "isFlash", "isOnSight", "isBonus", "isSubmitted", "climbScore", "climberId")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    sqlParams = [
        req.body.climbType,
        req.body.climbGrade,
        req.body.isFlash,
        req.body.isOnSight,
        req.body.isBonus,
        req.body.isSubmitted,
        req.body.climbScore,
        req.body.climberId
    ];
    pool.query(sqlQuery, sqlParams)
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('add climb failed', err);
            res.sendStatus(500);
        });
});

router.put('/', (req, res) => {
    sqlQuery =`
        UPDATE "scores"
        SET "isSubmitted" = true
        WHERE "id" IN ($1, $2, $3);
    `;
    sqlParams = [
        req.body
    ];
    console.log('id is', sqlParams);
    pool.query(sqlQuery)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('submit scores failed', err);
            res.sendStatus(500);
        })
    
})


module.exports = router;