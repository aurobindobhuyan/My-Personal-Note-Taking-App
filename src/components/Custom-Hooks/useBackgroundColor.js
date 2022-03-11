import { useEffect } from "react"

const useBackgroundColor = (color) => {
     useEffect(() => {
          const body = document.querySelector('body')
          body.style.background = color
     }, [])
}

export default useBackgroundColor