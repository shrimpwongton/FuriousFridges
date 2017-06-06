'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const CityPhotoController = require('../controllers').CityPhoto;

router.route('/')
  .get(middleware.auth.verify, CityPhotoController.getPhoto);


module.exports = router;

