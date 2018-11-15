const handleMongoError = ({ message: msg }) => ({ status: 422, message: msg });

const handleAppError = (data) => {
  // If status is provided in error, use that; otherwise, use 400
  const status = (data.status || 400);

  return {
    status,
    message: data.message
  }
}

const errorHandler = (data) => {
  let errorData;

  if (data.name === 'MongoError') {
    errorData = handleMongoError(data);
  } else {
    errorData = handleAppError(data);
  }

  return errorData;
}

module.exports = errorHandler;
