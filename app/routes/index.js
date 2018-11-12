// Assign Express router to const
const router = require('express').Router();

// Import /users path router
const userRouter = require('./users');

router.use('/users', userRouter);

module.exports = router;
