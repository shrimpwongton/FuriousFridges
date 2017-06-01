'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');


module.exports.getAll = (req, res) => {
  models.Stats.fetchAll()
  .then(data => {
    if (data.length === 0) {
      request.get('https://api.teleport.org/api/urban_areas/teleport:9q8yy/scores/',
        (error, response, body) => {
          if (error) {
            console.error(err);
          }
          var stats = JSON.parse(body).categories;
          models.Stats.forge({ cost_of_living: stats[1].score_out_of_10, healthcare: stats[8].score_out_of_10, housing: stats[0].score_out_of_10, environmental_quality: stats[10].score_out_of_10, economy: stats[11].score_out_of_10, lesiure_and_culture: stats[14].score_out_of_10, commute: stats[5].score_out_of_10, education: stats[9].score_out_of_10, summary: JSON.parse(body).summary })
            .save()
            .then(data => {
              res.status(201).send(data);
            })
            .catch(err => {
              res.status(500).send(err);
            });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
      res.status(200).send(data);
    }

  })
  .catch(err => {
    res.status(503).send(err);
  });
};
