const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.profileRedirect = (req, res, next) => {
  if ( req.isAuthenticated()) {
    res.redirect('/profile');
  }
  return next();
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'redis://h:p2cc69751f934a2fed30a01af41cf3c4395a71899d379e96a31840e8cb883af32@ec2-54-208-76-96.compute-1.amazonaws.com',
    port: 13289
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
