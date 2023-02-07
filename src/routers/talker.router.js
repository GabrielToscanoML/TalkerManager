const express = require('express');
const { validateName, validateAge, validateTalk,
    validateWatchedAt, validateRate, validateToken } = require('../middleware/talkerServices');
const { getTalkersData, insertData } = require('../utils/ReadAndWriteFile');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

router.get('/talker', async (req, res) => {
  const talkersData = await getTalkersData();
  if (talkersData) return res.status(HTTP_OK_STATUS).json(talkersData);
  return res.status(HTTP_ERROR_STATUS).json([]);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersData = await getTalkersData();

  for (let index = 0; index < talkersData.length; index += 1) {
    if (talkersData[index].id === +id) {
      return res.status(HTTP_OK_STATUS).json(talkersData[index]);
    }
  }
  return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/talker',
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

/* Aqui preciso fazer aquela parte de next */
// router.put('/talker/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, age, talk } = req.body;
//   const talkersData = await getTalkersData();
//   let alteredTalker;

//   for (let index = 0; index < talkersData.length; index += 1) {
//     if (talkersData[index].id === +id) {
//       talkersData[index].name = name;
//       talkersData[index].age = age;
//       talkersData[index].talk = talk;
//       alteredTalker = talkersData[index];
//     }
//   }
//  res.status(HTTP_OK_STATUS).json({ alteredTalker });
// });

module.exports = router;
