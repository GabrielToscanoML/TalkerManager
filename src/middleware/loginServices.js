const HTTP_ERROR_STATUS = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const emailCheck = emailRegex.test(email);

  if (!emailCheck) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
      );
  }
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length <= 5) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
      );
  }
  return next();
};

module.exports = { validateEmail, validatePassword };