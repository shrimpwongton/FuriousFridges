const db = require('../');

const Answer = db.Model.extend({
  tableName: 'answers',
  user: function() {
    return this.belongsTo('User');
  },
  question: function() {
    return this.belongsTo('Question');
  }
});

module.exports = db.model('Answer', Answer);
