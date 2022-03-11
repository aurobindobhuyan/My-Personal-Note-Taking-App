import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from '../reducer/loginReducer'
import myNotesReducer from '../reducer/myNotesReducer'
import userReducer from '../reducer/userReducer'
import requestReducer from '../reducer/requestReducer'

const configureStore = () => {
     const store = createStore(combineReducers({
          isLoggedIn: loginReducer,
          userDetails: userReducer,
          myNotes: myNotesReducer,
          request: requestReducer
     }), applyMiddleware(thunk))
     return store
}

export default configureStore