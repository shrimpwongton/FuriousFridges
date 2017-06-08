const db = require('../');

const Answer = db.Model.extend({
  tableName: 'answers',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo('User', 'user_id');
  },
  question: function() {
    return this.belongsTo('Question', 'question_id');
  }
});

module.exports = db.model('Answer', Answer);
