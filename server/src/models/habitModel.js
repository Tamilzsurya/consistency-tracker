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

const getAllHabits = async (userId) => {

    const query = `
        SELECT * FROM habits
        WHERE user_id = ?
    `;

    const [rows] = await db.execute(query, [userId])

    return rows

}

module.exports = { createHabit, getAllHabits }