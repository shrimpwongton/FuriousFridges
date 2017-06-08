const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  let sortOrder = req.query.orderBy || '';
  models.Answer.where({ question_id: req.query.questionId }).orderBy(sortOrder).fetchAll({ withRelated: 'user'})
    .then(results => {
      let answers = results.models.map(a => {
        let relationObj = a.relations.user.attributes;
        let answer = {
          id: a.attributes.id,
          author: relationObj.firstName + ' ' + relationObj.lastName,
          body: a.attributes.answer,
          question_id: a.attributes.question_id,
          createdAt: a.attributes.created_at,
          photoUrl: relationObj.photoUrl
        };
        return answer;
      });
      res.status(200).send(answers);
    })
    .catch(err => {
      res.status(503).send(err);
    });
    
};

module.exports.create = (req, res) => {
  models.User.where({ email: req.body.email }).fetch()
    .then(user => {
      models.Answer.forge({ 
        user_id: user.attributes.id, 
        answer: req.body.answer, 
        question_id: req.body.questionId 
      }).save()
        .then(a => {
          let answer = {
            id: a.attributes.id,
            author: user.attributes.firstName + ' ' + user.attributes.lastName,
            body: a.attributes.answer,
            createdAt: a.attributes.created_at,
            photoUrl: user.attributes.photoUrl
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

module.exports.delete = (req, res) => {
  models.Answer.where({ id: req.query.answerId }).destroy()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
