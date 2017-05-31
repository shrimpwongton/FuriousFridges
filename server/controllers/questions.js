const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Question.fetchAll()
    .then(questions => {
      res.status(200).send(questions);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};