const knex = require('knex');
const configuration = require('../../knexfile');
const conectio = knex(configuration.development);

module.exports = conectio;