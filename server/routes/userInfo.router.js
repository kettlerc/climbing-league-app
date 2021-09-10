const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  const sqlQuery =`
  SELECT
    "firstName",
    "lastName",
    "flashLevel",
    "photo",
    "teamName"
  FROM "user"
  JOIN "team" ON "user"."teamId" = "team"."id"
  WHERE "user"."id" = $1;
  `;
  const sqlParams = [
    req.params.id
  ];
  pool.query(sqlQuery, sqlParams)
    .then(result => {
      res.send(result.rows);
      console.log('userinfo result is', result.rows);    
    }).catch(err => {
      console.error('GET id info error', err)
      res.sendStatus(500);
    })
});

module.exports = router;