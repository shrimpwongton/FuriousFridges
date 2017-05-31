
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function(table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').unsigned().primary();
      table.string('email', 100).nullable().unique();
      table.string('firstName', 100).nullable();
      table.string('lastName', 100).nullable();
      table.string('type', 20).nullable();
      table.boolean('visible', 5).notNullable();
      table.string('origin', 100).nullable();
      table.string('destination', 100).nullable();
    }),
    knex.schema.createTableIfNotExists('questions', function(table) {
      table.increments('id').unsigned().primary();
      table.string('question', 100).nullable();
      table.integer('id_users').references('users.id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('users')
  ]);
};

