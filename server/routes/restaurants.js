'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const RestaurantsController = require('../controllers').Restaurants;

router.route('/')
  .get(RestaurantsController.getAll);


module.exports = router;

