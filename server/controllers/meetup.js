'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const meetupConfig = require('config')['Meetups'];
const googleConfig = require('config')['Google_Coords'];

module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
      .then((data) => {
        request.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleConfig.clientID}&address=${result.attributes.destination}`,
              (error, response, body) => {
                if (error) {
                  console.error(err);
                } else {
                  var geoCoords = JSON.parse(body).results[0].geometry['location'];
                  request.get(`https://api.meetup.com/2/concierge?sign=true&photo-host=secure&fields=group_photo&lon=${geoCoords.lng}&lat=${geoCoords.lat}&key=${meetupConfig.clientID}`, 
                    (error, response, body) => {
                      if (error) {
                        console.error(error);
                      }
                      var body = JSON.parse(body);
                      var meetups = body.results;
                      var meetupData = {};
                      var dataLength = 10;
                      var currentIndex = 0;
                      var validData = true;
                      while (meetups.length > 0 && dataLength > 0 && validData) {
                        var meetupObj = {};
                        meetupObj['name'] = meetups[currentIndex].name;
                        meetupObj['type'] = meetups[currentIndex].group.who;
                        meetupObj['url'] = meetups[currentIndex].event_url;
                        if (meetups[currentIndex].group.group_photo) {
                          meetupObj['image'] = meetups[currentIndex].group.group_photo.photo_link; 
                        } else {
                          meetupObj['image'] = 'http://tctechcrunch2011.files.wordpress.com/2011/01/meetuplogo.jpeg';
                        }
                        meetupData[currentIndex] = meetupObj;
                        dataLength--;
                        if (!meetups[currentIndex + 1]) {
                          validData = false;
                        }
                        currentIndex++;
                      }
                      res.send(meetupData);
                    });
                 
                }
              });
      }); 
    });
};
