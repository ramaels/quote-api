const { expect } = require('@wdio/globals')
const IndexPage = require('../pageobjects/index.page')

describe('My Home Page application', () => {
  it('should display all the required elements', async () => {
    await IndexPage.open()

    await expect(IndexPage.requestButtons).toBeDisplayed()
    await expect(IndexPage.btnFetchRandom).toBeDisplayed()
    await expect(IndexPage.btnFetchQuotes).toBeDisplayed()
    await expect(IndexPage.inputAuthor).toBeDisplayed()
    await expect(IndexPage.btnFetchByAuthor).toBeDisplayed()
    await expect(IndexPage.quoteContainer).toBeDisplayed()
  })

  it('should fetch and display a Random Quote', async () => {
    await IndexPage.open()
    await IndexPage.fetchRandomQuote();

    await expect(IndexPage.quoteContainer).toHaveChildren({ eq: 1 });
    const list = await IndexPage.listSingleQuotes[0];
    await expect(list).toHaveChildren({ eq: 3 });
    await expect(list.$$('div')[0]).toHaveElementClass('attribution', { message: 'class attribution missing...', });
    await expect(list.$$('div')[1]).toHaveElementClass('quote-text', { message: 'class quote-text missing...', });
    await expect(list.$$('div')[2]).toHaveElementClass('attribution', { message: 'class attribution missing...', });
  })

  it('should fetch and display All the Quotes', async () => {
    await IndexPage.open()
    await IndexPage.fetchQuotes();

    await expect(IndexPage.quoteContainer).toHaveChildren({ gte: 1 });
    const list = await IndexPage.listSingleQuotes;
    for (const singleQuote of list) {
      await expect(singleQuote).toHaveChildren({ eq: 3 });
      await expect(singleQuote.$$('div')[0]).toHaveElementClass('attribution', { message: 'class attribution missing...', });
      await expect(singleQuote.$$('div')[1]).toHaveElementClass('quote-text', { message: 'class quote-text missing...', });
      await expect(singleQuote.$$('div')[2]).toHaveElementClass('attribution', { message: 'class attribution missing...', });
    }
  })

  it('should fetch and display all Quotes from Author: Grace Hopper', async () => {
    await IndexPage.open()
    await IndexPage.fetchByAuthor('Grace Hopper');

    await expect(IndexPage.quoteContainer).toHaveChildren({ eq: 2 });
    const list = await IndexPage.listSingleQuotes;
    await expect(list[0].$$('div')[0]).toHaveText(/2/i);
    await expect(list[0].$$('div')[1]).toHaveText(/to apologize/i);
    await expect(list[0].$$('div')[2]).toHaveText(/Grace Hopper/i);
    await expect(list[1].$$('div')[0]).toHaveText(/7/i);
    await expect(list[1].$$('div')[1]).toHaveText(/dangerous phrase/i);
    await expect(list[1].$$('div')[2]).toHaveText(/Grace Hopper/i);
  })
})

