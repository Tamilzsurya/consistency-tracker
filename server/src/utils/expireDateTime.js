
const expireDateTime = () => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const expireTime = new Date(currentTime + 1000 * 60 * 5);

    return expireTime
}



module.exports = {expireDateTime};

