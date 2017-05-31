const db = require('../');

const Stats = db.Model.extend({
  tableName: 'cityinfo',
  stats: function() {
    return this.hasMany('Stats');
  }
});

module.exports = db.model('Stats', Stats);
