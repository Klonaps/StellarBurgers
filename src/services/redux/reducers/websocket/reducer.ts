import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions"
import { ISocketOrders } from '../../../../utils/types'

export type TWebsocketState = {
    status: 'offline' | 'connecting' | 'online',
    connectionError: string,
    orders: ISocketOrders[],
    total: number,
    totalToday: number
}

const initialState: TWebsocketState = {
    status: 'offline',
    connectionError: '',
    orders: [],
    total: 0,
    totalToday: 0
};

export const websocketReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(wsConnecting, (state) => {
    state.status = 'connecting';
  })
  .addCase(wsOpen, (state) => {
    state.status = 'online';
    state.connectionError = '';
  })
  .addCase(wsClose, (state) => {
    state.status = 'offline';
    state.orders = []
  })
  .addCase(wsError, (state, action) => {
    state.connectionError = action.payload;
  })
  .addCase(wsMessage, (state, action) => {
    state.orders = [...action.payload.orders]
    state.total = action.payload.total
    state.totalToday = action.payload.totalToday
  })
})