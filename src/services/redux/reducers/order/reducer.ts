import { createReducer } from "@reduxjs/toolkit"
import { TOrder } from '../../../../utils/types'
import {
  postOrderSuccess,
  postOrderRequest,
  postOrderFailed,
  deleteOrderInfo
} from './actions'

type TOrderState = {
  currentOrder: TOrder | null,
  orderRequest: boolean,
  orderFailed: boolean
}
const initialState: TOrderState = {
  currentOrder: null,
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(postOrderRequest, (state) => {
    state.orderFailed = false
    state.orderRequest = true
  })
  .addCase(postOrderSuccess, (state, action) => {
    state.orderRequest = false
    state.orderFailed = false
    state.currentOrder = action.payload
  })
  .addCase(postOrderFailed, (state) => {
    state.orderRequest = false
    state.orderFailed = true
  })
  .addCase(deleteOrderInfo, (state) => {
    state.currentOrder = null
  })
})