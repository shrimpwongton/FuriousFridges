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
        if (result.attributes.destination === 'san-francisco-bay-area') {
          result.attributes.destination = 'sanfrancisco';
        }
        request.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${config.clientID}&address=${result.attributes.destination}`,
              (error, response, body) => {
                if (error) {
                  console.error(err);
                } else {
                  var geoCoords = JSON.parse(body).results[0].geometry['location'];
                  request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoCoords.lat},${geoCoords.lng}&radius=500&type=gym&key=${config.clientID}`,
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var gyms = body.results;
                      var gymData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      if ( typeof gyms === 'undefined' ) {
                        res.send({});
                      } else {
                        while (gyms.length > 0 && dataLength > 0 && validData) {
                          var gymObj = {};
                          gymObj['name'] = gyms[currentIndex].name;
                          if (gyms[currentIndex].photos) {
                            var reference = gyms[currentIndex].photos[0].photo_reference;
                            gymObj['image'] = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${config.clientID}`;
                          } else {
                            gymObj['image'] = 'http://www.kaylainthecity.com/wp-content/uploads/gym.jpg';
                          }
                          gymData[currentIndex] = gymObj;
                          dataLength--;
                          if (!gyms[currentIndex + 1]) {
                            validData = false;
                          }
                          currentIndex++;
                        }
                        res.send(gymData);
                      }
                    });
                }
              });
      });
    });
};
