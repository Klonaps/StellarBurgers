import { createAction } from "@reduxjs/toolkit"
import { checkResponse, getNewToken, fetchOrder } from '../../../../utils/API'
import { TFetchBody, TOrder } from '../../../../utils/types'
import { AppThunk } from '../../types'
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  DELETE_ORDER_INFO
} from './constants'

export const postOrderRequest = createAction(POST_ORDER_REQUEST)
export const postOrderSuccess = createAction<TOrder | null, typeof POST_ORDER_SUCCESS>(POST_ORDER_SUCCESS)
export const postOrderFailed = createAction(POST_ORDER_FAILED)
export const deleteOrderInfo = createAction(DELETE_ORDER_INFO)

export type TOrderActions = ReturnType<typeof postOrderRequest>
                          | ReturnType<typeof postOrderSuccess>
                          | ReturnType<typeof postOrderFailed>
                          | ReturnType<typeof deleteOrderInfo>

export const postOrder = (body: TFetchBody): AppThunk => {
  return function(dispatch) {
    let accessToken: string | null = localStorage.getItem('accessToken')
    if (!accessToken) throw new Error('AccessToken не существует')
    dispatch(postOrderRequest())
    fetchOrder(accessToken, body)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(postOrderSuccess(res.order))
        } else {
          dispatch(postOrderFailed())
          dispatch(deleteOrderInfo())
        }
      }).catch(err => {
        if (err.message === 'jwt expired') {
          const refreshToken: string | null = localStorage.getItem('refreshToken')
          if (!refreshToken) throw new Error('RefreshToken не существует')
            getNewToken(refreshToken)
              .then(checkResponse)
              .then(res => {
                if (res && res.success) {
                  accessToken = res.accessToken.split('Bearer ')[1]
                  if (!accessToken) throw new Error('AccessToken не существует')
                  localStorage.setItem('refreshToken', res.refreshToken)
                  localStorage.setItem('accessToken', accessToken)
                  fetchOrder(accessToken, body)
                    .then(checkResponse)
                    .then(res => {
                      if (res && res.success) {
                        dispatch(postOrderSuccess(res.order))
                      } else {
                        dispatch(postOrderFailed())
                        dispatch(deleteOrderInfo())
                      }
                    }).catch(err => {
                      dispatch(postOrderFailed())
                      dispatch(deleteOrderInfo())
                    })
                } else {
                  dispatch(postOrderFailed())
                  dispatch(deleteOrderInfo())
                }
              }).catch(err => {
                dispatch(postOrderFailed())
                dispatch(deleteOrderInfo())
              })
        } else {
          dispatch(postOrderFailed())
          dispatch(deleteOrderInfo())
        }
      })
  }
}