import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ProtectedRoute from '../protected-route/ProtectedRoute'
import AppHeader from '../app-header/app-header'
import { Home, Login, Profile, Register, ResetPassword, ForgotPassword, Ingredients } from '../../pages'

function App() {
  return (
    <>
      <AppHeader />
      <Switch>
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
        <ProtectedRoute path='/ingredients/:id' exact>
          <Ingredients/>
        </ProtectedRoute>
        <Route path='/' exact>
          <Home/>
        </Route>
      </Switch>
    </>
  )
}

export default App;