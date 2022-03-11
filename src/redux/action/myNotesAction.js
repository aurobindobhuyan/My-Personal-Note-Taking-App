import axios from "axios"

export const GET_NOTES = "GET_NOTES"
export const ADD_NOTES = "ADD_NOTES"
export const UPDATE_NOTE = "UPDATE_NOTE"
export const DELETE_NOTE = "DELETE_NOTE"
export const HANDLE_LOG_OUT = "LOGOUT"

// Get Tasks
export const startGetNotes = () => {
     return (dispatch) => {
          axios.get("http://dct-user-auth.herokuapp.com/api/notes", {
               headers: {
                    "x-auth": localStorage.getItem('token')
               }
          })
               .then((response) => {
                    localStorage.setItem('value', "Successfully Fetched")
                    dispatch(getNotes(response.data))
               })
               .catch((err) => {
                    alert(err.message)
               })
     }
}
export const getNotes = (data) => {
     return {
          type: GET_NOTES,
          payload: data
     }
}

// For add A note
export const startAddNotes = (formData) => {
     return (dispatch) => {
          axios.post("http://dct-user-auth.herokuapp.com/api/notes", formData, {
               headers: {
                    "x-auth": localStorage.getItem('token')
               }
          })
               .then((response) => {
                    localStorage.setItem('value', "Successfully Created a Note")
                    dispatch(addNotes(response.data))
               })
               .catch((err) => {
                    alert(err.message)
               })
     }
}
export const addNotes = (formData) => {
     return {
          type: ADD_NOTES,
          payload: formData
     }
}

// For update a note
export const startUpdateNotes = (formData, id) => {
     return (dispatch) => {
          axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, formData, {
               headers: {
                    "x-auth": localStorage.getItem('token')
               }
          })
               .then((response) => {
                    localStorage.setItem('value', "Successfully updated a note")
                    dispatch(updateNotes(response.data))
               })
               .catch((err) => {
                    alert(err.message)
               })
     }
}
export const updateNotes = (formData) => {
     return {
          type: UPDATE_NOTE,
          payload: formData
     }
}

// For Delete a note
export const startDeleteNote = (id) => {
     return (dispatch) => {
          axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
               headers: {
                    "x-auth": localStorage.getItem('token')
               }
          })
               .then((response) => {
                    localStorage.setItem('value', "Successfully Deleted a note")
                    dispatch(deleteNote(response.data))
               })
               .catch((err) => {
                    alert(err.message)
               })
     }
}
export const deleteNote = (formData) => {
     return {
          type: DELETE_NOTE,
          payload: formData
     }
}

// Remove all Notes from Redux store after logout
export const handleLogOutAction = () => {
     return {
          type: HANDLE_LOG_OUT
     }
}