const HTTP_ERROR_STATUS = 400;

const generateToken = () => {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length <= 2) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
      );
  }
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "age" é obrigatório' });
  if (typeof (age) !== 'number') {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O campo "age" deve ser do tipo "number"' },
      );
  }
  if (!(Number.isInteger(age))) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O campo "age" deve ser um "number" do tipo inteiro' },
      );
  }
  if (age < 18) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
      );
  }
  return next();
};

const validateTalk = (req, res, next) => {
   const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(watchedAt)) {
    // fonte: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
  }
        
  return next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (typeof (rate) !== 'number') {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!(Number.isInteger(rate))) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
      );
  }
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_ERROR_STATUS).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
      );
  }
  return next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof (authorization) !== 'string') {
    return res.status(401).json(
      { message: 'Token inválido' },
      );
  }
  return next();
};

module.exports = {
  generateToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};