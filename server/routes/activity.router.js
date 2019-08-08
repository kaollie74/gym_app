const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log('IN ACTIVITY ROUTER GET', req.params.id);
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

router.post('/', (req, res) => {

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


module.exports = router;