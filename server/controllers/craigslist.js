'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const craigslist = require('node-craigslist');


module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
  .then((result) => {
    models.Stats.where({ city: result.attributes.destination }).fetch()
      .then(() => {
        if (result.attributes.destination === 'san-francisco-bay-area') {
          result.attributes.destination = 'sanfrancisco';
        }
        const craigslistclient = new craigslist.Client({
          city: result.attributes.destination.replace(/-/g,"")
        });
        craigslistclient
            .search('furniture')
            .then((listings) => {
              res.send(listings);
            });
      });
  });
};





