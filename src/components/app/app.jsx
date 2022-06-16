import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ProtectedRoute from '../protected-route/ProtectedRoute'
import AppHeader from '../app-header/app-header'
import { MainPage, Login, Profile, Register, ResetPassword, ForgotPassword, Ingredients } from '../../pages'

function App() {
  return (
    <Router>
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
          <MainPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;