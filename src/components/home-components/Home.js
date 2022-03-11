import React from 'react'
import { useSelector } from 'react-redux'
import { Button, CircularProgress, Box } from '@mui/material'
import useBackgroundColor from '../Custom-Hooks/useBackgroundColor'

const Home = (props) => {
     const store = useSelector((store) => {
          return store
     })

     // using custom hooks for adding background color
     useBackgroundColor("linear-gradient(45deg, #f09ef5,#a1aff7, #82fba7)")

     const handleMyNotesButtonClick = () => {
          props.history.push('/mynotes')
     }

     // Event Capturing and checking if the user is logged in or not
     const handleCapture = (e) => {
          if (!localStorage.getItem('token') && props.location.pathname === '/') {
               alert('You need to login first')
               props.history.push('/login')
               e.stopPropagation()
          }
     }

     return (
          <div style={{ textAlign: '-webkit-center' }} onClickCapture={handleCapture}>
               <h1>Home Component</h1>
               {
                    store.isLoggedIn && !store.userDetails.username ? (
                         <div>
                              <h1>Loading.....</h1>
                              <Box>
                                   <CircularProgress />
                              </Box>
                         </div>
                    ) : (
                         store.userDetails.username && (
                              <h2>Welcome - {store.userDetails.username}</h2>
                         )
                    )
               }
               <Button onClick={handleMyNotesButtonClick} variant="contained">My Notes</Button>
          </div>
     )
}

export default Home