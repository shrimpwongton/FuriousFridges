const db = require('../');

const Question = db.Model.extend({
  tableName: 'questions',
  user: function() {
    return this.belongsTo('User', 'id_user');
  }
});

module.exports = db.model('Question', Question);
