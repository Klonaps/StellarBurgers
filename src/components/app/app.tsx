import React, { useEffect } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from '../../services/redux/hooks'
import { getIngredients } from '../../services/redux/reducers/ingredients/actions'
import { getUser } from '../../services/redux/reducers/user/actions'
import { Location } from 'history'

import ProtectedRoute from '../protected-route/ProtectedRoute'
import ProtectedUnAuthRoute from '../protecdet-un-auth-route/ProtectedUnAuthRoute'
import AppHeader from '../app-header/app-header'
import { Home, Login, Profile, Register, ResetPassword, ForgotPassword, Ingredients, Orders, Feed, FeedId, NoMatch } from '../../pages'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import FeedIdModal from '../feed-id-modal/feed-id-modal'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation<{ background?: Location<{} | null | undefined> }>()
  const background = location.state?.background

  useEffect(() => {
    dispatch(getUser())
    dispatch(getIngredients())
  }, [dispatch])

  const close = (): void => {
    history.replace({ pathname: '/' })
  }
  const closeFeed = (): void => {
    history.replace({ pathname: '/feed' })
  }
  const closeOrder = (): void => {
    history.replace({ pathname: '/profile/orders' })
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
        <ProtectedRoute path='/profile/orders/:id' exact>
          <FeedId/>
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
        <Route path='/feed/:id' exact>
          <FeedId/>
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
      {background && <Route path="/feed/:id" children={<Modal handlerChangeState={closeFeed}><FeedIdModal /></Modal>} />}
      {background && <Route path="/profile/orders/:id" children={<Modal handlerChangeState={closeOrder}><FeedIdModal /></Modal>} />}
    </>
  )
}

export default App