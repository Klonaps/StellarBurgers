import { BASE_URL, passwordReset, checkResponse, passwordResetReset } from "../../utils/API"

export const RECOVERY_REQUEST = 'RECOVERY_REQUEST'
export const RECOVERY_FAILED = 'RECOVERY_FAILED'
export const RECOVERY_EMAIL_SEND_SUCCESS = 'RECOVERY_EMAIL_SEND_SUCCESS'
export const RECOVERY_PASSWORD_SEND_SUCCESS = 'RECOVERY_PASSWORD_SEND_SUCCESS'
export const SET_ERROR_RECOVERY_MESSAGE = 'SET_ERROR_RECOVERY_MESSAGE'
export const CHANGE_RECOVERY_STATUS = 'CHANGE_RECOVERY_STATUS'

export function recoveryEmailSend(body) {
  return function(dispatch) {
    dispatch({type: RECOVERY_REQUEST})
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
          dispatch({type: RECOVERY_EMAIL_SEND_SUCCESS})
        } else {
          dispatch({type: RECOVERY_FAILED})
          dispatch({
            type: SET_ERROR_RECOVERY_MESSAGE,
            payload: 'Произошла ошибка, попробуйте снова'
          })
        }
      }).catch(err => {
        console.log(err)
        dispatch({type: RECOVERY_FAILED})
        dispatch({
            type: SET_ERROR_RECOVERY_MESSAGE,
            payload: 'Произошла ошибка, попробуйте снова'
          })
      })
  }
}

export function recoveryPasswordSend(body) {
  return function(dispatch) {
    dispatch({type: RECOVERY_REQUEST})
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
          dispatch({
            type: RECOVERY_PASSWORD_SEND_SUCCESS,
          })
        } else {
          dispatch({type: RECOVERY_FAILED})
          dispatch({
            type: SET_ERROR_RECOVERY_MESSAGE,
            payload: 'Произошла ошибка, попробуйте снова'
          })
        }
      }).catch((err) => {
        console.log(err)
        dispatch({type: RECOVERY_FAILED})
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