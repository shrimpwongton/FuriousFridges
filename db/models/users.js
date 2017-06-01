const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  question: function() {
    return this.hasMany('Question');
  },
  answer: function() {
    return this.hasMany('Answer');
  }
});

module.exports = db.model('User', User);
