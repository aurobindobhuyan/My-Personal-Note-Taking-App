import React from 'react'
import { useDispatch } from "react-redux"
import NotesFrom from './NotesFrom'
import { startUpdateNotes } from '../../redux/action/myNotesAction'
import { makingRequest } from '../../redux/action/requestAction'

const EditNotes = (props) => {
     const { title, body, id, handleToggle } = props
     const dispatch = useDispatch()

     const handleFormSubmit = (formData) => {
          handleToggle()
          dispatch(startUpdateNotes(formData, id))
          dispatch(makingRequest())
     }

     return (
          <div>
               <NotesFrom title={title} body={body} handleFormSubmit={handleFormSubmit} />
          </div>
     )
}

export default EditNotes