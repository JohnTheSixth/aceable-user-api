const createUser = (data) => {
  console.log('CREATE USER:', data);
}

const findUser = (data) => {
  console.log('FIND USER:', data);
}

const post = (data) => {
  if (data.email_pass) {
    findUser(data.email_pass);
  } else {
    createUser(data);
  }
}

const deactivate = (data) => {
  console.log('DEACTIVATE USER:', data);
}

module.exports = {
  post: post,
  del: deactivate
}
