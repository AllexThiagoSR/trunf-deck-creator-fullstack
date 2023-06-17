const express = require('express');
const { userController } = require('./controllers');
const { userRouter, deckRouter } = require('./router');
const validateLogin = require('./middlewares/validateLogin');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'App is running' }));

app.post('/login', validateLogin, userController.login);

app.use('/user', userRouter);

app.use('/deck', deckRouter);

module.exports = app;
