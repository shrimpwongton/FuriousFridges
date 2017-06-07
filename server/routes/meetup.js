'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const MeetUpController = require('../controllers').MeetUp;

router.route('/')
  .get(MeetUpController.getAll);


module.exports = router;

