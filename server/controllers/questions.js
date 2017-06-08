const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  let sortOrder = req.query.orderBy || '';
  models.Question.where({}).orderBy(sortOrder ).fetchAll({ withRelated: 'user'})
    .then(results => {
      let questions = results.models.map(q => {
        let relationObj = q.relations.user.attributes; 
        let question = {
          id: q.attributes.id,
          author: relationObj.firstName + ' ' + relationObj.lastName,
          body: q.attributes.question,
          createdAt: q.attributes.created_at,
          photoUrl: relationObj.photoUrl
        };
        return question;
      });
      res.status(200).send(questions);
    })
    .catch(err => {
      console.log(err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.where({ email: req.body.email }).fetch()
    .then(user => {
      models.Question.forge({ user_id: user.attributes.id, question: req.body.question })
        .save()
        .then(q => {
          let question = {
            id: q.attributes.id,
            author: user.attributes.firstName + ' ' + user.attributes.lastName,
            body: q.attributes.question,
            createdAt: q.attributes.created_at,
            photoUrl: user.attributes.photoUrl
          };
          console.log(question);
          res.status(201).send(question);
        })    
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};

module.exports.delete = (req, res) => {
  models.Question.where({ id: req.query.questionId }).destroy()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
