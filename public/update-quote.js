const quoteIdButton = document.getElementById('submit-quoteId');
const submitButton = document.getElementById('submit-update');
const quoteElement = document.getElementById('quote');
const personElement = document.getElementById('person');
const quoteIdElement = document.getElementById('quoteId');
const updatedQuoteContainer = document.getElementById('new-update');

function resetFormFields() {
  quoteElement.value = '';
  personElement.value = '';
  quoteIdElement.value = '';
  quoteIdButton.value = '';
  submitButton.disabled = true;
  quoteIdElement.focus();
}

function updateFormFields(quote) {
  quoteElement.value = quote.quote;
  personElement.value = quote.person;
  quoteIdElement.value = quote.id;
  submitButton.disabled = false;
}

function disableFormFields() {
  quoteElement.disabled = true;
  personElement.disabled = true;
  submitButton.disabled = true;
}

function enableFormFields() {
  quoteElement.disabled = false;
  personElement.disabled = false;
  submitButton.disabled = false;
}

function handleErrorResponse(response, defaultMessage) {
  if (response.ok) {
    return response.json();
  } else if (response.status===500 || response.status===400) {
    return response.json().then(errorObj => {
      const combinedErrorMessage = `${defaultMessage} ${errorObj.error} ${errorObj.message}`;
      return Promise.reject(new Error(combinedErrorMessage));
    });
  }
  return Promise.reject(new Error(defaultMessage));
}

quoteIdButton.addEventListener('click', () => {
  const quoteId = quoteIdElement.value;

  disableFormFields();
  updatedQuoteContainer.innerHTML = '';

  fetch(`/api/quotes/id/${quoteId}`)
    .then(response => handleErrorResponse(response, 'Please provide a valid ID.'))
    .then(({ quote, error, message }) => {
      if (quote) {
        updateFormFields(quote);
        enableFormFields();
      } else {
        resetFormFields();
        disableFormFields();
        updatedQuoteContainer.innerHTML = `<h3>${error?error:'Id not provided or incorrect syntax.'}</h3><div>${message?message:'Id not found.'}</div>`;
      }
    })
    .catch(error => {
      console.log('error: ',error);
      updatedQuoteContainer.innerHTML = `<h3>${error.message}</div>`;
    });
});

submitButton.addEventListener('click', () => {
  const quoteId = quoteIdButton.value;
  const quote = quoteElement.value;
  const person = personElement.value;

  fetch(`/api/quotes?id=${quoteId}&quote=${quote}&person=${person}`, {
    method: 'PUT',
  })
  .then(response => handleErrorResponse(response, 'Updating Error...') )
  .then(({quote}) => {
    resetFormFields();
    disableFormFields();
    const newQuote = document.createElement('div');

    newQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="attribution">id - ${quote.id}</div>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    updatedQuoteContainer.appendChild(newQuote);
  })
  .catch(error => {
    console.log('error: ',error);
    resetFormFields();
    disableFormFields();
    updatedQuoteContainer.innerHTML = `<h3>${error.message}</div>`;
  });
});
