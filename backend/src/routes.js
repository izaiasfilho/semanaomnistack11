const express = require('express');
const crypto = require('crypto');

const OngController = require('./controller/OngController');
const IncidenteController = require('./controller/IncidenteController');
const ProfileController = require('./controller/ProfileController');
const SessionsController = require('./controller/SessionsController');

//const conectio = require('./databases/conectio');

const routes = express.Router();


routes.post('/sessions',SessionsController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidenteController.index);
routes.post('/incidents', IncidenteController.create);
routes.delete('/incidents/:id',IncidenteController.delete);

    module.exports = routes; 