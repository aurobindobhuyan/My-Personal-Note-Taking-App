import { useEffect } from 'react'

function useInputRefs(dependency, param1, prop1, param2, prop2, param3, prop3, param4, prop4) {
     useEffect(() => {
          if (dependency.hasOwnProperty(prop1)) {
               param1.current.focus()
          } else if (dependency.hasOwnProperty(prop2)) {
               param2.current.focus()
          } else if (dependency.hasOwnProperty(prop3)) {
               param3.current.focus()
          } else if (dependency.hasOwnProperty(prop4)) {
               param4.current.focus()
          }
     }, [dependency])
}

export default useInputRefs