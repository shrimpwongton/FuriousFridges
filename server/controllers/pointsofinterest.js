'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');


module.exports.getAll = (req, res) => {
  request.get('http://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text?apikey=eeCuSPATqjvpAxlnn52om6cXyxCuSXFj&city_name=San%20Francisco', 
    (error, response, body) => {
      if(error) {
        console.log(error);
      }
      console.log("success!")
    });
}

  

