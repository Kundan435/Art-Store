import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @ desc    Auth user & get token
// @route    POST /api/user/login
// @acccess  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      LastName: user.lastName,
      username: user.username,
      user: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @ desc    Register new user
// @route    POST /api/users
// @acccess  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      LastName: user.lastName,
      username: user.username,
      user: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @ desc    Get user profile
// @route    GET /api/user/profile
// @acccess  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      contactNumber: user.contactNumber,
      profilePicture: user.profilePicture,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @ desc    Update user profile
// @route    PUT /api/user/profile
// @acccess  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.profilePicture = req.body.profilePicture || user.profilePicture
    user.contactNumber = req.body.contactNumber || user.contactNumber

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      LastName: updatedUser.lastName,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      contactNumber: updatedUser.contactNumber,
      role: updatedUser.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @ desc    Get all profile
// @route    GET /api/users
// @acccess  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @ desc    Get user by Id
// @route    GET /api/users/:id
// @acccess  Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @ desc    Update user profile
// @route    PUT /api/users/:id
// @acccess  Private, Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.profilePicture = req.body.profilePicture || user.profilePicture
    user.contactNumber = req.body.contactNumber || user.contactNumber
    user.role = req.body.role || user.role

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      contactNumber: updatedUser.contactNumber,
      role: updatedUser.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @ desc    Delete a user
// @route    Delete /api/users/:id
// @acccess  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
}
