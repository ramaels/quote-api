const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
const quotesRouter = require('./quotes');

app.use(express.static('public'));
app.use('/api/quotes', quotesRouter);

app.listen(PORT, () => { console.log(`Server listening on port: ${PORT}`) });