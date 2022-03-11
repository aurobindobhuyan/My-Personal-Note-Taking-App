import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./NavBar"
import { userLoggedIn } from './redux/action/loginAction'
import { startGetDetails } from './redux/action/usersDetails';
import { startGetNotes } from './redux/action/myNotesAction'
import { makingRequest } from './redux/action/requestAction'

function App(props) {
  const store = useSelector((store) => {
    return store
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userLoggedIn())
      toast.success('Welcome!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [])

  useEffect(() => {
    if (Object.keys(store.userDetails).length === 0 && localStorage.getItem('token')) {
      dispatch(startGetDetails())
      dispatch(startGetNotes())
      dispatch(makingRequest())
    }
  }, [store.isLoggedIn])

  return (
    <React.StrictMode>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar />
    </React.StrictMode>
  )
}

export default App
