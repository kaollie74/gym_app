const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/get-fav', rejectUnauthenticated, (req, res)=> {
  sqlText = `SELECT * from "favorites";`;

  pool.query(sqlText)
  .then(response => {
    res.send(response.rows)
  })
  .catch(error => {
    console.log( `Error with GETTING fav articles from DB`, error)
    res.sendStatus(500);
  })


})

router.post('/', rejectUnauthenticated, (req, res) => {
  //let url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;

  axios.get(`https://newsapi.org/v2/top-headlines?sources=the-huffington-post&apiKey=${NEWS_API_KEY}`)

    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(`Error with retrieving News from API`, error)
      res.sendStatus(500)
    })
});

router.post('/fav', rejectUnauthenticated, (req,res) => {

  console.log('IN ROUTER.POST /FAV', req.body)

  const sqlText = `INSERT INTO "favorites" ("author", "content", "published", "title", "url", "image") 
                      VALUES($1, $2, $3, $4, $5, $6);`;
  const values = [req.body.author, req.body.content, req.body.publishedAt, req.body.title, req.body.url, req.body.urlToImage];

  pool.query(sqlText, values)
  .then(response => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log(`Error with POSTING FAV ARTICLE to DB`, error);
    res.sendStatus(500);
  })


})

module.exports = router;