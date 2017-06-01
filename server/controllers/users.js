const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.fetchAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.User.forge({ firstName: req.user.first, 
                      lastName: req.user.last,
                      email: req.user.email,
                      visible: true })
    .save()
    .then(result => {
      res.status(201).send(req.user); //--Sending info from profiles
    })
    .catch(err => {
      console.log(err);
      if (err.constraint === 'users_email_unique') {
        return res.status(200).send(req.user);  //Sending info from profiles
      }

      res.status(500).send(err);
    });
};