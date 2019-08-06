const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/name', (req,res)=> {

  console.log('req.user.id', req.user.id);
  console.log('req.body', req.body)
  
  const sqlText = `INSERT INTO "routine" ("routineName", "day", "user_id")
                    Values($1, $2, $3);`
  values = [req.body.routineName, req.body.day, req.user.id]
  pool.query(sqlText, values)
  .then((response)=> {
    res.sendStatus(201)
  })
  .catch((error)=> {
    console.log('Error running POST To the DATABASE', error);
    
    res.sendStatus(500)
  })


})

module.exports = router;