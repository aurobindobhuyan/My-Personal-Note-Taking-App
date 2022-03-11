import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { List, ListItemButton, Divider, Box } from '@mui/material';
import useBackgroundColor from '../Custom-Hooks/useBackgroundColor';

const Account = (props) => {
     const [selectedText, setSelectedText] = useState('username');
     const store = useSelector((store) => {
          return store.userDetails
     })

     const handleListItemClick = (text) => {
          setSelectedText(text)
     }

     // Adding background color by using custom hooks
     useBackgroundColor("linear-gradient(45deg, rgb(243 120 108), rgb(230 251 144), rgb(91 233 233))")

     return (
          <>
               <h1 style={{ textAlign: 'center' }}>DETAILS ABOUT USER</h1>
               <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '30%' }}>
                         <Box sx={{ width: '100%', bgcolor: 'rgb(246 234 247)' }}>
                              <List component="nav" aria-label="main mailbox folders">
                                   <Divider />
                                   <ListItemButton
                                        selected={selectedText === "username"}
                                        onClick={() => handleListItemClick("username")}
                                   >
                                        <h2>USER NAME</h2>
                                   </ListItemButton>
                                   <Divider />

                                   <ListItemButton
                                        selected={selectedText === "email"}
                                        onClick={() => handleListItemClick("email")}
                                   >
                                        <h2>USER EMAIL</h2>
                                   </ListItemButton>
                                   <Divider />

                                   <ListItemButton
                                        selected={selectedText === "createdAt"}
                                        onClick={() => handleListItemClick("createdAt")}
                                   >
                                        <h2>CREATED AT</h2>
                                   </ListItemButton>
                                   <Divider />
                              </List>
                         </Box>
                    </div>
                    <div style={{ width: '30%', alignSelf: 'center' }}>
                         <h1 style={{ textAlign: 'center' }}>{store[selectedText]}</h1>
                    </div>
               </div>
          </>
     )
}

export default Account