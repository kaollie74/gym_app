const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

router.post('/', (req, res) => {
  console.log('hitting search post', req.body)

  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.search}&type=gym&radius=8000&key=${GOOGLE_API_KEY}`)

    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      res.sendStatus(500);
    })
});




module.exports = router;