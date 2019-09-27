const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('REQ.BODY', req.body)
  console.log('IN ACTIVITY ROUTER GET/:id', req.params.id);
  const sqlText = `SELECT * FROM "activity" WHERE "routine_id" = $1;`;
  value = [req.params.id];
  pool.query(sqlText, value)
    .then((response) => {
      console.log('This is the response.rows from /get:id', response.rows)
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error retrieving the activities from the "activity" table', error);
      res.sendStatus(500);
    })


})

// POST an activity to the database
router.post('/', rejectUnauthenticated, (req, res) => {

  //console.log('req.user.id', req.user.id);

  //console.log('req.routineSingle.id', req.routineSingle.id)


  const sqlText = `INSERT INTO "activity" ("body_part","exercise", "sets", "reps", "comment", "routine_id")
                    Values($1, $2, $3, $4, $5, $6);`
  values = [
    req.body.body_part,
    req.body.exercise,
    req.body.sets,
    req.body.reps,
    req.body.comments,
    req.body.routine_id
  ]
  pool.query(sqlText, values)
    .then((response) => {
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log('Error running POST To the DATABASE', error);

      res.sendStatus(500)
    })


})


router.delete('/delete/:id', rejectUnauthenticated, (req,res) => {

  console.log('HITTING THE DELETE ROUTE', req.params.id)

  const sqlText = `DELETE FROM "activity" WHERE "id" = $1`
  const value = [req.params.id]
  pool.query(sqlText, value)
  .then((response)=> {
    res.sendStatus(200)
  })
  .catch((error)=> {
    console.log('Error Removing Activity from the Database', error);
    res.sendStatus(500);
  })
})

router.put('/update/:id', rejectUnauthenticated, (req,res)=> {
  console.log('In router.put', req.body)
  const sqlText = `UPDATE "activity" SET "exercise"=$1, "reps"=$2, "sets"=$3, "body_part"=$4, "comment"=$5 WHERE "id"=$6`
  values = [req.body.exercise, req.body.reps, req.body.sets, req.body.body_part, req.body.comments, req.body.id ]
  pool.query(sqlText, values)
  .then((response)=> {
    res.sendStatus(201)
  })
  .catch((error)=> {
    console.log('In router.put, error with posting to the database', error);
    res.sendStatus(500);
  })
})


module.exports = router;