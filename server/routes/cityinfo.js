'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const CityInfoController = require('../controllers').CityInfo;

router.route('/')
  //check if info exists in the database
  //.get(CityInfoController.getAll) 
  //if undefined, query the api



  .get((req, res) => {
    request.get(`https://api.teleport.org/api/urban_areas/teleport:9q8yy/scores/`,
      (error, response, body) => {
        if (error) {
          console.error(err);
        }
        res.status(200).send(JSON.parse(body));
      });
  });
 
 
module.exports = router;

