import { createAction } from "@reduxjs/toolkit"
import { BASE_URL, passwordReset, checkResponse, passwordResetReset } from "../../../../utils/API"
import { AppThunk } from "../../types"
import {
  RECOVERY_REQUEST,
  RECOVERY_FAILED,
  RECOVERY_EMAIL_SEND_SUCCESS,
  RECOVERY_PASSWORD_SEND_SUCCESS,
  SET_ERROR_RECOVERY_MESSAGE,
  CHANGE_RECOVERY_STATUS
} from './constants'

export const recoveryRequest = createAction(RECOVERY_REQUEST)
export const recoveryFailed = createAction(RECOVERY_FAILED)
export const recoveryEmailSendSuccess = createAction(RECOVERY_EMAIL_SEND_SUCCESS)
export const recoveryPasswordSendSuccess = createAction(RECOVERY_PASSWORD_SEND_SUCCESS)
export const setErrorRecoveryMessage = createAction<string, typeof SET_ERROR_RECOVERY_MESSAGE>(SET_ERROR_RECOVERY_MESSAGE)
export const changeRecoveryStatus = createAction(CHANGE_RECOVERY_STATUS)

export type TRecoveryActions = ReturnType<typeof recoveryRequest>
                              | ReturnType<typeof recoveryFailed>
                              | ReturnType<typeof recoveryEmailSendSuccess>
                              | ReturnType<typeof recoveryPasswordSendSuccess>
                              | ReturnType<typeof setErrorRecoveryMessage>
                              | ReturnType<typeof changeRecoveryStatus>

export const recoveryEmailSend = (body: { email: string }): AppThunk => {
  return function(dispatch) {
    dispatch(recoveryRequest())
    fetch(BASE_URL + passwordReset, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(recoveryEmailSendSuccess())
        } else {
          dispatch(recoveryFailed())
          dispatch(setErrorRecoveryMessage('Произошла ошибка, попробуйте снова'))
        }
      }).catch(err => {
        console.log(err)
        dispatch(recoveryFailed())
        dispatch(setErrorRecoveryMessage('Произошла ошибка, попробуйте снова'))
      })
  }
}

export const recoveryPasswordSend = (body: { password: string, token: string }): AppThunk => {
  return function(dispatch) {
    dispatch(recoveryRequest())
    fetch(BASE_URL + passwordResetReset, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(recoveryEmailSendSuccess())
        } else {
          dispatch(recoveryFailed())
          dispatch(setErrorRecoveryMessage('Произошла ошибка, попробуйте снова'))
        }
      }).catch((err) => {
        console.log(err)
        dispatch(recoveryFailed())
        if (err.message === 'Incorrect reset token') {
          dispatch({
            type: SET_ERROR_RECOVERY_MESSAGE,
            payload: 'Код введен неверно'
          })
        } else {
          dispatch({
            type: SET_ERROR_RECOVERY_MESSAGE,
            payload: 'Произошла ошибка, попробуйте снова'
          })
        }
      })
  }
}