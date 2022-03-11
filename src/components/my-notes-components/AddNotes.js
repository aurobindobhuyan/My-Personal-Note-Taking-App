import React from 'react'
import { useDispatch } from 'react-redux'
import NotesFrom from './NotesFrom'
import { startAddNotes } from '../../redux/action/myNotesAction'
import { makingRequest } from '../../redux/action/requestAction'

const AddNotes = (props) => {
     const dispatch = useDispatch()

     const handleFormSubmit = (formData) => {
          dispatch(startAddNotes(formData))
          dispatch(makingRequest())
     }

     return (
          <div style={{ width: '20%' }}>
               <h1>Add Notes</h1>
               <NotesFrom handleFormSubmit={handleFormSubmit} />
          </div>
     )
}

export default AddNotes