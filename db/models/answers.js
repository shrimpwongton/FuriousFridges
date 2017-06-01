const db = require('../');

const Answer = db.Model.extend({
  tableName: 'answers',
  user: function() {
    return this.belongsTo('User', 'id_user');
  },
  question: function() {
    return this.belongsTo('Question', 'id_question');
  }
});

module.exports = db.model('Answer', Answer);
