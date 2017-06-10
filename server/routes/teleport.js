'use strict';
const express = require('express');
const router = express.Router();
const TeleportController = require('../controllers').Teleport;

router.route('/')
  .get(TeleportController.getTeleportData)
  ;

module.exports = router;
