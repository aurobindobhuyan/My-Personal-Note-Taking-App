import React, { useState, useEffect, useRef } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import validator from 'validator'
import { CircularProgress, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Register from './Register'
import { userLoggedIn } from '../../redux/action/loginAction'
import useInputRefs from '../Custom-Hooks/useInputRefs'
import image from './image.png'
import './register.css'

const Login = (props) => {
     const [input, setInput] = useState({ email: '', password: '' });
     const [showHidePassword, setShowHidePassword] = useState(false)
     const [validate, setValidate] = useState({})
     const error = {}
     const emailRef = useRef(null)
     const passwordRef = useRef(null);
     const dispatch = useDispatch()

     const email = input.email // Storing inside a local variable for reusable
     const password = input.password

     // Adding background Image
     useEffect(() => {
          const body = document.querySelector('body')
          body.style.backgroundImage = `url(${image})`
          body.style.backgroundSize = '100% 100%'
          body.style.backgroundRepeat = 'no-repeat'
     }, [])

     // Handling focus input feild using useRef
     useInputRefs(validate, emailRef, "email", passwordRef, "password")

     const handleInput = (e) => {
          setInput({ ...input, ...{ [e.target.name]: e.target.value } })
     }

     // Responsible for validate the form
     const isValidate = () => {
          if (email.trim().length === 0) {
               error.email = '*Required'
          } else if (!validator.isEmail(email)) {
               error.email = "*Enter valid email"
          }
          if (password.trim().length === 0) {
               error.password = "*Required"
          }
     }

     const handleShowHidePassword = (e) => {
          setShowHidePassword(!showHidePassword)
     }

     const handleSubmit = (e) => {
          e.preventDefault()
          isValidate()

          if (Object.keys(error).length === 0) {
               setValidate({})
               const logInData = {
                    email: email,
                    password: password
               }
               setValidate({ value: 'Loading...' })
               axios.post('https://dct-user-auth.herokuapp.com/users/login', logInData)
                    .then((resposne) => {
                         if (resposne.data.hasOwnProperty('errors')) {
                              const result = { errors: resposne.data.errors }
                              setValidate(result)
                         } else {
                              setInput({ email: '', password: '' })
                              setValidate({})
                              alert('Successfully logged in')
                              localStorage.setItem('token', resposne.data.token)
                              dispatch(userLoggedIn())
                              props.history.push('/')
                         }
                    })
                    .catch((err) => {
                         alert(err.message)
                    })
          } else {
               setValidate(error)
          }
     }

     return (
          <div>
               <div className="mainDiv">
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                    {validate.value && (
                         <div style={{ textAlign: '-webkit-center' }}>
                              <h3 style={{ color: 'red' }}>{validate.value}</h3>
                              <Box>
                                   <CircularProgress />
                              </Box>
                         </div>
                    )}

                    <form onSubmit={handleSubmit}>
                         {validate.errors && <h3 style={{ color: 'red', textAlign: '-webkit-center' }}>{validate.errors}</h3>}
                         <div>
                              <label>Email</label>
                              <input
                                   className={validate.email ? 'error' : 'input'}
                                   type="text"
                                   value={email}
                                   placeholder='Email'
                                   name="email"
                                   onChange={handleInput}
                                   ref={emailRef}
                              />
                              {validate.email && <b style={{ color: 'red' }}>{validate.email}</b>}
                         </div>
                         <br />

                         <div style={{ display: 'flex' }}>
                              <label>Password</label>
                              <div className="parentDiv">
                                   <input
                                        className={validate.password ? 'passwordError' : 'passwordInput'}
                                        type={showHidePassword ? "text" : "password"}
                                        ref={passwordRef}
                                        value={password}
                                        placeholder='Password'
                                        name="password"
                                        onChange={handleInput}
                                   />
                                   <span className="showHideIcon" onClick={handleShowHidePassword}>
                                        {
                                             showHidePassword ? (
                                                  <VisibilityIcon />
                                             ) : (
                                                  <VisibilityOffIcon />
                                             )
                                        }
                                   </span>
                              </div>
                              {validate.password && <b style={{ color: 'red' }}>{validate.password}</b>}
                         </div>
                         <br />

                         <div style={{ textAlign: '-webkit-center' }}>
                              <button className='button' onClick={handleSubmit}>LogIn</button>
                         </div>
                    </form>
                    <br />

                    <h2 style={{ textAlign: 'center' }}><Link to="/register">Don't have any account?</Link></h2>
                    <Route path='/register' component={Register} />
               </div>
          </div>
     )
}

export default Login