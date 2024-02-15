const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class IndexPage extends Page {
    /**
     * define selectors using getter methods
     */
    get requestButtons () {
        return $('.request-buttons');
    }

    get btnFetchRandom () {
        return $('#fetch-random');
    }

    get btnFetchQuotes () {
        return $('#fetch-quotes');
    }

    get inputAuthor () {
        return $('#author');
    }

    get btnFetchByAuthor () {
        return $('#fetch-by-author');
    }

    get quoteContainer () {
        return $('#quote-container');
    }

    get listSingleQuotes () {
        return $$('.single-quote');
    }

    /**
     * methods to encapsule automation code to interact with the page
     * e.g. to fetch a Random Quote, fetch all Quotes, fetch a Quote by author
     */
    async fetchRandomQuote () {
        await this.btnFetchRandom.click();
    }

    async fetchQuotes () {
        (await this.btnFetchQuotes).click();
    }

    async fetchByAuthor (author) {
        await this.inputAuthor.setValue(author);
        await this.btnFetchByAuthor.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('index.html');
    }
}

module.exports = new IndexPage();
