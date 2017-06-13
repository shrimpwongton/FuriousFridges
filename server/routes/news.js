'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const NewsController = require('../controllers').News;

router.route('/')
  .get(NewsController.getAll);


module.exports = router;

