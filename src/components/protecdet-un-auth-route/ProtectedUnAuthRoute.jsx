import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Loader from '../loader/loader'

const ProtectedUnAuthRoute = ({ children, ...rest }) => {
  const { user, userChecked } = useSelector(store => store.user)
  const location = useLocation()

  if (!userChecked) {
    return (
      <Loader fullscreen/>
    )
  }

  if(user) {
    return (
      <Redirect to={ location.state?.from || '/' } />
    )
  }

  return (
    <Route
      {...rest}
      render={() => (
          children
        )
      }
    />
  )
}

ProtectedUnAuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

export default ProtectedUnAuthRoute