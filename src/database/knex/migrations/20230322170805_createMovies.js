exports.up = knex => knex.schema.createTable("movies", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  table.text("rating");
  table.text("user_id").references("id").inTable("users");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("movies");

