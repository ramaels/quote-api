const {assert} = require('chai');
const request = require('supertest');
const app = require('../app');

describe('GET /api/quotes/random', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api/quotes/random')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
})

describe('GET /api/quotes/', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api/quotes/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
})

describe('GET /api/quotes?person=Grace Hopper', function () {
  it('responds with json', async function () {
    await request(app)
      .get('/api/quotes/')
      .query({person: 'Grace Hopper'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.lengthOf(res.body.quotes, 2);
      });
  });
})

describe('GET /api/quotes?person=', function () {
  it('responds with json containing quotes as an empty array', async function () {
    await request(app)
      .get('/api/quotes')
      .query({person: ''})
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.lengthOf(res.body.quotes, 0);
      });
  });
})

describe('GET /api/quotes?person=notFound', function () {
  it('responds with json containing quotes as an empty array', async function () {
    await request(app)
      .get('/api/quotes')
      .query({person: 'notFound'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        assert.lengthOf(res.body.quotes, 0);
      });
  });
})
