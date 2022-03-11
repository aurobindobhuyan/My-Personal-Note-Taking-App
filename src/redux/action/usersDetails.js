import axios from "axios"

export const startGetDetails = () => {
     return (dispatch) => {
          axios.get('http://dct-user-auth.herokuapp.com/users/account', {
               headers: {
                    "x-auth": localStorage.getItem('token')
               }
          })
          .then((response)=>{
               dispatch(getAccountDetails(response.data))
          })
          .catch((err)=>{
               alert(err.message)
          })
     }
}

export const getAccountDetails=(a)=>{
     return {
          type:"GET_DETAILS",
          payload:a
     }
}