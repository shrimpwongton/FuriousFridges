'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const SpiritualController = require('../controllers').Spiritual;

router.route('/')
  .get(SpiritualController.getAll);


module.exports = router;

