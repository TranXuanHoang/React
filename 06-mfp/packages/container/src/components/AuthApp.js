import { mount } from 'auth/AuthApp'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

export default ({ onSignIn }) => {
  const ref = useRef(null)

  // Get currently being used route history object
  // that is the browser route history
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location

        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      },
      onSignIn
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
