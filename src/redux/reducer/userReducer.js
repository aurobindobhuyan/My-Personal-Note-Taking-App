const initialValue = {}

const userReducer = (state = initialValue, action) => {
     switch (action.type) {
          case "GET_DETAILS": {
               return action.payload
          }
          case "IS_LOGGED_OUT" :{
               return initialValue
          }
          default: {
               return { ...state }
          }
     }
}

export default userReducer