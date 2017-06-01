const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Question.fetchAll({ withRelated: 'user'})
    .then(results => {
      let questions = results.models.map(q => {
        let relationObj = q.relations.user.attributes; 
        let question = {
          id: q.attributes.id,
          author: relationObj.firstName + ' ' + relationObj.lastName,
          body: q.attributes.question
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
      return user.attributes.id;
    })
    .then(id => {
      models.Question.forge({ id_user: id, question: req.body.question })
        .save()
        .then(q => {
          models.User.where({ id: q.attributes.id_user }).fetch()
            .then(name => {
              let question = {
                id: q.attributes.id,
                author: name.attributes.firstName + ' ' + name.attributes.lastName,
                body: q.attributes.question,
                answers: []
              };
              res.status(201).send(question);
            })
            .catch(err => {
              console.log('last', err);
              res.status(500).send(err);
            });    
        })
        .catch(err => {
          console.log('first', err);
          res.status(500).send(err);
        });
    })
    .error(err => {
      console.log('second', err);
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};