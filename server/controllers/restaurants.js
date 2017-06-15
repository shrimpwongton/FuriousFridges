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
                  request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geoCoords.lat},${geoCoords.lng}&radius=500&type=restaurant&key=${config.clientID}`,
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var restaurants = body.results;
                      var restaurantData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      if ( typeof restaurants === 'undefined' ) {
                        res.send({});
                      }
                      while (restaurants.length > 0 && dataLength > 0 && validData) {
                        var restaurantObj = {};
                        restaurantObj['name'] = restaurants[currentIndex].name;
                        restaurantObj['rating'] = restaurants[currentIndex].rating;
                        if (restaurants[currentIndex].photos) {
                          var reference = restaurants[currentIndex].photos[0].photo_reference;
                          restaurantObj['image'] = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${config.clientID}`;
                        } else {
                          restaurantObj['image'] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsaNJSruzpPvzlnzOBAFgkkbpRPjX42i3jG4CzAPLRUQy1Oe5Mg';
                        }
                        restaurantData[currentIndex] = restaurantObj;
                        dataLength--;
                        if (!restaurants[currentIndex + 1]) {
                          validData = false;
                        }
                        currentIndex++;
                      }
                      res.send(restaurantData);
                    });
                }
              });
      });
    });
};
