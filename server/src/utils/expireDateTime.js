
const currentDate = new Date();
const currentTime = currentDate.getTime();

const expireTime = new Date(currentTime + 1000 * 60 * 10);

module.exports = {expireTime};

