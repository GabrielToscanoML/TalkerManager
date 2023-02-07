const { readFile } = require('fs/promises');
const path = require('path');

const getTalkersData = async () => {
  const file = await readFile(path.resolve(__dirname, '../', 'talker.json'));
  return JSON.parse(file);
};

const getID = async (id) => {
  const talkersData = await getTalkersData();
  return talkersData.find((obj) => obj.id === +id);
};

const generateToken = () => {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

module.exports = {
  getTalkersData,
  getID,
  generateToken,
};