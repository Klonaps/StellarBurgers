import { ThunkAction } from 'redux-thunk'
import type {} from 'redux-thunk/extend-redux'

import { store } from "../store"
import { TIngredientsActions } from "../reducers/ingredients/actions"
import { TOrderActions } from '../reducers/order/actions'
import { TOrderIngredientsActions } from '../reducers/order-ingredients/actions'
import { TRecoveryActions } from '../reducers/recovery/actions'
import { TUserActions } from '../reducers/user/actions'
import { TWebsocketActions } from '../reducers/websocket/actions'
import { 
  connect, 
  disconnect,
  wsConnecting,
  wsClose,
  wsMessage,
  wsError, 
  wsOpen
} from "../reducers/websocket/actions"

export const wsActions = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
}

export type RootState = ReturnType<typeof store.getState>

export type TApplicationActions = TRecoveryActions | TIngredientsActions | TOrderActions | TOrderIngredientsActions | TUserActions | TWebsocketActions

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>

export type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk) => TReturnType;