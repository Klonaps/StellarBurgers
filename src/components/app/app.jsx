import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import ProtectedRoute from '../protected-route/ProtectedRoute'
import AppHeader from '../app-header/app-header'
import { Home, Login, Profile, Register, ResetPassword, ForgotPassword, Ingredients } from '../../pages'

function App() {
  let location = useLocation()
  let background = location.state && location.state.background
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute path='/login'>
          <Login/>
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact>
          <Profile/>
        </ProtectedRoute>
        <ProtectedRoute path='/register' exact>
          <Register/>
        </ProtectedRoute>
        <ProtectedRoute path='/forgot-password' exact>
          <ForgotPassword/>
        </ProtectedRoute>
        <ProtectedRoute path='/reset-password' exact>
          <ResetPassword/>
        </ProtectedRoute>
        <Route path='/ingredients/:id' exact>
          <Ingredients/>
        </Route>
        <Route path='/' exact>
          <Home/>
        </Route>
      </Switch>
    </>
  )
}

export default App;