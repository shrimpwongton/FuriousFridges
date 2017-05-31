const models = require('../../db/models');

module.exports.create = (req, res) => {
  models.Stats.forge({ : req.body.username, : req.body.password })
    .save()
    .then(result => {
      res.status(201).send();
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getAll = (req, res) => {
  models.Stats.fetchAll()
    .then( => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(503).send(err);
    });
};
