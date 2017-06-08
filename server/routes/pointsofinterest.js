'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const PointsOfInterestController = require('../controllers').PointsOfInterest;

router.route('/')
  .get(PointsOfInterestController.getAll);


module.exports = router;

