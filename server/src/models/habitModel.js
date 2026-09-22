const {db} = require('../config/db')

const createHabit = async (userId, name, category) => {
    const query = `
        INSERT INTO habits
        (user_id, name, category)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(query, [userId, name, category]);
    return result.insertId
}

module.exports = { createHabit }