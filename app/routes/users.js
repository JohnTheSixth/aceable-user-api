const userRoutes = require('express').Router();

const { userHandlers: handlers } = require('../handlers');

userRoutes.get('/', (req, res) => {
  console.log('GET users path');
  res.status(200).json({ message: 'user route established' });
});

userRoutes.post('/', (req, res) => {
  handlers.post(req.body);
  res.status(200).json({ message: 'request received' });
});

userRoutes.delete('/:id', (req, res) => {
  handlers.del(req.params);
  res.status(200).json({ message: 'deletion request received' })
});

module.exports = userRoutes;
