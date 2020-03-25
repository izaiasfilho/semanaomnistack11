const express = require('express');
const app = express();

app.get('/',(request,response)=>{
return response.send('Heloll word');
});

app.listen(3333);
