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


// This route will POST the ACTIVITY in the 'activity' table
// each activity represents a row in that table. A row will signify
// an individual exercise, sets, reps, etc..
// router.post('/activity', (req, res) => {

//   //console.log('req.user.id', req.user.id);
//   console.log('req.body', req.body);
//   //console.log('req.routineSingle.id', req.routineSingle.id)
  

//   const sqlText = `INSERT INTO "activity" ("body_part","exercise", "sets", "reps", "comment", "routine_id")
//                     Values($1, $2, $3, $4, $5, $6);`
//   values = [req.body.body_part, req.body.exercise, req.body.sets, req.body.reps, req.body.comments, req.body.routine_id]
//   pool.query(sqlText, values)
//     .then((response) => {
//       res.sendStatus(201)
//     })
//     .catch((error) => {
//       console.log('Error running POST To the DATABASE', error);

//       res.sendStatus(500)
//     })


// })


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