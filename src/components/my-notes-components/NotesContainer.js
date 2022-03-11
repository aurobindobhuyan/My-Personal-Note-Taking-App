import React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress, Box } from '@mui/material';
import DisplayNotes from './DisplayNotes'

const NotesContainer = (props) => {
     const store = useSelector((store) => {
          return store
     })

     return (
          <div style={{ width: '60%' }}>
               {
                    store.myNotes.length === 0 ? (
                         <>
                              <h1>No Notes found</h1>
                              <h2>Add Your First Note</h2>
                         </>
                    ) : (
                         <>
                              {store.request && (
                                   <div style={{ textAlign: 'center' }}>
                                        <h1>Loading.....</h1>
                                        <Box>
                                             <CircularProgress />
                                        </Box>
                                   </div>
                              )}
                              {store.myNotes.map(ele => <DisplayNotes key={ele._id} {...ele} />)}
                         </>
                    )
               }
          </div>
     )
}

export default NotesContainer