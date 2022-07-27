import { createAction } from "@reduxjs/toolkit"
import { BASE_URL, checkResponse, LOGIN, REGISTER, USER, fetchUserInfo, getNewToken, deleteRefrshToken} from "../../../../utils/API"
import { AppThunk } from "../../types"
import { TUser } from "../../../../utils/types"
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  CHECKED_USER,
  SET_INCORRECT_DATA_MESSAGE,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED
} from './constants'

export const loginRequest = createAction(LOGIN_REQUEST)
export const loginFailed = createAction(LOGIN_FAILED)
export const loginSuccess = createAction<TUser, typeof LOGIN_SUCCESS>(LOGIN_SUCCESS)

export const logoutRequest = createAction(LOGOUT_REQUEST)
export const logoutFailed = createAction(LOGOUT_FAILED)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)

export const registerRequest = createAction(REGISTER_REQUEST)
export const registerFailed = createAction<string, typeof REGISTER_FAILED>(REGISTER_FAILED)
export const registerSuccess = createAction<TUser, typeof REGISTER_SUCCESS>(REGISTER_SUCCESS)

export const getUserRequest = createAction(GET_USER_REQUEST)
export const getUserFailed = createAction(GET_USER_FAILED)
export const getUserSuccess = createAction<TUser, typeof GET_USER_SUCCESS>(GET_USER_SUCCESS)

export const checkedUser = createAction(CHECKED_USER)
export const setIncorrectDataMessage = createAction<string, typeof SET_INCORRECT_DATA_MESSAGE>(SET_INCORRECT_DATA_MESSAGE)

export const updateUserInfoRequest = createAction(UPDATE_USER_INFO_REQUEST)
export const updateUserInfoFailed = createAction(UPDATE_USER_INFO_FAILED)
export const updateUserInfoSuccess = createAction<TUser, typeof UPDATE_USER_INFO_SUCCESS>(UPDATE_USER_INFO_SUCCESS)

export type TUserActions = ReturnType<typeof loginRequest>
                          | ReturnType<typeof loginFailed>
                          | ReturnType<typeof loginSuccess>
                          | ReturnType<typeof logoutRequest>
                          | ReturnType<typeof logoutFailed>
                          | ReturnType<typeof logoutSuccess>
                          | ReturnType<typeof registerRequest>
                          | ReturnType<typeof registerFailed>
                          | ReturnType<typeof registerSuccess>
                          | ReturnType<typeof getUserRequest>
                          | ReturnType<typeof getUserFailed>
                          | ReturnType<typeof getUserSuccess>
                          | ReturnType<typeof checkedUser>
                          | ReturnType<typeof setIncorrectDataMessage>
                          | ReturnType<typeof updateUserInfoRequest>
                          | ReturnType<typeof updateUserInfoFailed>
                          | ReturnType<typeof updateUserInfoSuccess>

type TloginBody = {
  email: string 
  password: string
}
export const login = (body: TloginBody): AppThunk => {
  return function(dispatch) {
    dispatch(loginRequest())
    fetch(BASE_URL + LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(loginSuccess(res.user))
          const accessToken = res.accessToken.split('Bearer ')[1]
          localStorage.setItem('refreshToken', res.refreshToken)
          localStorage.setItem('accessToken', accessToken)
        } else {
          dispatch(loginFailed())
        }
      }).catch(err => {
        dispatch(loginFailed())
        if (err.message === 'email or password are incorrect') {
          dispatch(setIncorrectDataMessage('Данные введены неверно'))
        } else {
          dispatch(setIncorrectDataMessage('Произошла ошибка, попробуйте еще раз'))
        }
      })
  }
}

export const logout = (): AppThunk => {
  return function(dispatch) {
    dispatch(logoutRequest())
    const refreshToken: string | null = localStorage.getItem('refreshToken')
    if (!refreshToken) throw new Error('Токен отсутствует')
    deleteRefrshToken(refreshToken)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(logoutSuccess())
          localStorage.clear()
        } else {
          dispatch(logoutFailed())
        }
      }).catch(err => {
        dispatch(logoutFailed())
      })
  }
}

type TRegisterBody = TloginBody & { name: string }

export const register = (body: TRegisterBody): AppThunk => {
  return function(dispatch) {
    dispatch(registerRequest())
    fetch(BASE_URL + REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(registerSuccess(res.user))
          const accessToken: string | null = res.accessToken.split('Bearer ')[1]
          if (!accessToken) throw new Error('Токен отсутствует')
          localStorage.setItem('refreshToken', res.refreshToken)
          localStorage.setItem('accessToken', accessToken)
        } else {
          dispatch(registerFailed('Произошла ошибка, попробуйте еще раз'))
        }
      }).catch(err => {
        if (err.message === 'User already exists') {
          dispatch(registerFailed('Пользователь с таким email уже существует'))
        } if (err.message === 'Email, password and name are required fields') {
          dispatch(registerFailed('Необходимо заполнить все поля'))
        } else {
          dispatch(registerFailed('Произошла ошибка, попробуйте еще раз'))
        }
      })
  }
}

export const getUser = (): AppThunk => {
  return function(dispatch) {
    let accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken) dispatch(checkedUser())
    else if (!refreshToken) dispatch(checkedUser())
    else {
      fetchUserInfo(accessToken)
        .then(checkResponse)
        .then(res => {
          if (res && res.success) {
            dispatch(getUserSuccess(res.user))
            dispatch(checkedUser())
          } else {
            dispatch(getUserFailed())
          }
        }).catch(err => {
          if (err.message === 'jwt expired') {
            getNewToken(refreshToken)
              .then(checkResponse)
              .then(res => {
                if (res && res.success) {
                  accessToken = res.accessToken.split('Bearer ')[1]
                  localStorage.setItem('refreshToken', res.refreshToken)
                  localStorage.setItem('accessToken', accessToken)
                  fetchUserInfo(accessToken)
                    .then(checkResponse)
                    .then(res => {
                      if (res && res.success) {
                        dispatch(getUserSuccess(res.user))
                        dispatch(checkedUser())
                      } else {
                        dispatch(getUserFailed())
                      }
                    }).catch(err => {
                      dispatch(getUserFailed())
                    })
                } else {
                  dispatch(getUserFailed())
                }
              }).catch(err => {
                if (err.message === 'Token is invalid') {
                  dispatch(checkedUser())
                  localStorage.clear()
                } else {
                  dispatch(getUserFailed())
                }
              })
          } else if (err.message === 'jwt malformed' || err.message === 'invalid token') {
            dispatch(checkedUser())
            localStorage.clear()
          } else {
            dispatch(checkedUser())
            dispatch(getUserFailed())
          }
        })
    }
  }
}

type TUpdateBody = {
  name?: string,
  email?: string,
  password?: string
}

export const updateUserInfo = (body: TUpdateBody): AppThunk => {
  return function(dispatch) {
    dispatch(updateUserInfoRequest())
    const accessToken = localStorage.getItem('accessToken')
    fetch(BASE_URL + USER, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(updateUserInfoSuccess(res.user))
        } else {
          dispatch(updateUserInfoFailed())
        }
      }).catch(err => {
        dispatch(updateUserInfoFailed())
      })
  }
}