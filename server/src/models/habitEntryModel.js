const {db} = require('../config/db');


// get all habit entries by habit id
const getHabitEntries = async(habitId) => {
    const query = `
        SELECT *
        FROM habit_entries
        WHERE habit_id = ?
    `;

    const [rows] = await db.execute(query, [habitId]);

    return rows
}


// get single habit entry with corresponding habit
const getHabitEntry = async (id, habitId) => {
    const query = `
        SELECT *
        FROM habit_entries
        WHERE id = ? AND habit_id = ?
    `;

    const [rows] = await db.execute(query, [id, habitId]);

    return rows[0]
}


// create new habit entry
const createHabitEntry = async (userId, id, habitId, isCompleted, entryDate) => {
    const query = `
        INSERT INTO habit_entries (id, habit_id, is_completed, entry_date)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [id, habitId, isCompleted, entryDate]);

    return result
}


// update habit entry
const updateHabitEntry = async (id, habitId, isCompleted, entryDate) => {
    const query = `
        UPDATE habit_entries
        SET is_completed = ?, entry_date = ?
        WHERE id = ? AND habit_id = ?
    `;

    const [result] = await db.execute(query, [isCompleted, entryDate, id, habitId]);

    return result
}


module.exports = { getHabitEntries, getHabitEntry, createHabitEntry, updateHabitEntry }