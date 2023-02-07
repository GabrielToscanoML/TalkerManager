const { readFile } = require('fs/promises');
const path = require('path');

const getTalkersData = async () => {
  const file = await readFile(path.resolve(__dirname, '../', 'talker.json'));
  return JSON.parse(file);
};

module.exports = {
  getTalkersData,
};