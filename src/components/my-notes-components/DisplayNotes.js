import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { GridActionsCellItem } from '@mui/x-data-grid-pro'
import CancelIcon from '@mui/icons-material/Close'

import EditNotes from './EditNotes'
import { startDeleteNote } from '../../redux/action/myNotesAction'
import { makingRequest } from '../../redux/action/requestAction'

const DisplayNotes = (props) => {
     const { _id, title, body } = props
     const [toggle, setToggle] = useState(false)
     const dispatch = useDispatch()

     // Toggling between Displaying task & Edit task.
     const handleToggle = () => {
          setToggle(!toggle)
     }

     const handleRemove = () => {
          const result = window.confirm('Are you sure')
          if (result) {
               dispatch(startDeleteNote(_id))
               dispatch(makingRequest())
          }
     }

     return (
          <div style={{ width: '80%', backgroundColor: '#9aedc7', margin: '15px' }}>
               {
                    !toggle ? (
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                              <div style={{ display: 'block', width: '80%' }}>
                                   <Accordion style={{ backgroundColor: 'orange' }}>
                                        <AccordionSummary
                                             expandIcon={<ExpandMoreIcon />}
                                             aria-controls="panel1a-content"
                                             id="panel1a-header"
                                        >
                                             <Typography> {title} </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                             <Typography> {body} </Typography>
                                        </AccordionDetails>
                                   </Accordion>
                              </div>

                              <div style={{ paddingRight: '10px', paddingTop: '10px' }}>
                                   <GridActionsCellItem
                                        icon={<EditIcon />}
                                        onClick={handleToggle}
                                        label="Edit"
                                        className="textPrimary"
                                        color="inherit"
                                   />
                                   <GridActionsCellItem
                                        icon={<DeleteIcon />}
                                        label="Delete"
                                        onClick={handleRemove}
                                        color="inherit"
                                   />
                              </div>
                         </div>
                    ) : (
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div style={{ width: '80%', backgroundColor: 'orange' }}>
                                   <EditNotes handleToggle={handleToggle} id={_id} title={title} body={body} />
                              </div>
                              <div>
                                   <GridActionsCellItem
                                        icon={<CancelIcon />}
                                        label="Cancel"
                                        className="textPrimary"
                                        onClick={handleToggle}
                                        color="inherit"
                                   />
                              </div>
                         </div>
                    )
               }
          </div>
     )
}

export default DisplayNotes