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

const updateHabit = async (habitId, name, category) => {
    const query = `
        UPDATE habits
        SET name = ?, category = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(query, [name, category, habitId]);
    return result;
}

const getAllHabits = async (userId) => {

    const query = `
        SELECT * FROM habits
        WHERE user_id = ?
    `;

    const [rows] = await db.execute(query, [userId])

    return rows

}

const deleteHabit = async (habitId) => {
    const query = `
        DELETE FROM  habits
        WHERE id = ?
    `;

    const [result] = await db.execute(query, [habitId]);
    
    return result;
}

module.exports = { createHabit, getAllHabits, deleteHabit, updateHabit }