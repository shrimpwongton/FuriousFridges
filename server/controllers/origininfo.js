'use strict';
const express = require('express');
const request = require('request');
const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      if (result.attributes.origin === null) {
        throw error;
      }
      models.Stats.where({ city: result.attributes.origin }).fetch()
        .then(data => {
          if (data === null) {
            request.get(`https://api.teleport.org/api/urban_areas/slug:${result.attributes.origin}/scores/`,
              (error, response, stats) => {
                request.get(`https://api.teleport.org/api/urban_areas/slug:${result.attributes.origin}/details/`,
                  (error, response, details ) => {
                    models.Stats.forge({city: result.attributes.origin, city_stats: stats, city_details: details})
                      .save()
                      .then(data => {
                        res.status(201).send({city_info: data.attributes.city_stats, city_details: data.attributes.city_details});
                      })
                      .catch(err => {
                        res.status(500).send(err);
                      });
                  })
                  .on('error', (err) => {
                    res.status(500).send(err);
                  });
              })
              .on('error', (err) => {
                res.status(500).send(err);
              });
          } else {
            res.status(200).send({city_info: data.attributes.city_stats, city_details: data.attributes.city_details});
          }
        })
        .catch(err => {
          res.status(503).send(err);
        });
    })
    .catch(err => {
      res.status(404).send(err);
    });
};
