import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions'
import { userConstants } from '../actions/constants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [firstName, setfirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: userConstants.USER_UPDATE_RESET })
      history.push('/admin/user-list')
    } else {
      if (!user.firstName || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setfirstName(user.firstName)
        setLastName(user.lastName)
        setUserName(user.username)
        setEmail(user.email)
        setRole(user.role)
        setProfilePicture(user.profilePicture)
        setContactNumber(user.contactNumber)
      }
    }
  }, [dispatch, userId, user, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        firstName,
        lastName,
        username,
        email,
        role,
        profilePicture,
        contactNumber,
      })
    )
  }

  return (
    <>
      <Link to='/admin/user-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Image
              src={profilePicture}
              alt={(firstName, lastName)}
              roundedCircle
              width='150px'
              height='150px'
            />
            <Form.Group controlId='profilePicture'>
              <Form.Label>Edit Profile Picture:</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => setProfilePicture(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='first name'
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Last Name'
                value={lastName || ''}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='username'
                placeholder='username'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='contactNumber'>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type='number'
                maxLength='10'
                placeholder='Enter contact number'
                value={contactNumber || ''}
                onChange={(e) => setContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as='select'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='user'>User</option>
                <option value='artist'>Artist</option>
                <option value='admin'>Admin</option>
              </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
