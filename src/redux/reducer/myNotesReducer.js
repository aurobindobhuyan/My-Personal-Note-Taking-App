import { GET_NOTES, ADD_NOTES, UPDATE_NOTE, DELETE_NOTE, HANDLE_LOG_OUT } from '../action/myNotesAction'
const initialValue = []

const myNotesReducer = (store = initialValue, action) => {
     switch (action.type) {
          case GET_NOTES: {
               return action.payload
          }
          case ADD_NOTES: {
               return [...store, { ...action.payload }]
          }
          case UPDATE_NOTE: {
               const result = store.map(ele => {
                    if (ele._id === action.payload._id) {
                         return { ...action.payload }
                    } else {
                         return ele
                    }
               })
               return result
          }
          case DELETE_NOTE: {
               const result = store.filter(ele => ele._id !== action.payload._id)
               return result
          }
          case HANDLE_LOG_OUT: {
               return initialValue
          }
          default: {
               return [...store]
          }
     }
}

export default myNotesReducer