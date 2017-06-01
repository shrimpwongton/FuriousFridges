const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Answer.where({ question_id: req.query.questionId }).fetchAll({ withRelated: 'user'})
    .then(results => {
      let answers = results.models.map(a => {
        let relationObj = a.relations.user.attributes;
        let answer = {
          id: a.attributes.id,
          author: relationObj.firstName + ' ' + relationObj.lastName,
          body: a.attributes.answer,
          question_id: a.attributes.question_id
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
  models.User.where({ email: req.body.email }).fetch()
    .then(user => user.attributes)
    .then(attrib => {
      models.Answer.forge({ user_id: attrib.id, answer: req.body.answer, question_id: req.body.questionId })
        .save()
        .then(a => {
          let answer = {
            id: a.attributes.id,
            author: attrib.firstName + ' ' + attrib.lastName,
            body: a.attributes.answer
          };
          res.status(201).send(answer);
        })    
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
