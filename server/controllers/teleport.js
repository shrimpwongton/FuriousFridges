const models = require('../../db/models');
const request = require('request');
const _ = require('lodash');

module.exports.getTeleportData = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then(result => {
      if (result.attributes.destination === null) {
        throw error;
      }  
      models.Stats.where({ city: result.attributes.destination }).fetch()
        .then(data => {
          request
            .get(`https://api.teleport.org/api/urban_areas/slug:${result.attributes.destination}/details/`, 
              (error, response, cityData) => {
                let details = JSON.parse(cityData);
                let filteredDetails = _.filter(details.categories, entry => entry.id === req.query.category);
                res.status(200).send(filteredDetails);
              });
        })
        .catch(err => {
          res.status(500).send(err);
        }); 
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
