import React, { useState, useEffect, useRef } from 'react'
import { Link, Route } from 'react-router-dom';
import axios from 'axios'
import validator from 'validator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Login from './Login';
import useBackgroundColor from '../Custom-Hooks/useBackgroundColor';
import useInputRefs from '../Custom-Hooks/useInputRefs';
import './register.css'

const Register = (props) => {
     const [input, setInput] = useState({ userName: '', email: '', password: '', confirmPassword: '' })
     const [showHidePassword, setShowHidePassword] = useState(false)
     const [progressBar, setProgressBar] = useState(0)
     const max = 100
     const [errorHandle, setErrorHandle] = useState({})
     const error = {}
     const userNameRef = useRef(null);
     const emailRef = useRef(null);
     const passwordRef = useRef(null);
     const confirmPasswordRef = useRef(null);

     const userName = input.userName // Storing state value in constant variable
     const email = input.email
     const password = input.password
     const confirmPassword = input.confirmPassword

     // using useRef to focus the input feilds
     useInputRefs(errorHandle, userNameRef, "userName", emailRef, "email", passwordRef, "password", confirmPasswordRef, "confirmPassword")

     // Handling ProgressBar
     useEffect(() => {
          const obj = {
               userName: userName,
               email: email,
               password: password,
               confirmPassword: confirmPassword
          }
          const result = Object.values(obj).filter(ele => ele)
          setProgressBar(result.length / 4 * max)
     }, [input])

     // Adding background color
     useBackgroundColor("linear-gradient(144deg, #08b1b1, transparent)")

     // For error handling
     const handleError = () => {
          if (userName.trim().length === 0) {
               error.userName = '*required'
          }
          if (email.trim().length === 0) {
               error.email = '*required'
          } else if (!validator.isEmail(email)) {
               error.email = '*Enter valid email'
          }
          if (password.trim().length === 0) {
               error.password = '*required'
          }
          if (confirmPassword.trim().length === 0) {
               error.confirmPassword = '*required'
          } else if (password !== confirmPassword) {
               error.confirmPassword = 'not matched'
          }
     }

     const handleInput = (e) => {
          setInput({ ...input, ...{ [e.target.name]: e.target.value } })
     }

     const handleShowHidePassword = () => {
          setShowHidePassword(!showHidePassword)
     }

     const handleSubmit = (e) => {
          e.preventDefault()
          handleError()

          if (Object.keys(error).length === 0) {
               const formData = {
                    username: userName,
                    email: email,
                    password: password
               }
               // Displaying Success Message to the user
               setErrorHandle({ value: "Form send to Server" })

               axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
                    .then((response) => {
                         if (response.data.hasOwnProperty('errors')) {
                              setErrorHandle({})
                              alert(response.data.message)
                         } else {
                              setInput({ userName: '', email: '', password: '', confirmPassword: '' })
                              setProgressBar(0)
                              setErrorHandle({})
                              alert('Successfully created an account')
                              props.history.push('/login')
                         }
                    })
                    .catch((err) => {
                         alert(err.message)
                    })
          } else {
               setErrorHandle(error)
          }
     }

     return (
          <div>
               <div className="mainDiv">
                    <h1 style={{ textAlign: 'center' }}>Register With Us</h1>

                    {errorHandle.value && <h3 style={{ color: 'green', textAlign: 'center' }}>{errorHandle.value}</h3>}
                    {parseInt(progressBar)}% requirements matched
                    <br />
                    <progress value={progressBar} max={max} ></progress>
                    <br />
                    <br />
                    <hr />

                    <form onSubmit={handleSubmit}>
                         <div>
                              <label>Username</label>
                              <input
                                   className={errorHandle.userName ? 'error' : 'input'}
                                   type="text"
                                   name="userName"
                                   value={userName}
                                   placeholder='Username'
                                   onChange={handleInput}
                                   ref={userNameRef}
                                   autoComplete="none"
                              />
                              {errorHandle.userName && <b style={{ color: 'red' }}>{errorHandle.userName}</b>}
                         </div>
                         <br />
                         <hr />

                         <div>
                              <label>Email</label>
                              <input
                                   className={errorHandle.email ? 'error' : 'input'}
                                   type="text"
                                   name="email"
                                   value={email}
                                   placeholder='Email'
                                   onChange={handleInput}
                                   ref={emailRef}
                                   autoComplete='none'
                              />
                              {errorHandle.email && <b style={{ color: 'red' }}>{errorHandle.email}</b>}
                         </div>
                         <br />
                         <hr />

                         <div style={{ display: 'flex' }}>
                              <label>Password</label>
                              <div className="parentDiv">
                                   <input
                                        className={errorHandle.password ? 'passwordError' : 'passwordInput'}
                                        type={showHidePassword ? "text" : "password"}
                                        name="password"
                                        placeholder='Password'
                                        value={password}
                                        onChange={handleInput}
                                        ref={passwordRef}
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
                              {errorHandle.password && <b style={{ color: 'red' }}>{errorHandle.password}</b>}
                         </div>
                         <br />
                         <hr />

                         <div>
                              <label>Re-Enter</label>
                              <input
                                   type="password"
                                   name='confirmPassword'
                                   className={errorHandle.confirmPassword ? 'error' : 'input'}
                                   placeholder='Confirm Password'
                                   value={confirmPassword}
                                   onChange={handleInput}
                                   ref={confirmPasswordRef}
                              />
                              {errorHandle.confirmPassword && <b style={{ color: 'red' }}>{errorHandle.confirmPassword}</b>}
                         </div>
                         <br />
                         <div style={{ textAlign: '-webkit-center' }}>
                              <button className='button' onClick={handleSubmit}>Create A New Account</button>
                         </div>
                    </form>
                    <br />

                    <h2 style={{ textAlign: 'center' }}><Link to="/login">Already have an account?</Link></h2>

                    <Route path='/login' component={Login} />
               </div>
          </div>
     )
}

export default Register