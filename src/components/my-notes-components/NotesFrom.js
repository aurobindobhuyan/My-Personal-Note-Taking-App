import React, { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { GridActionsCellItem } from '@mui/x-data-grid-pro'
import TextField from '@mui/material/TextField'

const NotesFrom = (props) => {
     const { title: editTitle, body: editBody, handleFormSubmit } = props
     const [input, setInput] = useState({
          title: editTitle ? editTitle : '',
          body: editBody ? editBody : ''
     });
     const [validate, setValidate] = useState({});
     const error = {}
     const title = input.title // Stored inside loval variables for reusable
     const body = input.body

     const handleInput = (e) => {
          setInput({ ...input, ...{ [e.target.name]: e.target.value } })
     }

     const handleValidate = () => {
          if (title.trim().length === 0) {
               error.title = '*required'
          }
     }

     const handleSubmit = (e) => {
          e.preventDefault()
          handleValidate()

          if (Object.keys(error).length === 0) {
               setValidate({})
               const formData = {
                    title: title,
                    body: body
               }
               handleFormSubmit(formData)
               setInput({ title: '', body: '' })
          } else {
               setValidate(error)
          }
     }

     return (
          <form>
               <TextField
                    value={title}
                    onChange={handleInput}
                    name='title'
                    id="outlined-required"
                    label="Title"
                    autoComplete='off'
               />
               {validate.title && <span style={{ color: 'red' }}>{validate.title}</span>}
               {!editTitle && (<> <br /> <br /></>)}

               <TextField
                    id="outlined-textarea"
                    onChange={handleInput}
                    name='body'
                    label="Text"
                    value={body}
                    autoComplete='off'
               />
               {!editTitle && (<> <br /> <br /></>)}

               Save
               <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    color="primary"
                    onClick={handleSubmit}
               />
          </form>
     )
}

export default NotesFrom