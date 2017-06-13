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
                  request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoCoords.lat},${geoCoords.lng}&radius=500&type=night_club&key=${config.clientID}`,
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var clubs = body.results;
                      var clubData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      while (clubs.length > 0 && dataLength > 0 && validData) {
                        var clubObj = {};
                        clubObj['name'] = clubs[currentIndex].name;
                        if (clubs[currentIndex].photos) {
                          var reference = clubs[currentIndex].photos[0].photo_reference;
                          clubObj['image'] = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${config.clientID}`;
                        } else {
                          clubObj['image'] = 'http://www.foundation-nightclub.com/wp-content/uploads/2014/11/champagne-parade-350x262.jpg';
                        }
                        clubData[currentIndex] = clubObj;
                        dataLength--;
                        if (!clubs[currentIndex + 1]) {
                          validData = false;
                        }
                        currentIndex++;
                      }
                      res.send(clubData);
                    });
                }
              });
      });
    });
};
