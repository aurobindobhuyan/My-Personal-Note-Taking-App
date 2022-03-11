import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Box } from '@mui/material';

import NotesContainer from '../my-notes-components/NotesContainer'
import AddNotes from '../my-notes-components/AddNotes'
import AlertMessage from '../my-notes-components/AlertMessage'
import useBackgroundColor from '../Custom-Hooks/useBackgroundColor'
import { cancelRequest } from "../../redux/action/requestAction"

const MyNotes = (props) => {
     const store = useSelector((store) => {
          return store
     })
     const dispatch = useDispatch()

     // Removing spinner after a successful operation
     useEffect(() => {
          if (localStorage.getItem('value')) {
               dispatch(cancelRequest())
          }
     }, [localStorage.getItem('value')])

     // Adding background color by using custom hooks
     useBackgroundColor("linear-gradient(318deg, #f3c3cb, #f3cc84, rgb(130, 251, 167))")

     return (
          <div>
               <h1 style={{ textAlign: 'center' }}>MyNotes - {store.myNotes.length}</h1>
               {
                    store.request && Object.keys(store.userDetails).length === 0 && store.myNotes.length === 0 ? (
                         <div style={{ textAlign: 'center' }}>
                              <h1>Loading.....</h1>
                              <Box>
                                   <CircularProgress />
                              </Box>
                         </div>
                    ) : (
                         <>
                              <div style={{ textAlign: '-webkit-center' }}>
                                   <AlertMessage />
                              </div>

                              <div style={{ display: 'flex' }}>
                                   <NotesContainer />
                                   <AddNotes />
                              </div>
                         </>
                    )
               }
          </div >
     )
}

export default MyNotes