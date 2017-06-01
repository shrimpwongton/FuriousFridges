const db = require('../');

const Question = db.Model.extend({
  tableName: 'questions',
  user: function() {
    return this.belongsTo('User', 'user_id');
  }
});

module.exports = db.model('Question', Question);
