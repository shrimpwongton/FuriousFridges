'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const EventsController = require('../controllers').Events;

router.route('/')
  .get(EventsController.getAll);


module.exports = router;

