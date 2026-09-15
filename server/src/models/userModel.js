const {db} = require('../config/db');
const { get } = require('../config/mail');

// GET USER BY GOOGLE ID
const getUserByGoogleId = async (googleId) => {
  const query = `
    SELECT * 
    FROM users
    WHERE google_id = ?
  `;
  
  const [rows] = await db.execute(query, [googleId])

  return rows[0]

}


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

// GET USER BY LOCAL USER ID
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
















// CREATE GOOGLE USER
const createGoogleUser = async (googleUser) => {
  const {
      fullName,
      email,
      googleId,
      profilePicture,
  } = googleUser;

  const query = `
    INSERT INTO 
    users (full_name, email, google_id, profile_picture, provider)
    VALUES (?, ?, ?, ?, 'google')
  `;

  const [result] = await db.execute(query, [fullName, email, googleId, profilePicture])

  return getUserById(result.insertId)

}

// CREATE LOCAL USER
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









// UPDATE GOOGLE ID: local user try to login with google oauth
const linkGoogleAccount = async ( {userId, googleId, profilePicture} ) => {
  const query = `
    UPDATE users
    SET 
      google_id = ?,
      profile_picture = COALESCE(profile_picture, ?)
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [googleId, profilePicture, userId])
  return getUserById(userId);
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
  getUserByGoogleId,
  createGoogleUser,
  linkGoogleAccount,
}