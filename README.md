# Contents

- [How to Use the API](#how-to-use-the-api) (no Node.js required!)
  - [Authorization](#authorization)
  - [POST to Create a User](#post-to-create-a-user)
  - [GET to Retrieve a User by ID](get-to-retrieve-a-user-by-id)
  - [POST to Retrieve a User by Email and Password](#post-to-retrieve-a-user-by-email-and-password)
    - [Why POST to Retrieve?](#why-post-to-retrieve)
  - [DELETE to Deactivate a User](#delete-to-deactivate-a-user)
  - [A Note on Error Response Statuses](#a-note-on-error-response-statuses)
- [How to Run the API](#how-to-run-the-api) (Node.js required)
  - [Starting the Server](#starting-the-server)
  - [Running Tests](#running-tests) (Node.js required here too)
- [Directory Structure](#directory-structure)
- [Design Document](#design-document)

# How to Use the API

This API deals strictly with JSON data. As such, every request (except GETs) must include a
`Content-Type: application/json` header.

## Authorization

There is currently no authorization enabled on the API. This may change in the future depending
on how we decide to use the API, and who it will be exposed to. For future authorization
considerations, clients should expect to be required to create an account as an API User,
which will entitle them to a unique API key that they will need to pass in the header of every
request they make.

Ideally the future authorization implementation will require the client to pass not only their key,
but also an initial auth request that will provide the approved client with a JSON web token. The
client will then need to pass this along with their key.

This implementation will still need some working out, based on future use cases.

## POST to Create a User

To create a User, make a POST request to the `/users` endpoint. The body must be a JSON object that
includes _at least_ `first_name`, `email`, and `password` fields. Example:

```
curl -XPOST -H 'Content-Type: application/json' -d '{"first_name": "Bob", "email": "bob@bobsburgers.com", "password": "12345"}' http://localhost:3000/users
```

The requirement to include these three fields is enforced by the database. If the request does not
include at least these three fields, the API will return a 422 to the user with the message of
`Document failed validation.`

The API also supports a `last_name` property, which can be included with the request but is not required.
If the user provides an `_id` field, an `active` field, or any other field, these will be ignored.

If the client attempts to create a user that already has the specified email address, the API will
return a 422 error with a message that includes `E11000 duplicate key error`. This uniqueness is
enforced by the database, so the client must choose another email address to use.

## GET to Retrieve a User by ID

A client may find an existing user by submitting a simple GET request to the `/users/:id` endpoint,
where `:id` is the ObjectId of the user created by the Mongo database:

```
curl http://localhost:3000/users/a1b2c3d4e5f6g7h8i9j10k11
```

If the user exists, the response body will include that user's document. If the user is inactive,
the API will return a 404 with the message `No active user found with that ID.`.

If a bad ID is passed to the server, the API will return a 400 with the message
`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`.

## POST to Retrieve a User by Email and Password

When the client knows a user's email and password, they may retrieve that user by submitting a POST
request with a specifically structured body to the `/users` endpoint. That body must be a JSON
object and include the single key `user_query`. The value of that key must be an object that
contains the user's email and password. For example:

```
{
  "user_query": {
    "email": "bob@bobsburgers.com",
    "password": "12345"
  }
}
```

All together, the request will look like this:

```
curl -XPOST -H 'Content-Type: application/json' -d '{"user_query": {"email": "bob@bobsburgers.com", "password": "12345"}}' http://localhost:3000/users
```

### Why POST to Retrieve?

Because the client is required to pass in a user's password, and because the API server cannot know
how the client will be making their requests, there is a need to obscure the data to some degree.

A GET request that includes a user's password as a query string is apallingly insecure, largely because
the password will be included in plain text as part of the URL. That URL may be logged by the client's
server, the client's browser, or some other entity, making it easy to find with not much work.

While a POST request is not much more secure, it does have the benefit of removing the password from
the URL to the body. It's possible to implement additional server-side measures to obscure the POST
body data that cannot be applied to GET requests. Hence, this API requires the client to make a POST
request when including user data (all of which is sensitive information to some extent).

## DELETE to Deactivate a User

If the client knows a user's document ID (generated dynamically by the database), they can deactivate
a user by making a DELETE request to the `/users/:id` endpoint, where `:id` is the document ID. No
JSON body is required for this request.

This request will only work if the user document with the specified ID is marked as `{ "active": "true" }`.
Otherwise, the API will return a 404 with the message `No active user found with that ID.`. Note that
this does not actually mean the user document does not exist in the database; it only means that the
API was unable to find a document with that ID that was also marked as `{ "active": "true" }`.

An example DELETE request will look like this:

```
curl -XDELETE http://localhost:3000/users/a1b2c3d4e5f6g7h8i9j10k11
```

Also note that if the ID is incorrectly formed, the API will return the same error as a GET request
with an incorrectly formed ID (see [GET to Retrieve a User by ID](get-to-retrieve-a-user-by-id) above).

## A Note on Error Response Statuses

This API uses errors that are intended to be as descriptive as possible. In general, the error
response statuses provided by this API are intended to give a clear indication of what went wrong.
This API uses the following statuses for the following purposes:

- **400**: There is a problem with the request submitted by the client, and typically has to do with
bad syntax or JSON structure in the request.
- **401**: When searching for a user by email and password, the password does not match what is stored.
- **404**: A client attempted to find a user that is inactive or nonexistent.
- **422**: This is by far the most common, and is used to indicate that properties of the data are
not acceptable or permissible for use in creating/retrieving documents. The client should check their
request to ensure they are providing all the necessary data in the request.
- **500**: Something went wrong on the server side, and cannot be fixed by the client.

# How to Run the API

The API runs on Node.js v10.13.0. If you use [Node Version Manager](https://github.com/creationix/nvm),
a `.nvmrc` file has been included with this repository. Run the following to get it up and running:

```
nvm install v10.13.0
nvm use
```

NVM will detect the `.nvmrc` file and use the specified version.

For other methods of managing Node versions, please refer to your specified documentation to install/use
Node.js 10.13.0.

Once your Node version is set correctly, run the following:

```
npm install
```

This will install all the project dependencies.

## Starting the Server

It is worth noting that if you are running the API for the first time, there may be a delay in
downloading the Mongo binaries to use with the API. To do this first, and to speed up the server
start time, run the following:

```
npm run db-start
```

This is not strictly necessary though. If you don't really care about the server start time, you can
run the following from the root of the repository:

```
npm start
```

This will install the binaries (if needed) and then start the API server.

## Running Tests

Tests are pretty straightforward. To run them, run the following:

```
npm test
```

The Mocha tests will output statuses to the console.

# Directory Structure

The code has been structured in the following way:

```
__tests__       # where the test specs and data live
app
 | data         # code for scrubbing/formatting request and response data
 | handlers     # request handlers, sorted by router
 | routes       # code defining application routes
 | app.js       # app configuration script
 | index.js     # app startup script
db
 | config       # code to configure the database, including collections and indices
 | operations   # code for insert/find/update operations
 | schemas      # Mongo schemas for collections
scripts         # one-off tasks that are not part of the main application
```

# Design Document

The design for this application was outlined in the document [api-project-design-document.pdf](api-project-design-document.pdf), included as part of this repository.