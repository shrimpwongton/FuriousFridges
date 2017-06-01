const db = require('../');

const Stats = db.Model.extend({
  tableName: 'cityinfo'
});

module.exports = db.model('Stats', Stats);
