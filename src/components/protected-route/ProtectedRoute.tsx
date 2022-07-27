import React, { FC } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from '../../services/redux/hooks'
import Loader from '../loader/loader'

type TProtectedRoute = {
  path: string,
  exact?: boolean;
  children: React.ReactNode
}

const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
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

export default ProtectedRoute