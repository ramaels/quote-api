const express = require('express')
const quotesRouter = express.Router()

const { quotes } = require('./data');
const { getRandomElement, getElementsByPerson, getElementById, findIndexById, createElement } = require('./utils');

quotesRouter.get('/random', (req, res, next) => {
    try {
        const receivedRandomQuote = getRandomElement(quotes);
        res.json({ quote: receivedRandomQuote });
    } catch (error) {
        // Log the error for server-side visibility
        console.error('Error occurred in /api/quotes/random:', error);

        // Send a generic error message to the client
        res.status(500).send();
    }
});

quotesRouter.get('/id/:id', (req, res, next) => {
    const quoteId = req.params.id;
    console.log('quoteId:',quoteId);
    try {
        const receivedQuote = getElementById(quoteId, quotes);
        res.json({ quote: receivedQuote });
    } catch (error) {
        // Log the error for server-side visibility
        console.error('Error occurred in /api/:id:', error.message);

        // Send a generic error message to the client
        res.status(500).send({ error: error.message, message: 'Id not found.' });
    }
});

quotesRouter.get('/', (req, res, next) => {
    try {
        // Check if any query parameters exist
        const hasQueryParams = Object.keys(req.query).length > 0;
        let receivedQuotes;

        if (hasQueryParams) {
            // If query parameters exist, assume 'person' is provided and filter quotes
            const { person } = req.query;
            receivedQuotes = getElementsByPerson(person, quotes);
        } else {
            // If no query parameters, return all quotes
            receivedQuotes = quotes;
        }
        res.json({ quotes: receivedQuotes });
    } catch (error) {
        // Log the error for server-side visibility
        console.error(`Error occurred in /api/quotes/?person=${person}:`, error);

        // Send a generic error message to the client
        res.status(500).send();
    }
});

quotesRouter.post('/', (req, res, next) => {
    try {
        const { quote, person } = req.query;
        const receivedQuote = createElement(quote, person, quotes);
        quotes.push(receivedQuote);
        res.status(201).json({ quote: receivedQuote });
    } catch (error) {
        // Log the error for server-side visibility
        console.error('Error occurred in /api/quotes/?...:', error.message);

        // Send a generic error message to the client
        res.status(400).send({ error: error.message, message: 'Invalid New Quote submission data' });
    }
});

quotesRouter.put('/', (req, res, next) => {
    try {
        const { id, quote, person } = req.query;
        if (quote==='' || person==='') throw new Error(`${quote===''?'Quote is required.':''} ${person===''?'Author is required.':''}`);
        const receivedIndex = findIndexById(id, quotes);
        quotes[receivedIndex].quote = quote;
        quotes[receivedIndex].person = person;
        res.send({ quote: quotes[receivedIndex] })
    } catch (error) {
        // Log the error for server-side visibility
        console.error('Error occurred in (PUT) /api/quotes/?...:', error);

        // Send a generic error message to the client
        res.status(400).send({error: error.message, message: 'Invalid Update submission data'});
    }
});

quotesRouter.delete('/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        const receivedIndex = findIndexById(id, quotes);
        const removedQuote = quotes[receivedIndex];
        quotes.splice(receivedIndex, 1);
        res.send({ quote: removedQuote })
    } catch (error) {
        // Log the error for server-side visibility
        console.error('Error occurred in /api/quotes/?...:', error);

        // Send a generic error message to the client
        res.status(400).send();
    }
});

module.exports = quotesRouter;