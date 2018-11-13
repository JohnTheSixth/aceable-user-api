const handleMongoError = ({ message: msg }) => ({ status: 422, message: msg });

const handleAppError = (data) => ({ status: 400, message: data.message });

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
