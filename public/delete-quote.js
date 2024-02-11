const quoteIdButton = document.getElementById('submit-quoteId');
const submitButton = document.getElementById('submit-delete');
const deletedQuoteContainer = document.getElementById('new-delete');
const quoteElement = document.getElementById('quote');
const personElement = document.getElementById('person');
const quoteIdElement = document.getElementById('quoteId');

// Updates the display for the quote and the person
function updateQuoteDisplay(quote) {
  quoteElement.innerText = quote ? quote.quote : '... ... ...';
  personElement.innerText = quote ? quote.person : '...';
}

// Resets the form and disables the submit button
function resetForm() {
  quoteIdButton.value = '';
  submitButton.disabled = true;
  quoteIdElement.value = '';
  quoteIdElement.focus();
}

// Handles potential errors from the fetch response
function handleErrorResponse(response, defaultMessage) {
  if (response.ok) {
    return response.json();
  } else if (response.status===500) {
    return response.json().then(errorObj => {
      const combinedErrorMessage = `${defaultMessage} ${errorObj.error} ${errorObj.message}`;
      return Promise.reject(new Error(combinedErrorMessage));
    });
  }
  return Promise.reject(new Error(defaultMessage));
}

// Event listener for getting a quote by ID
quoteIdButton.addEventListener('click', () => {
  const quoteId = quoteIdElement.value;
  submitButton.disabled = true;
  deletedQuoteContainer.innerHTML = '';

  fetch(`/api/quotes/id/${quoteId}`)
    .then(response => handleErrorResponse(response, 'Please provide a valid ID.'))
    .then(({ quote }) => {
      updateQuoteDisplay(quote);
      quoteIdButton.value = quote.id;
      submitButton.disabled = false;
    })
    .catch(error => {
      console.log('error: ', error);
      resetForm();
      updateQuoteDisplay(null); // Update display when quote is falsy
      deletedQuoteContainer.innerHTML = `<h3>${error.message}</h3>`;
    });
});

// Event listener for deleting a quote
submitButton.addEventListener('click', () => {
  const quoteId = quoteIdButton.value;

  fetch(`/api/quotes/${quoteId}`, { method: 'DELETE' })
    .then(response => handleErrorResponse(response, 'Error deleting the quote.'))
    .then(({ quote }) => {
      resetForm();
      updateQuoteDisplay(null); // Clear display after deletion

      const newQuote = document.createElement('div');
      newQuote.innerHTML = `
        <h3>Congrats, your quote was deleted!</h3>
        <div class="attribution">id - ${quote.id}</div>
        <div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>
        <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `;
      deletedQuoteContainer.appendChild(newQuote);
    });
});
