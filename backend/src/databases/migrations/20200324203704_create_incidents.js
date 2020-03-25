
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments();
        table.string('titlo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();
       
       table.string('ong_id').notNullable();        
       table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
