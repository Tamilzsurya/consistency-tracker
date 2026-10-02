const {db} = require('../config/db');

const getTotalTasks = async (userId) => {
    const query = `
        SELECT COUNT(*) AS totalTasks
        FROM habits
        WHERE user_id = ?
    `;
    const [result] = await db.execute(query, [userId])
    return Number(result[0].totalTasks)
}

const getTodayCompletedTasks = async (userId) => {
    const query = `
        SELECT COUNT(*) AS todayCompletedTasks
        FROM habit_entries AS he INNER JOIN habits AS h
        ON he.habit_id = h.id
        WHERE h.user_id = ? 
          AND he.entry_date = CURDATE()
          AND he.is_completed = TRUE   
    `;
    const [result] = await db.execute(query, [userId])
    
    return Number(result[0].todayCompletedTasks)
}

// const getTodayIncompletedTasks = async (userId) => {
//     const query = `
//         SELECT COUNT(*) AS todayIncompletedTasks
//         FROM habit_entries AS he INNER JOIN habits AS h
//         ON he.habit_id = h.id
//         WHERE h.user_id = ? 
//           AND he.entry_date = CURDATE()
//           AND he.is_completed = FALSE  
//     `;
//     const [result] = await db.execute(query, [userId])
    
//     return Number(result[0].todayIncompletedTasks)
// }

const getMonthCompletedTasks = async (userId) => {
    const query = `
        SELECT COUNT(*) AS monthCompletedTasks
        FROM habit_entries AS he
        JOIN habits AS h
          ON he.habit_id = h.id
        WHERE h.user_id = ?
          AND he.entry_date >= DATE_FORMAT(CURDATE(), "%Y-%m-01")
          AND he.entry_date <= CURDATE()
          AND he.is_completed = TRUE
    `;

    const [result] = await db.execute(query, [userId])

    return Number(result[0].monthCompletedTasks)
}

const taskCompletedDates = async (userId) => {
    const query = `
        SELECT DISTINCT entry_date
        FROM habit_entries AS he
        JOIN habits AS h
          ON he.habit_id = h.id
        WHERE h.user_id = ?
          AND he.is_completed = TRUE
        ORDER BY entry_date ASC
    `;    

    const [rows] = await db.execute(query, [userId])

    return rows
}


module.exports = { getTodayCompletedTasks, getMonthCompletedTasks, taskCompletedDates, getTotalTasks } 