const express = require('express');
const { validateName, validateAge, validateTalk,
    validateWatchedAt, validateRate, validateToken } = require('../middleware/talkerServices');
const { getTalkersData, insertData, changeData, deleteData } = require('../utils/ReadAndWriteFile');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

router.get('/', async (_req, res) => {
  const talkersData = await getTalkersData();
  if (talkersData) return res.status(HTTP_OK_STATUS).json(talkersData);
  return res.status(HTTP_ERROR_STATUS).json([]);
});

router.get('/search',
  validateToken,
  async (req, res) => {
  const { q } = req.query;
  const allTalkers = await getTalkersData();
  const resultFilterExistence = allTalkers.filter(
    (talker) => talker.name.includes(q),
  );
  if (resultFilterExistence) return res.status(HTTP_OK_STATUS).json(resultFilterExistence);
  return res.status(HTTP_OK_STATUS).json([]);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersData = await getTalkersData();

  for (let index = 0; index < talkersData.length; index += 1) {
    if (talkersData[index].id === +id) {
      return res.status(HTTP_OK_STATUS).json(talkersData[index]);
    }
  }
  return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const reqBody = req.body;
    const talkersData = await getTalkersData();
    const newID = (talkersData.length) + 1;
    const newTalkerObj = {
      id: newID,
      ...reqBody,
    };
    await insertData(newTalkerObj);
    res.status(201).json(newTalkerObj);
  });

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt, 
  validateRate,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
  await changeData(req.body, id);
  const data = {
    id: +id,
    name,
    age: +age,
    talk: {
      watchedAt,
      rate: +rate,
    },
  };
 res.status(HTTP_OK_STATUS).json(data);
});

router.delete('/:id',
  validateToken,
  async (req, res) => {
  const talkersData = await getTalkersData();
  const { id } = req.params;
  const dataIndex = talkersData.findIndex((item) => item.id === +id);
  talkersData.splice(dataIndex, 1);
  await deleteData(id);
  res.status(204).end();
});

module.exports = router;
