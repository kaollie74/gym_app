const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// This POST will post ROUTINE NAME and the DAY
// in the Routine Table
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



// GET all "routine_names" and "days" from "routine" table
router.get('/name', (req,res)=> {
  console.log(req.body.id);
  const sqlText = `SELECT * FROM "routine";`;
  
  pool.query(sqlText)
  .then((response)=> {
    
    res.send(response.rows)
  })
  .catch((error)=> {
    console.log('Error getting Routine from DB', error);
    res.sendStatus(500);
    
  })
})

// GET single routine from 'routine' table by selecting its 'id'
router.get('/name/:id', (req, res) => {
  console.log(req.body.id);
  const sqlText = `SELECT * FROM "routine" WHERE "id"= $1;`;
  value = [req.params.id]

  pool.query(sqlText, value)
    .then((response) => {

      res.send(response.rows[0])
    })
    .catch((error) => {
      console.log('Error getting Routine from DB', error);
      res.sendStatus(500);

    })
})



module.exports = router;