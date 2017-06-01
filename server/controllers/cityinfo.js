const models = require('../../db/models');

module.exports.create = (req, res) => {
  models.Stats.forge({cost_of_living: req.body, healthcare: req.body, environmental_quality: req.body,
  economy: req.body, lesiure_and_culture: req.body, commute: req.body, education: req.body,
  summary: req.body})
    .save()
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getAll = (req, res) => {
  models.Stats.fetchAll()
    .then( (data)=> {

      if data.length === 0 

        /// make request to api

      else 
        res.status(200).json(data);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};
