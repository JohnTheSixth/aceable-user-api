const router = require('express').Router();

// Import /users path router
const userRouter = require('./users');

// Tell the application to use the actions defined in the userRouter for the /users path.
router.use('/users', userRouter);

module.exports = router;
