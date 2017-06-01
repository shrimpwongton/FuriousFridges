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

  //.get(CityInfoController.getAll) 

  // .get((req, res) => {
  //   request.get(`https://api.teleport.org/api/urban_areas/teleport:9q8yy/scores/`,
  //     (error, response, body) => {
  //       if (error) {
  //         console.error(err);
  //       }
  //        res.status(200).send(JSON.parse(body));
  //     });
  
 
 router.route('/')
  .get((req, res) => {
    request.get(`https://api.teleport.org/api/urban_areas/teleport:9q8yy/scores/`,
      (error, response, body) => {
        if (error) {
          console.error(err);
        }
        res.status(200).send(JSON.parse(body));
      });
  });
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });



module.exports = router;

