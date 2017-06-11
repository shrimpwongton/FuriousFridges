'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const OriginInfoController = require('../controllers').OriginInfo;

router.route('/')
  .get(middleware.auth.verify, OriginInfoController.getAll);

module.exports = router;

