const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({ message: 'App is running' }));

module.exports = app;
