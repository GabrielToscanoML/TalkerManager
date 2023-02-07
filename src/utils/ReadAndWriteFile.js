const fs = require('fs/promises');

const getTalkersData = async () => {
  try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    return null;
  }
};

const insertData = async (post) => {
  try {
    const data = await getTalkersData();
    data.push(post);
    await fs.writeFile('src/talker.json', JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

module.exports = { getTalkersData, insertData };