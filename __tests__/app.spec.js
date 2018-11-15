// Import test packages
const chai = require('chai')
const chaiHttp = require('chai-http')

// Configure test packages
const assert = chai.assert;
chai.use(chaiHttp)

// Import API server and set url
const app = require('../app/app');
const url = 'http://localhost:3000';

// Import test data
const { validUser, invalidUser, missingUser } = require('./testData.json');

describe('API Server', () => {
  let createdUser; // this will be populated by the user document that gets created

  describe('POST to create new user', () => {
    it('should create a new user when the user has required information', () => {
      return chai.request(app)
        .post('/users').set('Content-Type', 'application/json')
        .send(validUser)
        .then(({ status, body }) => {
          createdUser = body[0];

          assert.equal(200, status);
          assert.equal(validUser.email, createdUser.email);
          assert.equal(validUser.first_name, createdUser.first_name);
        })
        .catch(err => { throw err; });
    });

    it('should not create a new user when the user is missing information', () => {
      return chai.request(app)
        .post('/users').set('Content-Type', 'application/json')
        .send(invalidUser)
        .then(({ status, body }) => {
          assert.equal(422, status);
          assert.equal('Document failed validation', body.message);
        })
        .catch(err => { throw err; });
    });

    it('should not create a user when the email already exists', () => {
      return chai.request(app)
        .post('/users').set('Content-Type', 'application/json')
        .send(validUser)
        .then(({ status, body }) => {
          assert.equal(422, status);
          assert.isOk('duplicate key error', body.message);
        })
        .catch(err => { throw err; });
    });
  });

  describe('POST to find an existing user by email and password', () => {
    it('should find an existing user when provided an email and password', () => {
      return chai.request(app)
        .post('/users').set('Content-Type', 'application/json')
        .send({ user_query: {
          email: validUser.email,
          password: validUser.password
        }})
        .then(({ status, body }) => {
          assert.equal(200, status);
          assert.deepEqual(createdUser, body);
        })
        .catch(err => { throw err; });
    });

    it('should return an error when missing the email or password', () => {
      return chai.request(app)
        .post('/users').set('Content-Type', 'application/json')
        .send({ user_query: { email: validUser.email }})
        .then(({ status, body }) => {
          assert.equal(422, status);
          assert.equal('User query must include both email and password.', body.message);
        })
        .catch(err => { throw err; });
    });

    it('should return an error when the user does not exist', () => {
      return chai.request(app)
        .post('/users').set('Content-Type', 'application/json')
        .send({ user_query: {
          email: missingUser.email,
          password: missingUser.password,
        }})
        .then(({ status, body }) => {
          assert.equal(404, status);
          assert.equal('Email does not match any currently active user.', body.message);
        })
        .catch(err => { throw err; });
    });
  });

  describe('GET to find user by ID', () => {
    it('should return a document if the user exists', () => {
      return chai.request(app)
        .get(`/users/${createdUser._id}`)
        .then(({ status, body }) => {
          assert.equal(200, status);
          assert.deepEqual(createdUser, body);
        })
        .catch(err => { throw err; });
    });
  });

  describe('DELETE to deactivate an existing user', () => {
    it('should return a confirmation that the user was deleted', () => {
      return chai.request(app)
        .delete(`/users/${createdUser._id}`)
        .set('Content-Type', 'application/json')
        .then(({ status, body }) => {
          assert.equal(200, status);
          assert.equal('The user was successfully deactivated.', body.message);
        })
        .catch(err => { throw err; });
    });

    it('should return an error when the user is inactive', () => {
      return chai.request(app)
        .delete(`/users/${createdUser._id}`)
        .set('Content-Type', 'application/json')
        .then(({ status, body }) => {
          assert.equal(404, status);
          assert.equal('No active user found with that ID.', body.message);
        })
        .catch(err => { throw err; });
    });
  });
});
