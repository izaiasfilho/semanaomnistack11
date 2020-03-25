
const conectio = require('../databases/conectio');

module.exports={

    async index(request,response){
        const { page = 1} = request.query;
       
        const [count] =  await conectio('incidents').count();

        console.log(count);

        const incidents =await conectio('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select(['incidents.*','ongs.nome','ongs.email','ongs.watzap','ongs.cidade']);

        response.header('X-Total-Count',count['count(*)']);//pega o total de paginaçao e coloca em um cabeçalho
       
        return response.json(incidents);
    },

    async create(request,response){
      const { titlo, descricao, valor } = request.body;
      const ong_id = request.headers.authorization;

      const [id] = await conectio('incidents').insert({
          titlo,
          descricao,
          valor,
          ong_id,
      });
      return response.json({id});

    },
    async delete(request,response){
        
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await conectio('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            
            return response.status(401).json({error:'Operetio not permitted.'});    
        }

        await conectio('incidents').where('id',id).delete();
        return response.status(204).send();
    }
}