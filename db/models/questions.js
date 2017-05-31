const db = require('../');

const Question = db.Model.extend({
  tableName: 'questions',
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('Question', Question);
