'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const CraigsListController = require('../controllers').CraigsList;

router.route('/')
  .get(CraigsListController.getAll);


module.exports = router;

