
const conectio = require('../databases/conectio');

module.exports = {
    async index(request,response){
        const ong_id = request.headers.authorization;

        const incidents = await conectio('incidents')
        .where('ong_id',ong_id)
        .select('*');

        return response.json(incidents);
    }
}