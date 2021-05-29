const express = require('express');
const { signupHandler, loginHandler } = require('../Controllers/user.js');
const router = express.Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);

module.exports = router;
