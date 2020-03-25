const crypto = require('crypto');
const conectio = require('../databases/conectio');


module.exports = { 

    async index(request,response){
        const ongs =await conectio('ongs').select('*');
       
        return response.json(ongs);
    },

async create(request,response){
    const { nome, email, watzap, cidade } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await conectio('ongs').insert({
        id,
        nome,
        email,
        watzap,
        cidade,
        
    })
    return response.json({id});
}
};