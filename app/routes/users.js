const userRoutes = require('express').Router();
const { userHandlers: handlers, errorHandler } = require('../handlers');

userRoutes.post('/', (req, res) => {
  handlers.post(req.body)
    .then(data => res.status(200).json(data))
    .catch(data => {
      const { status, message } = errorHandler(data);
      res.status(status).json({ message: message })
    });
});

userRoutes.delete('/:id', (req, res) => {
  console.log('PARAMS:', req.params);
  handlers.del(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(data => {
      const { status, message } = errorHandler(data);
      res.status(status).json({ message: message })
    });
});

module.exports = userRoutes;
