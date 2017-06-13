'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const GymsController = require('../controllers').Gyms;

router.route('/')
  .get(GymsController.getAll);


module.exports = router;

