const conectio = require('../databases/conectio');

module.exports = {

    async create(request, response){
        
         const { id } = request.body;
        // const id = "4a519cb3";
        
         const ong = await conectio('ongs')
         .where('id',id)
         .select('nome')
         .first();
  
   if( !ong ){
      return response.status(400).json({ error: 'No ONG found with this ID'});
  }
  
       console.log(id);
       
         return response.json(ong);     
    }
}