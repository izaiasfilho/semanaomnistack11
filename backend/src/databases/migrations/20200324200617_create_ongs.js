
exports.up = function(knex) {
 return knex.schema.createTable('ongs',function(table){
      table.string('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.string('watzap').notNullable();
      table.string('cidade').notNullable();
      

  })
};

exports.down = function(knex) {
 return knex.schema.dropTable('ongs');
};
