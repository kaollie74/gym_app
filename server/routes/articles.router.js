const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const NEWS_API_KEY = process.env.NEWS_API_KEY;