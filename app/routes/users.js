const userRoutes = require('express').Router();
const { userHandlers: handlers, errorHandler } = require('../handlers');

userRoutes.get('/:id', (req, res) => {
  handlers.get(req.params)
    .then(data => res.status(200).json(data))
    .catch(data => {
      const { status, message } = errorHandler(data);
      res.status(status).json({ message: message })
    });
});

userRoutes.post('/', (req, res) => {
  handlers.post(req.body)
    .then(data => res.status(200).json(data))
    .catch(data => {
      const { status, message } = errorHandler(data);
      res.status(status).json({ message: message })
    });
});

userRoutes.delete('/:id', (req, res) => {
  handlers.del(req.params)
    .then(data => res.status(200).json(data))
    .catch(data => {
      const { status, message } = errorHandler(data);
      res.status(status).json({ message: message })
    });
});

module.exports = userRoutes;
