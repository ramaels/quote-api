const express = require('express');
const app = express();

const quotesRouter = require('./quotes');

app.use(express.static('public'));
app.use('/api/quotes', quotesRouter);

module.exports = app;
