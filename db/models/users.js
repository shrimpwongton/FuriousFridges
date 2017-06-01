const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  question: function() {
    return this.hasMany('Question', 'question_id');
  },
  answer: function() {
    return this.hasMany('Answer', 'answer_id');
  }
});

module.exports = db.model('User', User);
