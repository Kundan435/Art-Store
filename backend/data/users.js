import bcrypt from 'bcryptjs'

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    firstName: 'Artist',
    lastName: 'User',
    username: 'artist',
    email: 'artist@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'artist',
  },
  {
    firstName: 'User',
    lastName: 'Default',
    username: 'user',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'user',
  },
]

export default users
