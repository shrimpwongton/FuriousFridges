'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const middleware = require('../middleware');
const SchoolsController = require('../controllers').Schools;

router.route('/')
  .get(SchoolsController.getAll);


module.exports = router;

