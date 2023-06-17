const express = require('express');
const { userController } = require('./controllers');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'App is running' }));

app.post('/login', userController.login);

module.exports = app;
