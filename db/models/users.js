const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  question: function() {
    return this.hasMany('Question', 'user_id');
  },
  answer: function() {
    return this.hasMany('Answer', 'user_id');
  }
});

module.exports = db.model('User', User);
