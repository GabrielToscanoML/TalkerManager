const express = require('express');
const { validateEmail, validatePassword } = require('../middleware/loginServices');
const { generateToken } = require('../middleware/talkerServices');

const router = express.Router();

const HTTP_OK_STATUS = 200;
// const HTTP_ERROR_STATUS = 404;

router.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;