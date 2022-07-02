import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Loader from '../loader/loader'

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, userChecked } = useSelector(store => store.user)
  const location = useLocation()

  if (!userChecked) {
    return (
      <Loader fullscreen/>
    )
  }

  if (!user) {
    return (
      <Redirect to={{
        pathname: "/login",
        state: {from: location}
      }} />
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

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

export default ProtectedRoute