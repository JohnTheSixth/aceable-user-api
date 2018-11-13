const dataHandlers = require('./data');

const post = (data) => {
  if (data.email_pass) {
    return dataHandlers.find(data.email_pass);
  } else {
    return dataHandlers.create(data);
  }
}

const deactivate = (data) => {
  console.log('DEACTIVATE USER');
  return dataHandlers.deactivateUser(data);
}

module.exports = {
  post: post,
  del: deactivate
}
