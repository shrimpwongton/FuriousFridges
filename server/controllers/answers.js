const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Answer.fetchAll()
    .then(results => {
      let answers = results.models.map(a => {
        let answer = {
          id: a.attributes.id,
          author: a.attributes.id_user,
          body: a.attributes.answer
        };
        return answer;
      });
      res.status(200).send(answers);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};