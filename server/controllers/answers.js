const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Answer.where({ id_question: req.query.id_question }).fetchAll({ withRelated: 'user'})
    .then(results => {
      let answers = results.models.map(a => {
        let relationObj = a.relations.user.attributes;
        let answer = {
          id: a.attributes.id,
          author: relationObj.firstName + ' ' + relationObj.lastName,
          body: a.attributes.answer,
          id_question: a.attributes.id_question
        };
        return answer;
      });
      res.status(200).send(answers);
    })
    .catch(err => {
      console.log(err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
    
};

module.exports.create = (req, res) => {
  console.log(req.body);
};