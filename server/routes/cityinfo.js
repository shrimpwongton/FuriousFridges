'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const CityInfoController = require('../controllers').CityInfo;

router.route('/')
  .get(middleware.auth.verify, CityInfoController.getAll);


module.exports = router;

