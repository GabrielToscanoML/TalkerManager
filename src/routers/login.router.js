const express = require('express');
const { generateToken } = require('../services/talkerServices');

const router = express.Router();

const HTTP_OK_STATUS = 200;
// const HTTP_ERROR_STATUS = 404;

router.post('/login', (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;