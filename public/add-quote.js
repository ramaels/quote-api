const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const quoteElement = document.getElementById('quote');
  const personElement = document.getElementById('person');

  newQuoteContainer.innerHTML = '';
  fetch(`/api/quotes?quote=${quoteElement.value}&person=${personElement.value}`, {
    method: 'POST',
  })
    .then(response => response.json())
    .then(({ quote, error, message }) => {
      const newQuote = document.createElement('div');
      quoteElement.value = '';
      quoteElement.focus();
      personElement.value = '';
      if (quote) {
        newQuote.innerHTML = `
      <h3>Congrats, your quote was added!</h3>
      <div class="attribution">id - ${quote.id}</div>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `} else {
        newQuote.innerHTML = `<h3>${error}</h3><div>${message}</div>`
      }
      newQuoteContainer.appendChild(newQuote);
    })
});
