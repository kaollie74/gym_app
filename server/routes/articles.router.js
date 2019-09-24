const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

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
module.exports = router;