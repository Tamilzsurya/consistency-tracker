const {db} = require('../config/db')


// GET USER BY EMAIL
const getUserByEmail = async email => {
  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `

  const [rows] = await db.execute(query, [email])
  
  return rows[0]
}

// CREATE
const createUser = async (userName, email, hashedPassword) => {
  const query = `
    INSERT INTO users
    (full_name, email, password_hash)
    VALUES (?, ?, ?)
  `

  const [result] = await db.execute(query, [
    userName,
    email,
    hashedPassword,
  ])

  return result.insertId
}


// READ ALL
const getAllUsers = async () => {
  const query = `
    SELECT
      id,
      full_name,
      email,
      password_hash,
      provider,
      created_at
    FROM users
  `

  const [rows] = await db.execute(query)

  return rows
}


// READ ONE
const getUserById = async id => {
  const query = `
    SELECT
      id,
      full_name,
      email,
      password_hash,
      provider,
      created_at
    FROM users
    WHERE id = ?
  `

  const [rows] = await db.execute(query, [id])

  return rows[0]
}


// UPDATE
const updateUser = async (id, userName, email) => {
  const query = `
    UPDATE users
    SET
      full_name = ?,
      email = ?
    WHERE id = ?
  `

  const [result] = await db.execute(query, [
    userName,
    email,
    id,
  ])

  return result
}


// DELETE
const deleteUser = async id => {
  const query = `
    DELETE FROM users
    WHERE id = ?
  `

  const [result] = await db.execute(query, [id])

  return result
}


module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}