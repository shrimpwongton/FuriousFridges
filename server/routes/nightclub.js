'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const NightClubController = require('../controllers').NightClub;

router.route('/')
  .get(NightClubController.getAll);


module.exports = router;

