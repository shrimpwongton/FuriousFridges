'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email}).fetch()
    .then((result) => {
      
      models.Stats.where({city: result.attributes.destination}).fetchAll()
      .then(data => {
        if (data.length === 0) {
          request
            .get(`https://api.teleport.org/api/urban_areas/slug:${result.attributes.destination}/scores/`,
              (error, response, stats) => {
                if (error) {
                  console.error(err);
                }
                models.Stats.forge({ city: result.attributes.destination, city_stats: stats })
                  .save()
                  .then(data => {
                    res.status(201).send(data.attributes.city_stats);
                  })
                  .catch(err => {
                    res.status(500).send(err);
                  });
              })
              .on('error', (err) => {
                console.log(err);
                res.status(500).send(err);
              });
        } else {
          res.status(200).send(data.models[0].attributes.city_stats);
        }

      })
      .catch(err => {
        res.status(503).send(err);
      }); 
    })
    .catch(err => {
      res.status(503).send(err);
    });


};