const userService = require('../services/userService')


// GET /api/users
const getAllUsers = async (req, res, next) => {
  try {

    const users = await userService.getAllUsers()

    res.status(200).json({
      users,
    })

  } catch (error) {
    next(error)
  }
}


// GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {

    const {id} = req.params

    const user = await userService.getUserById(id)

    res.status(200).json({
      user,
    })

  } catch (error) {
    next(error)
  }
}


// POST /api/users
const createUser = async (req, res, next) => {
  try {

    const {userName, email, password,} = req.body

    const userId = await userService.createUser( userName, email, password )

    res.status(201).json({
      message: 'User created successfully',
      userId,
    })

  } catch (error) {
    next(error)
  }
}


// PUT /api/users/:id
const updateUser = async (req, res, next) => {
  try {

    const {id} = req.params

    const {
      userName,
      email,
    } = req.body

    const user = await userService.updateUser(
      id,
      userName,
      email
    )

    res.status(200).json({
      message: 'User updated successfully',
      user,
    })

  } catch (error) {
    next(error)
  }
}


// DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {

    const {id} = req.params

    await userService.deleteUser(id)

    res.status(200).json({
      message: 'User deleted successfully',
    })

  } catch (error) {
    next(error)
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}