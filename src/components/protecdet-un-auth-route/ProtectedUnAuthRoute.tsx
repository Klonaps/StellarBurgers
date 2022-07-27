import React, { FC } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from '../../services/redux/hooks'
import Loader from '../loader/loader'

type TUnProtectedRoute = {
  path: string,
  exact?: boolean;
  children: React.ReactNode
}

const ProtectedUnAuthRoute: FC<TUnProtectedRoute> = ({ children, ...rest }) => {
  const { user, userChecked } = useSelector(store => store.user)
  const location: any = useLocation()

  if (!userChecked) {
    return (
      <Loader fullscreen/>
    )
  }

  if(user) {
    return (
      <Redirect to={ location.state?.from ? location.state?.from : '/' } />
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

export default ProtectedUnAuthRoute