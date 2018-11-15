const { request, response } = require('../data');

const post = (body) => {
  if (body.user_query) {
    return request.find(body.user_query)
      .then(data => response.removePassword(data))
      .catch(err => Promise.reject(err)); // bubble up through the promise chain to the client
  } else {
    return request.create(body)
      .then(data => response.filterCreatedData(data))
      .catch(err => Promise.reject(err)); // bubble up through the promise chain to the client
  }
}

const deactivate = (id) => {
  console.log('DEACTIVATE USER');
  return request.deactivate(id);
}

module.exports = {
  post,
  del: deactivate,
}
