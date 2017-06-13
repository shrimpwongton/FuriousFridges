'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const DoctorsController = require('../controllers').Doctors;

router.route('/')
  .get(DoctorsController.getAll);


module.exports = router;

