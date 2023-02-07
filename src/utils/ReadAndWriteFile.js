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

const changeData = async (post, id) => {
  try {
    const data = await getTalkersData();
    for (let index = 0; index < data.length; index += 1) {
      if (data[index].id === +id) {
        data[index].name = post.name;
        data[index].age = +post.age;
        data[index].talk.watchedAt = post.talk.watchedAt;
        data[index].talk.rate = +post.talk.rate;
      }
    }    
    await fs.writeFile('src/talker.json', JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

module.exports = { getTalkersData, insertData, changeData };