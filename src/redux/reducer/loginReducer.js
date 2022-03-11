const initialValue = false

const loginReducer = (state = initialValue, action) => {
     switch (action.type) {
          case "IS_LOGGED_IN": {
               return true
          }
          case "IS_LOGGED_OUT": {
               return initialValue
          }
          default: {
               return state
          }
     }
}

export default loginReducer