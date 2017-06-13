const expect = require('chai').expect;
const User = require('../../db/models/users.js');
const Question = require('../../db/models/questions.js');
const Answer = require('../../db/models/answers.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Question board model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able create a user', (done) => {
    User.forge({ 
      firstName: 'John', 
      lastName: 'Doe',
      email: '123abc@example.com',
      photoUrl: 'greatphoto.jpg',
      visible: true 
    }).save()
      .then(() => {
        return User.fetchAll();   
      })
      .then(results => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

});