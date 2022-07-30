import { createAction } from '@reduxjs/toolkit'
import { 
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_MESSAGE,
  WS_ERROR
} from './constants'
import { TWsMessageActions } from '../../../../utils/types'

export const connect = createAction<string, typeof WS_CONNECT>(WS_CONNECT)
export const disconnect = createAction(WS_DISCONNECT)
export const wsConnecting = createAction(WS_CONNECTING)
export const wsOpen = createAction(WS_OPEN)
export const wsClose = createAction(WS_CLOSE)
export const wsMessage = createAction<TWsMessageActions, typeof WS_MESSAGE>(WS_MESSAGE)
export const wsError = createAction<string, typeof WS_ERROR>(WS_ERROR)

export type TWebsocketActions = ReturnType<typeof connect>
                              | ReturnType<typeof disconnect> 
                              | ReturnType<typeof wsConnecting> 
                              | ReturnType<typeof wsOpen> 
                              | ReturnType<typeof wsClose> 
                              | ReturnType<typeof wsMessage> 
                              | ReturnType<typeof wsError>