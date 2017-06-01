'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const CityInfoController = require('../controllers').CityInfo;

router.route('/')
  .get(CityInfoController.getAll) 
  ;

  
module.exports = router;

