const db = require('../');

const Question = db.Model.extend({
  tableName: 'questions',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User', 'user_id');
  },
  answer: function() {
    return this.hasMany('Answer', 'question_id');
  }
});

module.exports = db.model('Question', Question);
