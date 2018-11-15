const { request, response } = require('../data');

const get = (params) => {
  if (params.id) {
    return request.findUserById(params.id)
      .then(data => response.removePassword(data))
      .catch(err => Promise.reject(err))
  } else {
    return Promise.reject({
      status: 400,
      message: 'A user ID must be provided.',
    });
  }
};

const post = (body) => {
  if (body.user_query) {
    return request.findUserByEmailPass(body.user_query)
      .then(data => response.removePassword(data))
      .catch(err => Promise.reject(err)); // bubble up through the promise chain to the client
  } else {
    return request.create(body)
      .then(data => response.filterCreatedData(data))
      .catch(err => Promise.reject(err)); // bubble up through the promise chain to the client
  }
};

const deactivate = (params) => {
  return request.deactivate(params.id);
};

module.exports = {
  get,
  post,
  del: deactivate,
};
