const userModel = require('../models/userModel')

const createUser = async ( userName, email, password ) => {

  const existingUser = await userModel.getUserByEmail?.( email )

  if (existingUser) {
    throw new Error('Email already registered')
  }

  const userId = await userModel.createUser(
    userName,
    email,
    password
  )

  return userId
}


const getAllUsers = async () => {
  return await userModel.getAllUsers()
}


const getUserById = async id => {
  const user = await userModel.getUserById(id)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}


const updateUser = async (
  id,
  userName,
  email
) => {

  const user = await userModel.getUserById(id)

  if (!user) {
    throw new Error('User not found')
  }

  await userModel.updateUser(
    id,
    userName,
    email
  )

  return await userModel.getUserById(id)
}


const deleteUser = async id => {

  const user = await userModel.getUserById(id)

  if (!user) {
    throw new Error('User not found')
  }

  await userModel.deleteUser(id)
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}