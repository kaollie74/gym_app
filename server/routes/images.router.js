const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req,res)=> {
  console.log('in images router');
  const sqlText = `SELECT * FROM "images";`;
  pool.query(sqlText)
  .then((response)=> {
    console.log('response.rows', response);
    res.send(response.rows)
  })
  .catch((error)=> {
    console.log('Error with GETTING images from "images" table', error);
    res.sendStatus(500);
    
  })
})



module.exports = router;