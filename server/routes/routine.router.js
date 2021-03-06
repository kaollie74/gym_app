const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// This POST will post ROUTINE NAME and the DAY
// in the Routine Table
router.post('/name', rejectUnauthenticated, (req,res)=> {

  console.log('req.user.id', req.user.id);
  console.log('req.body', req.body)
  
  const sqlText = `INSERT INTO "routine" ("routineName", "day_id", "user_id", "image")
                    Values($1, $2, $3, $4);`
  values = [req.body.routineName, req.body.day, req.user.id, req.body.image]
  pool.query(sqlText, values)
  .then((response)=> {
    res.sendStatus(201)
  })
  .catch((error)=> {
    console.log('Error running POST To the DATABASE', error);
    
    res.sendStatus(500)
  })

})

// when the checkbox on the table is checked/unchecked this runs
// to change 'completed' to false or true
router.put('/update/:id', rejectUnauthenticated, (req,res)=> {
  console.log('req.body', req.body);
  console.log('req.params',req.params)
  const sqlText = `UPDATE "routine" SET "completed"=$1 WHERE "id"=$2;`;
  values = [req.body.completed, req.params.id]
  pool.query(sqlText, values)
  .then((response)=> {
    res.sendStatus(200);
  })
  .catch((error)=> {
    console.log('Error with UPDATING "routine" table in DB', error);
    res.sendStatus(500);
    
  })
  
})

router.put('/modify/:id', rejectUnauthenticated, (req,res)=> {
  console.log('req.params', req.params)
  console.log('req.body', req.body)
  const sqlText = `UPDATE "routine" SET "routineName"=$1, "day_id"=$2, "image"=$3 WHERE "id"=$4;`;
  values = [req.body.routineName, req.body.day, req.body.image, req.params.id];
  pool.query(sqlText, values)
  .then((response)=> {
    res.sendStatus(200);
  })
  .catch((error)=> {
    res.sendStatus(500);
  })
})




// GET all "routine_names" and "days" from "routine" table
router.get('/name', rejectUnauthenticated, (req,res)=> {
  console.log(req.body.id);
  // const sqlText = `SELECT * FROM "routine" WHERE "user_id"=$1 ORDER BY "id";`;
  const sqlText = `SELECT "routine"."id", "routineName", "user_id", "day_id", "image", "completed", "day" FROM "routine"
                    JOIN "day" on "day_id" = "day"."id"
                    WHERE "user_id"=$1
                    ORDER BY "day"."id";`;
  
  pool.query(sqlText, [req.user.id])
  .then((response)=> {
    console.log(response.rows)
    res.send(response.rows)
  })
  .catch((error)=> {
    console.log('Error getting Routine from DB', error);
    res.sendStatus(500);
    
  })
})

// GET single routine from 'routine' table by selecting its 'id'
router.get('/name/:id', rejectUnauthenticated, (req, res) => {
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

router.delete('/delete/:id', rejectUnauthenticated, (req, res)=> {
  console.log('in /routine/delete/id, req.params.id is:', req.params.id)
  const sqlText = `DELETE FROM "activity" WHERE "routine_id" = $1;`;
  const sqlTextTwo = `DELETE FROM "routine" WHERE "id" = $1;`;
  value = [req.params.id]
  pool.query(sqlText, value)
  .then((response)=> {
    pool.query(sqlTextTwo, value)
    .then((response)=> {
      res.sendStatus(200)
    })
  })
  .catch((error)=> {
    console.log('Error Deleting activities and Routine from DB', error)
  })
})



module.exports = router;