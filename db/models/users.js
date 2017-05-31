const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  question: function() {
    return this.hasMany('Question');
  }
});

module.exports = db.model('User', User);
