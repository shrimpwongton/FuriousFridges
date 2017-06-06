'use strict';
const express = require('express');
const request = require('request');
const models = require('../../db/models');

module.exports.getPhoto = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      request.get(`https://api.teleport.org/api/urban_areas/slug:${result.attributes.destination}/images/`,
        (error, response, stats) => {
          if (error) {
            console.error(err);
          }
          res.status(200).send(stats);
        })
      .on('error', (err) => {
        res.status(500).send(err);
      });
    })
    .catch(err => {
      console.log(2, err);
      res.status(503).send(err);
    });
};
