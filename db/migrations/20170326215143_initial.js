exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
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
    knex.schema.createTableIfNotExists('cityinfo', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('cost_of_living', 10).notNullable();
      table.integer('healthcare', 10).notNullable();
      table.integer('environmental_quality', 10).notNullable();
      table.integer('economy', 10).notNullable();
      table.integer('lesiure_and_culture', 10).notNullable();
      table.integer('commute', 10).notNullable();
      table.integer('education', 10).notNullable();
      table.string('summary', 500).notNullable();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('cityinfo')
  ]);
};
