import React, { useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients-actions'
import { getUser } from '../../services/actions/user-actions'
import {Location} from 'history';

import ProtectedRoute from '../protected-route/ProtectedRoute'
import ProtectedUnAuthRoute from '../protecdet-un-auth-route/ProtectedUnAuthRoute'
import AppHeader from '../app-header/app-header'
import { Home, Login, Profile, Register, ResetPassword, ForgotPassword, Ingredients, Orders, Feed, NoMatch } from '../../pages'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation<{ background?: Location<{} | null | undefined> }>()
  const background = location.state?.background

  useEffect(() => {
    //@ts-ignore
    dispatch(getUser())
    //@ts-ignore
    dispatch(getIngredients())
  }, [dispatch])

  const close = (): void => {
    history.replace({ pathname: '/' })
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedUnAuthRoute path='/login'>
          <Login/>
        </ProtectedUnAuthRoute>
        <ProtectedRoute path='/profile' exact>
          <Profile/>
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders' exact>
          <Orders/>
        </ProtectedRoute>
        <ProtectedUnAuthRoute path='/register' exact>
          <Register/>
        </ProtectedUnAuthRoute>
        <ProtectedUnAuthRoute path='/forgot-password' exact>
          <ForgotPassword/>
        </ProtectedUnAuthRoute>
        <ProtectedUnAuthRoute path='/reset-password' exact>
          <ResetPassword/>
        </ProtectedUnAuthRoute>
        <Route path='/ingredients/:id' exact>
          <Ingredients/>
        </Route>
        <Route path='/feed' exact>
          <Feed/>
        </Route>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='*' exact>
          <NoMatch/>
        </Route>
      </Switch>
      {background && <Route path="/ingredients/:id" children={<Modal title="Детали ингредиента" handlerChangeState={close}><IngredientDetails inModal/></Modal>} />}
    </>
  )
}

export default App;