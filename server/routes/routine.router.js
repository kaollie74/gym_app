const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// This POST will post ROUTINE NAME and the DAY
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

router.post('/activity', (req, res) => {

  console.log('req.user.id', req.user.id);
  console.log('req.body', req.body)

  const sqlText = `INSERT INTO "activity" ("body_part","exercise", "sets", "reps", "comment")
                    Values($1, $2, $3, $4, $5);`
  values = [req.body.body_part, req.body.exercise, req.body.sets, req.body.reps, req.body.comments]
  pool.query(sqlText, values)
    .then((response) => {
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log('Error running POST To the DATABASE', error);

      res.sendStatus(500)
    })


})

router.get('/name', (req,res)=> {
  const sqlText = `SELECT * FROM "routine" WHERE id=$1;`;
  values = [req.user.id]
  pool.query(sqlText, values)
  .then((response)=> {
    res.send(response.rows)
  })
  .catch((error)=> {
    console.log('Error getting Routine from DB', error);
    res.sendStatus(500);
    
  })
})



module.exports = router;