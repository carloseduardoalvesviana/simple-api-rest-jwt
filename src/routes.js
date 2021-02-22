const express = require('express');
const routes = express.Router();

const Authenticated = require('./middlewares/authenticated');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

routes.post('/auth', AuthController.authenticate);
routes.post('/users', UserController.store);
routes.get('/profile', Authenticated.verify, UserController.index);

module.exports = routes;