import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';

const AlertMessage = (props) => {
     const [success, setSuccess] = useState(null)
     const store = useSelector((store) => {
          return store.myNotes
     })

     useEffect(() => {
          setSuccess(localStorage.getItem('value'))
          const timer = setTimeout(() => {
               localStorage.removeItem('value')
               setSuccess(null)
          }, 3000)
          return () => {
               clearTimeout(timer)
          }
     }, [store])

     return (
          <div style={{ width: '25%' }}>
               {
                    success === 'Successfully Fetched' ? (
                         <Alert variant="filled" severity="success">
                              {success}
                         </Alert>
                    ) : (
                         success === 'Successfully Created a Note'
                    ) ? (
                         <Alert variant="filled" severity="info">
                              {success}
                         </Alert>
                    ) : (
                         success === 'Successfully updated a note'
                    ) ? (
                         <Alert variant="filled" severity="warning">
                              {success}
                         </Alert>
                    ) : (
                         success === 'Successfully Deleted a note'
                    ) && <Alert variant="filled" severity="error">
                         {success}
                    </Alert>
               }
          </div>
     )
}

export default AlertMessage