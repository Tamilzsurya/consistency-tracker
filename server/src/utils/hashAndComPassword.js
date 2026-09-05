const bcrypt = require('bcrypt');

const hashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password,  Number(process.env.SALT_ROUNDS));
    return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashedPassword,
    comparePassword
}