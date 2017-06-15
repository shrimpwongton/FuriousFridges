const expect = require('chai').expect;
const dbUtils = require('../../db/lib/utils.js');
const User = require('../../db/models/users.js');



describe('User model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to delete a record', function (done) {
    // Inserts a user
    User.where({ id: 1 }).destroy()
      // verifies that the user has been inserted
      .then(function () {
        return User.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).to.equal(null);
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

});