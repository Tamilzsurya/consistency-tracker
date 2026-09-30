const express = require('express')

const {
  // getAllUsers,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
  getUserByToken
} = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()


// router.get('/', getAllUsers)

// router.get('/:id', getUserById)

// router.post('/', createUser)

// router.put('/:id', updateUser)

// router.delete('/:id', deleteUser)

router.get('/me', authMiddleware, getUserByToken)

module.exports = router