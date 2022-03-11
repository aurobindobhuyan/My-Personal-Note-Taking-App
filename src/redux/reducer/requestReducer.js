const initialValue = false

const requestReducer = (store = initialValue, action) => {
     switch (action.type) {
          case "MAKING_REQUEST": {
               return true
          }
          case "CANCEL_REQUEST": {
               return initialValue
          }
          default: {
               return store
          }
     }
}

export default requestReducer