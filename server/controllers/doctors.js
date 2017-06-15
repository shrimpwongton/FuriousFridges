'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const config = require('config')['Google_Places'];


module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
      .then((data) => {
        request.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.clientID}&address=${result.attributes.destination}`,
              (error, response, body) => {
                if (error) {
                  console.error(err);
                } else {
                  var geoCoords = JSON.parse(body).results[0].geometry['location'];
                  request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoCoords.lat},${geoCoords.lng}&radius=500&type=doctor&key=${config.clientID}`,
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var doctors = body.results;
                      var doctorData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      if ( typeof doctors === 'undefined' ) {
                        res.send({});
                      } else {
                        while (doctors.length > 0 && dataLength > 0 && validData) {
                          var doctorObj = {};
                          doctorObj['name'] = doctors[currentIndex].name;
                          doctors['address'] = doctors[currentIndex].vicinity;
                          doctorData[currentIndex] = doctorObj;
                          dataLength--;
                          if (!doctors[currentIndex + 1]) {
                            validData = false;
                          }
                          currentIndex++;
                        }
                        res.send(doctorData);
                      }
                    });
                }
              });
      });
    });
};
