const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getElementsByPerson = (person, arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr.filter(quote => quote.person === person);
}

const getElementById = (id, arr) => {
  let element;
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  element = arr.find(quote => quote.id === Number(id));
  if (!element) throw new Error(`Id: ${id} does not exist.`);
  return element;
}

const findIndexById = (id, arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr.findIndex(quote => quote.id === Number(id));
}

const createElement = (quote, person, arr) => {
  const id = arr.length;
  if (quote === '' || person === '') throw new Error(`${quote === ''?'Quote not provided. ':''}${person === ''?'Author not provided.':''}`);
  return ({ id: id, quote: quote, person: person });
}

module.exports = {
  getRandomElement,
  getElementsByPerson,
  getElementById,
  findIndexById,
  createElement
};
